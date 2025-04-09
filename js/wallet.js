// اتصال کیف پولimport { showLoading, hideLoading } from './app.js';// اتصال کیف پول
export async function connectWallet() {
  try {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask or use a Web3-enabled browser");
    }

    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    return accounts[0];
  } catch (error) {
    console.error("Wallet connection failed:", error);
    throw error;
  }
}

// نمایش آدرس کوتاه شده کیف پول
export function displayShortAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}