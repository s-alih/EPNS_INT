const { ethers } = require("ethers");
const contractAbi = require('../abis/ADDNUMBER.json')

ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID
const contractAddress = "0xcAf38E5f0f205EB619918cc6a34cfC08C194f9b8"
const network = "kovan";

const provider = new ethers.providers.InfuraProvider(network, {
        infura: INFURA_PROJECT_ID,
    });
    
const contract = new ethers.Contract(contractAddress, contractAbi, provider);  

module.exports = {provider,contract,ethers};