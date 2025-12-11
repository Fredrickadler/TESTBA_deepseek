-- database-schema.sql
-- Schema for NFT minting tracking

-- جدول اصلی برای ذخیره اطلاعات مینت‌ها
CREATE TABLE IF NOT EXISTS nft_mints (
  id SERIAL PRIMARY KEY,
  fid BIGINT NOT NULL,
  transaction_hash VARCHAR(66) NOT NULL UNIQUE,
  token_id INTEGER,
  minted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ایندکس برای جستجوی سریع
CREATE INDEX IF NOT EXISTS idx_nft_mints_fid ON nft_mints(fid);
CREATE INDEX IF NOT EXISTS idx_nft_mints_transaction_hash ON nft_mints(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_nft_mints_minted_at ON nft_mints(minted_at);

-- جدول برای آمار کلی (اختیاری - برای بهینه‌سازی)
CREATE TABLE IF NOT EXISTS nft_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_supply INTEGER NOT NULL DEFAULT 1000,
  minted_count INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT single_row CHECK (id = 1)
);

-- تابع برای به‌روزرسانی خودکار آمار
CREATE OR REPLACE FUNCTION update_nft_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE nft_stats 
  SET 
    minted_count = (SELECT COUNT(*) FROM nft_mints),
    last_updated = CURRENT_TIMESTAMP
  WHERE id = 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- تریگر برای به‌روزرسانی خودکار آمار بعد از هر مینت
CREATE TRIGGER trigger_update_nft_stats
AFTER INSERT ON nft_mints
FOR EACH ROW
EXECUTE FUNCTION update_nft_stats();

-- مقداردهی اولیه جدول آمار
INSERT INTO nft_stats (id, total_supply, minted_count)
VALUES (1, 1000, 0)
ON CONFLICT (id) DO NOTHING;

