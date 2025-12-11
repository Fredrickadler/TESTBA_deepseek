# راهنمای راه‌اندازی دیتابیس

## 1. ایجاد پروژه Supabase

1. به [supabase.com](https://supabase.com) بروید
2. یک حساب کاربری ایجاد کنید (رایگان)
3. یک پروژه جدید ایجاد کنید
4. نام پروژه و پسورد دیتابیس را یادداشت کنید

## 2. اجرای Schema

1. در داشبورد Supabase، به بخش **SQL Editor** بروید
2. فایل `database-schema.sql` را باز کنید
3. محتوای آن را در SQL Editor کپی کنید
4. روی **Run** کلیک کنید

## 3. دریافت Credentials

1. در داشبورد Supabase، به **Settings** > **API** بروید
2. این اطلاعات را کپی کنید:
   - **Project URL** (SUPABASE_URL)
   - **anon public key** (SUPABASE_ANON_KEY)

## 4. تنظیم Environment Variables در Vercel

1. در Vercel Dashboard، به پروژه خود بروید
2. به **Settings** > **Environment Variables** بروید
3. این متغیرها را اضافه کنید:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## 5. اطلاعات دیتابیس

### جدول `nft_mints`
ذخیره اطلاعات هر مینت:
- `id`: شناسه یکتا (auto-increment)
- `fid`: Farcaster ID کاربر
- `transaction_hash`: هش تراکنش
- `token_id`: شناسه NFT (اختیاری)
- `minted_at`: زمان مینت

### جدول `nft_stats`
آمار کلی (به‌روزرسانی خودکار):
- `total_supply`: 1000 (ثابت)
- `minted_count`: تعداد مینت شده (به‌روزرسانی خودکار)
- `last_updated`: آخرین به‌روزرسانی

## 6. تست

بعد از راه‌اندازی، API `/api/nft-stats` باید تعداد مینت‌ها را از دیتابیس برگرداند.

## نکات مهم

- دیتابیس به صورت خودکار بعد از هر مینت به‌روز می‌شود
- اگر دیتابیس در دسترس نباشد، سیستم از RPC fallback استفاده می‌کند
- برای امنیت، از `anon key` استفاده کنید (فقط read/write محدود)

