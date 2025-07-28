# Project Title: FaydaVerify - Academic Certificate Verification  
## Contributors: Semir Nesredin  

## Project Synopsis  
### Problem Statement  
> Widespread fake academic certificates causing fraud in hiring/education.  

### Planned Solution  
> 1. Institutions upload digitally signed certificates linked to student's Fayda ID  
> 2. Employers verify authenticity via Fayda ID scan + OTP  
> 3. Tamper-proof records using blockchain hashing  

### Expected Outcome  
> - Reduce certificate fraud by 80%  
> - Instant verification (<10 seconds)  
> - API integration with Ethiopian universities  

### Fayda's Role  
> - **Identity Anchor:** Link certificates to biometric-verified Fayda IDs  
> - **OTP Authentication:** Secure verification process  
> - **KYC Compliance:** Meet national education standards  

### Tech Stack  
| Component | Technologies |  
|-----------|--------------|  
| Frontend  | React, QR-scanner lib |  
| Backend   | Node.js, Express |  
| Database  | MongoDB (certificate metadata) |  
| Security  | VeriFayda OIDC, Blockchain hashing |  
| DevOps    | AWS S3 (certificate storage), Vercel |  
