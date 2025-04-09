import { connectWallet, displayShortAddress } from './wallet.js';
import { mintNFT } from './mint.js';
import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// عناصر DOM
const connectBtn = document.getElementById('connectBtn');
const mintBtn = document.getElementById('mintButton');
const status = document.getElementById('status');
const userAvatar = document.getElementById('userAvatar');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');

// توابع مدیریت لودینگ
function showLoading(message = 'Processing...') {
  loadingText.textContent = message;
  loadingOverlay.classList.add('active');
}

function hideLoading() {
  loadingOverlay.classList.remove('active');
}

// بارگذاری اطلاعات کاربر
async function loadUserProfile() {
  try {
    const { username } = await sdk.auth();
    if (username) {
      userAvatar.textContent = username.charAt(0).toUpperCase();
    }
  } catch (error) {
    console.log("Using default profile");
  }
}

// مدیریت اتصال کیف پول
async function handleWalletConnection() {
  try {
    showLoading('Connecting wallet...');
    connectBtn.disabled = true;
    
    const address = await connectWallet();
    connectBtn.textContent = displayShortAddress(address);
    mintBtn.disabled = false;
    status.textContent = "Ready to mint!";
  } catch (error) {
    status.textContent = error.message;
    connectBtn.disabled = false;
  } finally {
    hideLoading();
  }
}

// مدیریت مینت NFT
async function handleMint() {
  try {
    showLoading('Preparing transaction...');
    mintBtn.disabled = true;
    
    await mintNFT();
    status.textContent = "🎉 Mint successful!";
  } catch (error) {
    status.textContent = error.message;
    mintBtn.disabled = false;
  } finally {
    hideLoading();
  }
}

// رویدادهای کلیک
connectBtn.addEventListener('click', handleWalletConnection);
mintBtn.addEventListener('click', handleMint);

// بارگذاری اولیه
document.addEventListener('DOMContentLoaded', () => {
  loadUserProfile();
});