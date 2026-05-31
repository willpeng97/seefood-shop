# 遇見鮮食（seefood-shop）— 水產電商平台（第一階段）

台灣水產直送電商前端，採用 **Next.js App Router**、**TypeScript**、**Tailwind CSS** 與 **Zustand** 購物車狀態管理。

## 技術棧


| 項目  | 技術                                      |
| --- | --------------------------------------- |
| 框架  | Next.js 16（App Router）                  |
| 語言  | TypeScript                              |
| 樣式  | Tailwind CSS v4                         |
| 狀態  | Zustand（persist 本地儲存）                   |
| 圖片  | next/image + Unsplash CDN               |
| 資料庫 | Neon PostgreSQL + Prisma                |
| 驗證  | Neon Auth（Google / Email OTP）           |
| 金流  | 綠界 ECPay                                |
| 部署  | Vercel（Fullstack） |


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

## 快速開始（僅前端 UI）

商品、訂單等資料一律從資料庫讀取，仍需設定 `DATABASE_URL` 並執行 `db:push`、`db:seed`（見上方 Serverless 步驟）。

## 專案結構

```
src/
├── app/
│   ├── products/         # 商品列表（Server Component）
│   ├── products/[id]/    # 商品詳情 + 溯源卡片
│   └── checkout/         # 一頁式結帳（動態載入）
├── components/
├── lib/
├── store/cart-store.ts
└── types/
```

## 第二階段對接

1. 串接 LINE Pay、信用卡預授權
2. 串接黑貓 / 新竹物流追蹤 API

## 指令

```bash
npm run dev         # 開發
npm run build       # 正式建置
npm run start       # 生產預覽
npm run lint        # ESLint
```

