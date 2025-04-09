import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';
import { getFrameConfig } from './frame-config.js';

// تنظیمات اولیه
sdk.configure({
    button: {
        wallet: '#connectWallet',
        mint: '#mintButton'
    }
});

// به‌روزرسانی خودکار فریم
function updateFrame() {
    const frameConfig = getFrameConfig();
    const metaTag = document.querySelector('meta[name="fc:frame"]');
    if (metaTag) {
        metaTag.content = JSON.stringify(frameConfig);
    }
}

// اولین بار که صفحه لود می‌شود
updateFrame();

// وقتی کاربر NFT را mint می‌کند
sdk.on('mint-success', (data) => {
    updateFrame({
        image: data.nftImage,
        buttonLabel: "🎉 View My NFT"
    });
});