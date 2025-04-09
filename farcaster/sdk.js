import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// غیرفعال کردن ژست‌های پیشفرض برای جلوگیری از بسته شدن تصادفی اپ
const config = {
  disableNativeGestures: true
};

// وقتی صفحه کاملاً لود شد، اسپلش اسکرین را مخفی می‌کنیم
document.addEventListener('DOMContentLoaded', async () => {
  // ابتدا مطمئن می‌شویم محتوای اصلی نمایش داده شده
  await new Promise(resolve => setTimeout(resolve, 300)); // تأخیر کوتاه برای ثبات بصری
  
  // مخفی کردن اسپلش اسکرین
  try {
    await sdk.actions.ready(config);
    console.log('Splash screen hidden successfully');
  } catch (error) {
    console.error('Error hiding splash screen:', error);
  }
});

// بقیه کدهای اتصال کیف پول و mint (همان کدهای قبلی)
sdk.configure({
  button: {
    wallet: '#connectWallet',
    mint: '#mintButton'
  }
});

sdk.on('wallet-connected', (address) => {
  document.getElementById('connectWallet').style.display = 'none';
  const walletEl = document.getElementById('walletAddress');
  walletEl.style.display = 'block';
  walletEl.textContent = `${address.slice(0, 6)}...${address.slice(-4)}`;
});