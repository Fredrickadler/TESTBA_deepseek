import { getUserInfo, connectWallet } from './farcaster.js';
import { updateFrameMetadata, shareApp } from './share.js';

// وقتی صفحه کاملاً بارگذاری شد
window.addEventListener('DOMContentLoaded', async () => {
    // مخفی کردن اسپلش اسکرین
    await sdk.actions.ready();
    
    // به‌روزرسانی فریم با اطلاعات دینامیک
    await updateFrameMetadata({
        version: "next",
        imageUrl: "https://your-vercel-app-url.vercel.app/images/share-image.png",
        button: {
            title: "🪄 Mint NFT",
            action: {
                type: "launch_frame",
                url: window.location.href,
                name: "Cosmic NFT",
                splashImageUrl: "https://your-vercel-app-url.vercel.app/images/logo.png",
                splashBackgroundColor: "#4a6cf7"
            }
        }
    });
    
    // اضافه کردن رویداد برای دکمه اشتراک‌گذاری
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareApp);
    }
});