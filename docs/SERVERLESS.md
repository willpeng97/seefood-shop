# SEEFOOD Serverless 架構

## 技術棧

| 層級 | 服務 |
|------|------|
| Frontend + Backend | Next.js App Router（Fullstack） |
| Database | Neon PostgreSQL |
| ORM | Prisma |
| Auth | Neon Auth（Better Auth，Google / Email OTP） |
| Storage | `public/` 靜態檔 |
| Deploy | Vercel |
| Payment | 綠界 ECPay |

## 本地開發

```bash
cp .env.example .env.local
# 填入 DATABASE_URL、Neon Auth、ECPay（測試金鑰）

npm install
npx prisma generate
npm run db:push    # 會從 .env.local 讀取 DATABASE_URL
npm run db:seed
npm run dev
```

> **注意**：Prisma CLI 預設只讀專案根目錄的 `.env`，不會讀 `.env.local`（那是 Next.js 慣例）。請用 `npm run db:push`，或把 `DATABASE_URL` 複製到 `.env` 再執行 `npx prisma db push`。

## Neon Auth 設定

1. 於 [Neon Console](https://console.neon.tech) 專案 → **Auth** → **Configuration**，複製 **Auth Base URL** 至 `NEON_AUTH_BASE_URL`
2. 產生 Cookie secret（至少 32 字元）：

   ```bash
   openssl rand -base64 32
   ```

   寫入 `NEON_AUTH_COOKIE_SECRET`
3. 設定 `NEXT_PUBLIC_NEON_AUTH_ENABLED=true`（讓前端顯示登入 UI）
4. **Google**：Auth → Providers → 啟用 Google，並設定 OAuth Client ID / Secret
5. **Email**：預設支援 Email + 密碼；可於 Provider 啟用 Email OTP
6. OAuth 回調由 `/api/auth/*` 代理，本機網域需加入 Neon Auth 允許清單

參考：[Migrate from legacy auth](https://neon.com/docs/auth/migrate/from-legacy-auth)、[Next.js quick start](https://neon.com/docs/auth/quick-start/nextjs-api-only)

### 路由

| 路徑 | 說明 |
|------|------|
| `/api/auth/[...path]` | Auth API 代理 |
| `/auth/sign-in`、`/auth/sign-up` | 內建登入／註冊 UI |
| `/account/auth` | 站內會員登入區（嵌入 AuthView） |

## Neon + Prisma

1. [Neon](https://neon.tech) 建立專案，複製連線字串至 `DATABASE_URL`
2. `npx prisma db push` 同步 Schema（`user_id` 欄位取代原 Clerk `clerk_user_id`）
3. `npm run db:seed` 匯入商品與優惠券
4. 選填：`NEON_AUTH_DEMO_USER_ID` 綁定示範優惠券至測試帳號

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
| GET/POST | /api/auth/[...path] | Neon Auth 代理 |
| GET | /api/payment/ecpay/checkout | 綠界付款表單 |
| POST | /api/payment/ecpay/callback | 綠界付款通知 |

## 無資料庫時

未設定 `DATABASE_URL` 時，商品資料仍從 `src/data/products.json` 讀取，訂單／優惠券 API 回傳 503。
