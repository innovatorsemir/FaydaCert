// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerifier {
    struct Certificate {
        string hash;
        address issuer;
        bool isValid;
    }

    mapping(string => Certificate) public certificates;

    event CertificateIssued(string hash, address issuer);
    event CertificateRevoked(string hash);

    function issueCertificate(string memory hash) public {
        require(certificates[hash].issuer == address(0), "Already exists");
        certificates[hash] = Certificate(hash, msg.sender, true);
        emit CertificateIssued(hash, msg.sender);
    }

    function revokeCertificate(string memory hash) public {
        require(certificates[hash].issuer == msg.sender, "Not issuer");
        certificates[hash].isValid = false;
        emit CertificateRevoked(hash);
    }

    function verifyCertificate(string memory hash) public view returns (bool) {
        return certificates[hash].isValid;
    }
}
