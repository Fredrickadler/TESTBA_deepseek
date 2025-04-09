// توابع مربوط به اشتراک‌گذاری و فریم‌ها

// تابع برای به‌روزرسانی دینامیک فریم
async function updateFrameMetadata(metadata) {
    try {
        // پیدا کردن تگ متا
        let metaTag = document.querySelector('meta[name="fc:frame"]');
        
        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.name = "fc:frame";
            document.head.appendChild(metaTag);
        }
        
        // به‌روزرسانی محتوا
        metaTag.content = JSON.stringify(metadata);
        
        console.log("Frame metadata updated:", metadata);
        return true;
    } catch (error) {
        console.error("Error updating frame metadata:", error);
        return false;
    }
}

// تابع برای اشتراک‌گذاری
async function shareApp() {
    try {
        const result = await sdk.share({
            text: "I just minted an awesome NFT on Cosmic NFT! 🚀",
            url: window.location.href
        });
        
        console.log("Shared successfully:", result);
        return result;
    } catch (error) {
        console.error("Error sharing:", error);
        return null;
    }
}

// صادر کردن توابع
export { updateFrameMetadata, shareApp };