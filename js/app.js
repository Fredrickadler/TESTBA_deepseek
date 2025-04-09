// عناصر DOM
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');

// توابع مدیریت لودینگ پیشرفته
export function showLoading(message = 'Processing...', options = {}) {
  loadingText.textContent = message;
  
  // تنظیمات اختیاری
  if (options.progress) {
    loadingText.innerHTML = `${message}<br><small>${options.progress}%</small>`;
  }
  
  loadingOverlay.classList.add('active');
}

export function hideLoading() {
  loadingOverlay.classList.remove('active');
}

export function updateLoadingProgress(percent) {
  const progressElement = loadingText.querySelector('small');
  if (progressElement) {
    progressElement.textContent = `${percent}%`;
  }
}