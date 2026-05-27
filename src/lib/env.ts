export const env = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: process.env.DATABASE_URL ?? "",
  linePayChannelId: process.env.LINE_PAY_CHANNEL_ID ?? "",
  logisticsApiUrl: process.env.LOGISTICS_API_URL ?? "",
} as const;
