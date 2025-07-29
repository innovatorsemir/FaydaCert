import Certificate from '../models/Certificate.js';

export const addCertificate = async (req, res) => {
  try {
    const cert = new Certificate(req.body);
    const saved = await cert.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add certificate' });
  }
};

export const verifyCertificate = async (req, res) => {
  try {
    const { faydaId, hash } = req.body;
    const cert = await Certificate.findOne({ faydaId, hash });

    if (!cert) return res.status(404).json({ valid: false });

    res.json({ valid: true, certificate: cert });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' });
  }
};
