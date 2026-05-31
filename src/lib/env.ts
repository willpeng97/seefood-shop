export const env = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  isProduction: process.env.NODE_ENV === "production",
  /** 與 NEON_AUTH_* 一併設定；供 client 元件判斷是否啟用 Auth UI */
  neonAuthConfigured:
    process.env.NEXT_PUBLIC_NEON_AUTH_ENABLED === "true",
} as const;
