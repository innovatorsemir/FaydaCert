# Project Title: FaydaCert 
FaydaVerify - Academic Certificate Verification  
## Contributors: 
>1. Semir Nesredin
>2. Bereket Weldemichael
>3. Abraham Melesse

## Project Synopsis  
### Problem Statement  
Fake academic certificates are causing widespread fraud in education and employment. Employers and universities struggle to verify credentials securely and quickly.
 

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
 student/
Contains all features related to student interactions with the system.

Features:

My Certificates Page (View and download)

Certificate Verification History

Access Control for Employers

Certificate Correction Request Form

 institution/
Used by academic institutions to issue and manage certificates.

Features:

Certificate Upload Form (Name, Degree, GPA, Date, etc.)

Digital Signing Tool for tamper-proof verification

Link certificates to students using Fayda ID

 admin/
Admin tools to oversee the platform, manage users, and verify data.

Features:

Department and POI (Point of Interest) Management

Analytics Dashboard (e.g., verification stats)

Certificate correction approval workflow

employer/
For employers to verify academic credentials of candidates.

Features:

Certificate Verification using QR + OTP

Certificate Request Access System

View Verification History


