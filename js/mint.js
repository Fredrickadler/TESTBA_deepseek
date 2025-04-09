import { showLoading, hideLoading, updateLoadingProgress } from './app.js';

async function mintNFT() {
  try {
    showLoading('Starting mint process...', { progress: 0 });
    // مرحله 1
    updateLoadingProgress(30);
    // مرحله 2
    updateLoadingProgress(60);
    // مرحله نهایی
    updateLoadingProgress(100);
    hideLoading();
  } catch (error) {
    hideLoading();
    throw error;
  }
}