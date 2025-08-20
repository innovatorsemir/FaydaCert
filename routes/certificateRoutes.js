// routes/certificateRoutes.js
import express from "express";
import {
  uploadCertificate,
  getStudentCertificates,
  submitCorrectionRequest,
  requestVerification,
  respondToVerification
} from "../controllers/certificateController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload",  upload.single("certificate"), uploadCertificate);
router.get("/student/:faydaId", getStudentCertificates);
router.post("/correction", submitCorrectionRequest);
// routes/certificateRoutes.js
router.post("/request-verification", requestVerification);
router.post("/respond-verification", respondToVerification);


export default router;
