import { ethers } from 'ethers';

// تنظیمات قرارداد
const CONTRACT_ADDRESS = "0xe2ba182898141f19b4a7d739c715cd162d31766c";
const CONTRACT_ABI = [{
  "inputs": [],
  "name": "mint",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}];

// مینت NFT
export async function mintNFT() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    const tx = await contract.mint({
      value: ethers.utils.parseEther("0.01")
    });
    
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Minting failed:", error);
    throw error;
  }
}