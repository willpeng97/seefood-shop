# 開發交接文件（DEV-HANDOFF）

> **用途**：從 Cursor **Cloud Agent** 改到**本機開發**時，把專案現況與對話決策寫進 repo，讓本機 Agent / 新對話不必依賴雲端聊天記錄。  
> **維護**：重大架構或環境變更後請更新本檔；密碼勿寫入 Git。

**Repo**：`willpeng97/seefood-shop`  
**品牌**：SEEFOOD｜遇見鮮食  
**主分支**：`main`（截至 2026-05，已含 Serverless 全端）

---

## 一、Cloud Agent 對話記憶摘要

以下為雲端開發階段已完成事項與結論，供本機接續時 `@docs/DEV-HANDOFF.md` 或貼入新對話第一則訊息。

### 1.1 產品與前端（已合併 `main`）

| 項目 | 狀態 |
|------|------|
| 水產電商 Next.js + TS + Tailwind + Zustand | ✅ |
| 商品詳情頁（圖廊、購買區、分頁、相關商品） | ✅ |
| 品牌依 `docs/DESIGN.md`（SEEFOOD｜遇見鮮食） | ✅ |
| 失效 Unsplash 圖片修復 | ✅ |
| 右上角會員選單（登入、訂單、優惠券） | ✅ |

### 1.2 Serverless 全端（已合併 `main`）

| 項目 | 狀態 | 備註 |
|------|------|------|
| Neon PostgreSQL + Prisma 5.22 | ✅ | 勿升 Prisma 7（schema `url` 問題曾失敗） |
| 商品 / 訂單 / 優惠券 API | ✅ | 一律讀 DB；無 `DATABASE_URL` 時 API 回 503 |
| 綠界 ECPay 測試串接 | ✅ | 見 `src/lib/ecpay.ts` |
| **Clerk → Neon Auth** | ✅ | `@neondatabase/auth@0.3.0-beta` + `auth-ui@0.2.0-beta` |
| PR #5 內容 | ✅ | 已 fast-forward 合併進 `main` |

### 1.3 驗證（Auth）遷移結論

