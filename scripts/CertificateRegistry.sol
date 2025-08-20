// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        string studentFaydaId;
        bytes32 certHash;
        uint256 timestamp;
        address institution;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateRegistered(bytes32 certHash, string studentFaydaId, address institution);

    function registerCertificate(string memory _studentFaydaId, bytes32 _certHash) public {
        require(certificates[_certHash].timestamp == 0, "Certificate already registered");

        certificates[_certHash] = Certificate({
            studentFaydaId: _studentFaydaId,
            certHash: _certHash,
            timestamp: block.timestamp,
            institution: msg.sender
        });

        emit CertificateRegistered(_certHash, _studentFaydaId, msg.sender);
    }

    function verifyCertificate(bytes32 _certHash) public view returns (Certificate memory) {
        require(certificates[_certHash].timestamp != 0, "Certificate not found");
        return certificates[_certHash];
    }
}
