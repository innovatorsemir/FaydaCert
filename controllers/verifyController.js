// controller/verifyController.js
import Certificate from '../models/Certificate.js';
import { verifyHashOnBlockchain } from '../utils/blockchain.js';

export const verifyCertificateByFayda = async (req, res) => {
  try {
    const { faydaId } = req.query;

    const cert = await Certificate.findOne({ faydaId });

    if (!cert) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const isValid = await verifyHashOnBlockchain(cert.hash);

    res.status(200).json({
      valid: isValid,
      certificate: {
        studentName: cert.studentName,
        degree: cert.degree,
        gpa: cert.gpa,
        issuedBy: cert.issuedBy,
        certificateUrl: cert.s3Url,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed', error });
  }
};