- 參考：[Neon — Migrate from legacy auth](https://neon.com/docs/auth/migrate/from-legacy-auth)（Stack Auth → Better Auth 流程；本專案由 **Clerk** 改為相同模式的 **Neon Auth**）。
- 核心檔案：
  - `src/lib/auth/server.ts` — `createNeonAuth`、`.handler()`、`.middleware()`
  - `src/lib/auth/client.ts` — `createAuthClient()`
  - `src/app/api/auth/[...path]/route.ts` — API 代理
  - `src/components/Providers.tsx` — `NeonAuthUIProvider`
  - `src/middleware.ts` — 保護 `/account/orders`、`/account/coupons`
- UI：`/account/auth` 嵌入 `AuthView`；`/auth/sign-in` 等標準路由；舊 `/sign-in`、`/sign-up` 導向 `/auth/*`。
- Prisma：`clerkUserId` 已改為 **`userId`**（DB 欄位 `user_id`）。舊庫若仍是 `clerk_user_id` 需手動改名或重新 `db push`。
- **LINE OAuth**：Neon Auth 內建社交以 Google 等為主；LINE 未確認支援，UI 文案已改為 Google + Email／OTP。
- 前端是否顯示登入 UI：靠 **`NEXT_PUBLIC_NEON_AUTH_ENABLED=true`**（client 讀不到 server-only 的 `NEON_AUTH_BASE_URL`）。

### 1.4 資料庫與本機除錯（對話中曾發生）

| 問題 | 原因 | 解法 |
|------|------|------|
| `P1012 Environment variable not found: DATABASE_URL` | Prisma CLI **只讀 `.env`**，不讀 `.env.local` | 使用 **`npm run db:push`** / `db:seed` / `db:studio`（已接 `dotenv-cli -e .env.local`） |
| Neon connect string | 使用者從 Console 取得 **pooled** URL（主機名含 `-pooler`） | 整行貼入 `DATABASE_URL`；若連線失敗可拿掉 `channel_binding=require` |
| `/api/auth/get-session` 400 | Neon Auth 環境變數未設或錯誤 | 檢查 `NEON_AUTH_BASE_URL`、`NEON_AUTH_COOKIE_SECRET`（≥32 字元）、`NEXT_PUBLIC_NEON_AUTH_ENABLED` |

### 1.5 部署

- **Vercel**：Fullstack，需完整環境變數（見 `.env.example`）。

### 1.6 建議後續（尚未做或需本機驗證）

- [ ] 本機 `.env.local` 從雲端或 Neon Console **手動複製**（對話不會帶走密鑰）
- [ ] Neon Console 啟用 Google OAuth，允許 `http://localhost:3000`
- [ ] Vercel Production 環境變數與本機一致後重新部署
- [ ] 綠界 callback 需公網可連（本機可用 ngrok 測試）
- [ ] 視需要新增 `.cursor/rules` 固化慣例

---

## 二、本機開發快速開始

### 2.1 需求

- **Node.js 20+**
- **Git**
- **Cursor**（或 VS Code）開啟 repo 根目錄

### 2.2 第一次設定

```bash
git clone https://github.com/willpeng97/seefood-shop.git
cd seefood-shop
git checkout main
git pull origin main

npm install
cp .env.example .env.local
# 編輯 .env.local（見下方檢查清單，勿 commit）

npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

瀏覽器：**http://localhost:3000**

---

## 三、環境變數檢查清單

複製 `.env.example` → `.env.local`，逐項填入（**值勿寫進本檔**）：

| 變數 | 必填 | 取得方式 |
|------|------|----------|
| `DATABASE_URL` | 全端必填 | Neon Console → Connect → **Pooled** connection string |
| `NEXT_PUBLIC_NEON_AUTH_ENABLED` | Auth UI | 設 `true` |
| `NEON_AUTH_BASE_URL` | Auth | Neon Console → **Auth** → Configuration |
| `NEON_AUTH_COOKIE_SECRET` | Auth | `openssl rand -base64 32`（≥32 字元） |
| `NEXT_PUBLIC_APP_URL` | 建議 | `http://localhost:3000` |
| `NEXT_PUBLIC_API_BASE_URL` | 建議 | 同左 |
| `ECPAY_*` | 金流測試 | 見 `.env.example` 測試預設 |
| `NEON_AUTH_DEMO_USER_ID` | 選填 | seed 綁定示範優惠券 |

---

## 四、常用指令

```bash
npm run dev          # 開發伺服器
npm run build        # 正式建置
npm run lint         # ESLint
npm run db:push      # Prisma 同步 schema（讀 .env.local）
npm run db:seed      # 種子資料
npm run db:studio    # Prisma Studio
```

---

## 五、關鍵路徑對照

```
src/lib/auth/server.ts      # Neon Auth 伺服器單例
src/lib/auth/client.ts      # 客戶端 authClient
src/lib/auth/session.ts     # API 用 getAuthUserId()
src/lib/db.ts               # Prisma、isDatabaseConfigured()
src/lib/products.ts         # DB
prisma/schema.prisma        # Product, Order, Coupon, UserCoupon
docs/SERVERLESS.md          # 架構與 Neon / ECPay 細節
docs/DESIGN.md              # 品牌視覺規範
.env.example                # 環境變數範本
```

---

## 六、給本機 Cursor Agent 的開場白（可複製）

```text
我改在本機開發 seefood-shop，請先閱讀 docs/DEV-HANDOFF.md 與 docs/SERVERLESS.md。
main 已含 Neon + Prisma + Neon Auth + 綠界。Prisma 請用 npm run db:push（讀 .env.local）。
回覆請用繁體中文。
```

---

## 七、文件修訂紀錄

| 日期 | 說明 |
|------|------|
| 2026-05-30 | 初版：Cloud Agent → 本機交接 + 對話記憶摘要 |
