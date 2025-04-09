// اتصال کیف پولimport { showLoading, hideLoading } from './app.js';

async function connectWallet() {
  try {
    showLoading('Connecting wallet...');
    // عملیات اتصال
    hideLoading();
  } catch (error) {
    hideLoading();
    throw error;
  }
}