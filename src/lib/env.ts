export const env = {
  /** 選填；未設時 client 端 fetch 使用同網域相對路徑（/api/...） */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "",
  isProduction: process.env.NODE_ENV === "production",
  /** 與 NEON_AUTH_* 一併設定；供 client 元件判斷是否啟用 Auth UI */
  neonAuthConfigured:
    process.env.NEXT_PUBLIC_NEON_AUTH_ENABLED === "true",
} as const;
