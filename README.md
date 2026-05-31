# 遇見鮮食（seefood-shop）— 水產電商平台（第一階段）

台灣水產直送電商前端，採用 **Next.js App Router**、**TypeScript**、**Tailwind CSS** 與 **Zustand** 購物車狀態管理。

## 技術棧

| 項目 | 技術 |
|------|------|
| 框架 | Next.js 16（App Router） |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS v4 |
| 狀態 | Zustand（persist 本地儲存） |
| 圖片 | next/image + Unsplash CDN |
| 資料庫 | Neon PostgreSQL + Prisma |
| 驗證 | Neon Auth（Google / Email OTP） |
| 金流 | 綠界 ECPay |
| 部署 | Vercel（Fullstack）／GitHub Pages（靜態 Demo） |

## 快速開始（Serverless / Vercel）

```bash
npm install
cp .env.example .env.local   # 填入 DATABASE_URL、Neon Auth、ECPay
npm run db:push
npm run db:seed
npm run dev
```

詳見 [docs/SERVERLESS.md](docs/SERVERLESS.md)。  
從 Cloud Agent 改本機開發請讀 [docs/DEV-HANDOFF.md](docs/DEV-HANDOFF.md)。

## 快速開始（僅前端）

```bash
npm install
cp .env.example .env.local   # 若尚未建立
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)

## 線上 Demo（GitHub Pages）

**網址：** https://willpeng97.github.io/seefood-shop/

合併至 `main` 後，GitHub Actions 會將靜態檔推送到 `gh-pages` 分支。首次請至 Repo **Settings → Pages → Build and deployment → Source** 選擇 **Deploy from a branch**，Branch 設為 **gh-pages** / **/ (root)**。

本地預覽靜態站：

```bash
npm run build:pages
npx serve out -l 3000
# 瀏覽 http://localhost:3000/seefood-shop/
```

## 專案結構

```
src/
├── app/
│   ├── products/         # 商品列表（Server Component）
│   ├── products/[id]/    # 商品詳情 + 溯源卡片
│   └── checkout/         # 一頁式結帳（動態載入）
├── components/
├── data/products.json    # Mock 資料
├── lib/
├── store/cart-store.ts
└── types/
```

## 第二階段對接

1. 將 `src/lib/products.ts` 改為 PostgreSQL / MongoDB 查詢（並恢復 API Routes 若需 SSR）
2. 串接 LINE Pay、信用卡預授權
3. 串接黑貓 / 新竹物流追蹤 API

## 指令

```bash
npm run dev         # 開發
npm run build       # 標準建置（含 Node 伺服器）
npm run build:pages # GitHub Pages 靜態匯出
npm run start       # 生產預覽
npm run lint        # ESLint
```
