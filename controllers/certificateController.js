import Certificate from "../models/Certificate.js";
import fs from "fs";
import crypto from "crypto";
import { ethers } from "ethers";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Local Hardhat provider
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Pre-funded Hardhat account
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ABI matches your CertificateVerifier contract
const abi = [
  "function issueCertificate(string hash) public",
  "function verifyCertificate(string hash) public view returns (bool)"
];

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

export const uploadCertificate = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Certificate file required" });

    const { studentFaydaId, studentName, degree, gpa, dateIssued, uploadedBy } = req.body;
    if (!studentFaydaId || !studentName || !degree || !gpa || !dateIssued || !uploadedBy) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Read file buffer & generate SHA256 hash (as string)
    const filePath = path.join(process.cwd(), req.file.path);
    const fileBuffer = fs.readFileSync(filePath);
    const certHash = crypto.createHash("sha256").update(fileBuffer).digest("hex"); // 64-char hex string

    // Interact with local blockchain contract
    const tx = await contract.issueCertificate(certHash);
    const receipt = await tx.wait();

    // Save certificate in DB with tx hash
    const certificate = await Certificate.create({
      studentFaydaId,
      studentName,
      degree,
      gpa,
      dateIssued: new Date(dateIssued),
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedBy,
      txHash: receipt.transactionHash,
      certHash // optional: store hash in DB for easy reference
    });

    res.status(201).json({ message: "Certificate uploaded & registered on local blockchain", certificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const searchCertificate = async (req, res) => {
  try {
    const { studentFaydaId } = req.params;
    if (!studentFaydaId) return res.status(400).json({ message: "Student Fayda ID required" });

    const cert = await Certificate.findOne({ studentFaydaId });
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    // Compute hash from file
    const filePath = path.join(process.cwd(), "uploads", path.basename(cert.fileUrl));
    const fileBuffer = fs.readFileSync(filePath);
    const certHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    // Verify on blockchain
    const isValid = await contract.verifyCertificate(certHash);

    res.json({ certificate: cert, blockchain: { isValid } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};


// Get all certificates for a student
export const getStudentCertificates = async (req, res) => {
  try {
    const { faydaId } = req.params;

    // Fetch all certificates for this student
    const certificates = await Certificate.find({ studentFaydaId: faydaId });
    if (!certificates || certificates.length === 0) {
      return res.status(404).json({ message: "No certificates found for this student" });
    }

    // Map certificates and add blockchain validity
    const certsWithBlockchain = await Promise.all(
      certificates.map(async (cert) => {
        const filePath = path.join(process.cwd(), "uploads", path.basename(cert.fileUrl));
        const fileBuffer = fs.readFileSync(filePath);
        const certHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

        const isValid = await contract.verifyCertificate(certHash); // returns true/false
        return { ...cert.toObject(), blockchain: { isValid } };
      })
    );

    res.json({ certificates: certsWithBlockchain });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Submit a correction request
export const submitCorrectionRequest = async (req, res) => {
  try {
    const { certId, requestText } = req.body;
    const cert = await Certificate.findById(certId);
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    cert.correctionRequests.push({ requestText, submittedAt: new Date() });
    await cert.save();
    res.json({ message: "Correction request submitted", cert });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// controllers/certificateController.js

// Add a verification request
export const requestVerification = async (req, res) => {
  try {
    const { certId, viewerId, reason } = req.body;
    const cert = await Certificate.findById(certId);
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    // Add entry to history with consent=false
    cert.verificationHistory.push({
      viewer: viewerId,
      timestamp: new Date(),
      reason,
      consented: false
    });

    await cert.save();
    res.json({ message: "Verification request sent, pending student consent", cert });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve or deny a verification request
export const respondToVerification = async (req, res) => {
  try {
    const { certId, viewerId, approve } = req.body;
    const cert = await Certificate.findById(certId);
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    const request = cert.verificationHistory.find(
      (r) => r.viewer === viewerId && r.consented === false
    );

    if (!request) return res.status(404).json({ message: "No pending request found" });

    request.consented = approve;
    await cert.save();

    res.json({ message: `Verification ${approve ? "approved ✅" : "denied ❌"}`, cert });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
