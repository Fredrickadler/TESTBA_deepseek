// توابع کمکی برای اشتراک‌گذاری داینامیک
function generateShareMeta(nftData) {
  return {
    version: "next",
    imageUrl: nftData.image || "https://i.imgur.com/muoYEIu.jpeg",
    button: {
      title: nftData.buttonTitle || "🪐 Mint Now",
      action: {
        type: "launch_frame",
        url: window.location.href,
        name: "Cosmic NFT",
        splashImageUrl: nftData.image || "https://i.imgur.com/muoYEIu.jpeg",
        splashBackgroundColor: "#0F0F0F"
      }
    }
  };
}

// به‌روزرسانی متا تگ‌ها هنگام تعامل کاربر
function updateShareMeta(nftData) {
  const metaTag = document.querySelector('meta[name="fc:frame"]');
  if (metaTag) {
    metaTag.content = JSON.stringify(generateShareMeta(nftData));
  }
}

// نمونه استفاده پس از mint موفق:
// updateShareMeta({
//   image: "https://new-nft-image.com/123.jpg",
//   buttonTitle: "🎉 View My NFT"
// });