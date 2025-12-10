# TESTBA_deepseek

## NFT Minting Mini App for Farcaster

این پروژه یک مینی‌اپ Farcaster برای مینت NFT است که از Neynar API استفاده می‌کند.

### تنظیمات

1. فایل `.env` را در ریشه پروژه ایجاد کنید و متغیرهای زیر را تنظیم کنید:

```env
NEYNAR_API_KEY=your_neynar_api_key_here
NEYNAR_WALLET_ID=your_wallet_id_here
```

2. برای دریافت API key و Wallet ID:
   - API key: از [Neynar Dashboard](https://neynar.com) دریافت کنید
   - Wallet ID: برای تراکنش‌های onchain، باید با Neynar تماس بگیرید تا server wallet برای شما تنظیم شود

### اطلاعات قرارداد

- **Contract Address**: `0xE3285ae14Ce5407AAa6F0135671108B237DaA789`
- **Collection ID**: `6939db61e3c25e8da214b39a`
- **Network**: Base
- **Mint Link**: https://highlight.xyz/mint/base:0xE3285ae14Ce5407AAa6F0135671108B237DaA789:1

### نحوه استفاده

1. پروژه را در Vercel deploy کنید
2. Environment variables را در تنظیمات Vercel اضافه کنید
3. مینی‌اپ را در Warpcast باز کنید
4. روی دکمه "MINT NOW" کلیک کنید

### API Endpoints

- `POST /api/mint-nft` - مینت NFT برای کاربر Farcaster با استفاده از FID