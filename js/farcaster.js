// این فایل برای یکپارچه‌سازی با Farcaster/Warpcast استفاده می‌شود

// تابع برای دریافت اطلاعات کاربر
async function getUserInfo() {
    try {
        const user = await sdk.getUser();
        console.log("User info:", user);
        return user;
    } catch (error) {
        console.error("Error getting user info:", error);
        return null;
    }
}

// تابع برای ارتباط با کیف پول کاربر
async function connectWallet() {
    try {
        const wallet = await sdk.connectWallet();
        console.log("Wallet connected:", wallet);
        return wallet;
    } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
    }
}

// صادر کردن توابع برای استفاده در سایر فایل‌ها
export { getUserInfo, connectWallet };