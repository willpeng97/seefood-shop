# SEEFOOD Serverless 架構

## 技術棧

| 層級 | 服務 |
|------|------|
| Frontend + Backend | Next.js App Router（Fullstack） |
| Database | Neon PostgreSQL |
| ORM | Prisma |
| Auth | Clerk（Google / LINE / Email） |
| Storage | `public/` 靜態檔 |
| Deploy | Vercel |
| Payment | 綠界 ECPay |

## 本地開發

```bash
cp .env.example .env.local
# 填入 DATABASE_URL、Clerk、ECPay（測試金鑰）

npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Clerk 設定

1. 於 [Clerk Dashboard](https://dashboard.clerk.com) 建立 Application
2. 複製 Publishable Key / Secret Key 至 `.env.local`
3. **Google**：Authentication → Social → 啟用 Google
4. **LINE**：Authentication → Social → 新增 Custom OAuth（LINE Login Channel）
5. 設定 Redirect URLs：`http://localhost:3000/*` 與 Vercel 網域

## Neon + Prisma

1. [Neon](https://neon.tech) 建立專案，複製連線字串至 `DATABASE_URL`
2. `npx prisma db push` 同步 Schema
3. `npm run db:seed` 匯入商品與優惠券

## 綠界 ECPay（測試）

| 變數 | 測試值 |
|------|--------|
| ECPAY_MERCHANT_ID | 3002607 |
| ECPAY_HASH_KEY | pwFHCqoQZGmho4w6 |
| ECPAY_HASH_IV | EkRm7iFT261dpevs |
| ECPAY_ENV | stage |

- 建立訂單：`POST /api/orders`
- 導向付款：`GET /api/payment/ecpay/checkout?orderNumber=...`
- 回調：`POST /api/payment/ecpay/callback`（ReturnURL，需在綠界後台可連線）

## Vercel 部署

1. Import GitHub repo
2. 環境變數：同上（**不要**設定 `GITHUB_PAGES` / `NEXT_PUBLIC_STATIC_EXPORT`）
3. Build Command：`npm run build`（`postinstall` 會執行 `prisma generate`）
4. 於 Vercel 填入 `DATABASE_URL`（Neon 建議使用 pooled 連線字串）

## API 一覽

| Method | Path | 說明 |
|--------|------|------|
| GET | /api/products | 商品列表 |
| GET | /api/products/[id] | 商品詳情 |
| POST | /api/orders | 建立訂單（可訪客） |
| GET | /api/orders | 我的訂單（需登入） |
| GET | /api/coupons | 我的優惠券（需登入） |
| GET | /api/payment/ecpay/checkout | 綠界付款表單 |
| POST | /api/payment/ecpay/callback | 綠界付款通知 |

## 無資料庫時

未設定 `DATABASE_URL` 時，商品資料仍從 `src/data/products.json` 讀取，訂單／優惠券 API 回傳 503。
