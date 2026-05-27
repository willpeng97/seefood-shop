# 鱸好家（seefood-shop）— 水產電商平台（第一階段）

台灣水產直送電商前端，採用 **Next.js App Router**、**TypeScript**、**Tailwind CSS** 與 **Zustand** 購物車狀態管理。

## 技術棧

| 項目 | 技術 |
|------|------|
| 框架 | Next.js 16（App Router） |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS v4 |
| 狀態 | Zustand（persist 本地儲存） |
| 圖片 | next/image + Unsplash CDN |

## 快速開始

```bash
npm install
cp .env.example .env.local   # 若尚未建立
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)

## 專案結構

```
src/
├── app/
│   ├── api/products/     # Mock API（未來替換 DB 查詢）
│   ├── api/checkout/     # Mock 結帳
│   ├── products/         # 商品列表（Server Component）
│   ├── products/[id]/    # 商品詳情 + 溯源卡片
│   └── checkout/         # 一頁式結帳（動態載入）
├── components/
├── data/products.json    # Mock 資料
├── lib/
├── store/cart-store.ts
└── types/
```

## 功能對照規格

- **海洋色彩**：深海藍 `#002147`、青瓷綠、夕陽橘 `#FF4500` 強調按鈕
- **高食慾首圖**：首頁 Hero 熟食風格鱸魚排
- **比例尺圖**：商品詳情頁 `scale_image` 區塊
- **溫層標籤**：`temp_layer` → 冷凍 / 常溫
- **數位溯源**：可展開 TraceabilityCard
- **一頁式結帳**：購物清單 + 收件 + 付款（Mock）
- **WCAG**：語意化標籤、16px 基準字體、焦點環、對比色

## 第二階段對接

1. 將 `src/lib/products.ts` 與 API Routes 改為 PostgreSQL / MongoDB
2. 串接 LINE Pay、信用卡預授權
3. 串接黑貓 / 新竹物流追蹤 API

## 指令

```bash
npm run dev    # 開發
npm run build  # 建置
npm run start  # 生產預覽
npm run lint   # ESLint
```
