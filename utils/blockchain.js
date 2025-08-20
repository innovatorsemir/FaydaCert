import Web3 from 'web3';

// Connect to Ethereum node (use your provider URL here)
const web3 = new Web3('https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID'); // Replace with your RPC URL

// Paste your contract ABI here (from earlier)
const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "certHash", "type": "string" }
    ],
    "name": "storeHash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "certHash", "type": "string" }
    ],
    "name": "isHashValid",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "certHash", "type": "string" },
      { "indexed": true, "internalType": "address", "name": "issuer", "type": "address" }
    ],
    "name": "CertificateHashStored",
    "type": "event"
  }
];

// Your deployed contract address here (from Remix)
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to verify if hash exists on blockchain
export async function verifyHashOnBlockchain(certHash) {
  try {
    const isValid = await contract.methods.isHashValid(certHash).call();
    return isValid; // true or false
  } catch (error) {
    console.error('Error verifying hash on blockchain:', error);
    return false;
  }
}
