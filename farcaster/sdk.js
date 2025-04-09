// اتصال به SDK فارکستر
import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// تنظیمات اولیه
sdk.configure({
  button: {
    wallet: '#connectWallet', // آیدی دکمه کیف پول شما
    mint: '#mintButton'      // آیدی دکمه mint شما
  }
});

// استفاده از کیف پول داخلی فارکستر (جایگزین web3.js)
sdk.on('wallet-connected', (address) => {
  document.getElementById('connectWallet').style.display = 'none';
  const walletEl = document.getElementById('walletAddress');
  walletEl.style.display = 'block';
  walletEl.textContent = `${address.slice(0, 6)}...${address.slice(-4)}`;
});