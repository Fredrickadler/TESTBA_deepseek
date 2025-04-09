// تنظیمات فریم فارکستر
const frameConfig = {
  version: "next",
  imageUrl: "./assets/images/nft.webp",
  button: {
    title: "Mint Now",
    action: {
      type: "launch_frame",
      url: "https://testba-deepseek.vercel.app",
      name: "Cosmic Fragment",
      splashImageUrl: "./assets/images/nft.webp",
      splashBackgroundColor: "#0F0F1A"
    }
  }
};

// ایجاد متا تگ فارکستر
function setupFarcasterFrame() {
  const metaTag = document.createElement('meta');
  metaTag.name = 'fc:frame';
  metaTag.content = JSON.stringify(frameConfig);
  document.head.appendChild(metaTag);
}

// اجرای تنظیمات هنگام لود صفحه
document.addEventListener('DOMContentLoaded', setupFarcasterFrame);
