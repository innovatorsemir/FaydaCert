// scripts/deploy.js
import hre from "hardhat";

async function main() {
    const CertificateVerifier = await hre.ethers.getContractFactory("CertificateVerifier");
    const certificateVerifier = await CertificateVerifier.deploy();
    await certificateVerifier.waitForDeployment();

    console.log("CertificateVerifier deployed to:", await certificateVerifier.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
