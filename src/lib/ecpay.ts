import crypto from "crypto";

export interface EcpayConfig {
  merchantId: string;
  hashKey: string;
  hashIV: string;
  apiUrl: string;
  returnUrl: string;
  orderResultUrl: string;
  clientBackUrl: string;
}

export function getEcpayConfig(): EcpayConfig | null {
  const merchantId = process.env.ECPAY_MERCHANT_ID;
  const hashKey = process.env.ECPAY_HASH_KEY;
  const hashIV = process.env.ECPAY_HASH_IV;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!merchantId || !hashKey || !hashIV) {
    return null;
  }

  const isStage = process.env.ECPAY_ENV !== "production";

  return {
    merchantId,
    hashKey,
    hashIV,
    apiUrl: isStage
      ? "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
      : "https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5",
    returnUrl: `${appUrl}/api/payment/ecpay/callback`,
    orderResultUrl: `${appUrl}/checkout/result`,
    clientBackUrl: `${appUrl}/products`,
  };
}

/** 綠界 CheckMacValue（SHA256） */
export function generateCheckMacValue(
  params: Record<string, string>,
  hashKey: string,
  hashIV: string
): string {
  const sorted = Object.keys(params)
    .filter((k) => k !== "CheckMacValue" && params[k] !== undefined && params[k] !== "")
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  let raw = `HashKey=${hashKey}`;
  for (const key of sorted) {
    raw += `&${key}=${params[key]}`;
  }
  raw += `&HashIV=${hashIV}`;

  const encoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/[!'()*]/g, (c) =>
      "%" + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")
    );

  return crypto.createHash("sha256").update(encoded).digest("hex").toUpperCase();
}

export function verifyCheckMacValue(
  params: Record<string, string>,
  hashKey: string,
  hashIV: string
): boolean {
  const received = params.CheckMacValue;
  if (!received) return false;
  const expected = generateCheckMacValue(params, hashKey, hashIV);
  return received === expected;
}

export function buildEcpayCheckoutParams(options: {
  merchantTradeNo: string;
  totalAmount: number;
  itemName: string;
  tradeDesc: string;
  email: string;
  config: EcpayConfig;
}): Record<string, string> {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const merchantTradeDate = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const params: Record<string, string> = {
    MerchantID: options.config.merchantId,
    MerchantTradeNo: options.merchantTradeNo,
    MerchantTradeDate: merchantTradeDate,
    PaymentType: "aio",
    TotalAmount: String(options.totalAmount),
    TradeDesc: options.tradeDesc.slice(0, 200),
    ItemName: options.itemName.slice(0, 400),
    ReturnURL: options.config.returnUrl,
    OrderResultURL: `${options.config.orderResultUrl}?orderNumber=${encodeURIComponent(options.merchantTradeNo)}`,
    ClientBackURL: options.config.clientBackUrl,
    ChoosePayment: "ALL",
    EncryptType: "1",
    NeedExtraPaidInfo: "N",
    CustomField1: options.email.slice(0, 50),
  };

  params.CheckMacValue = generateCheckMacValue(
    params,
    options.config.hashKey,
    options.config.hashIV
  );

  return params;
}

export function buildAutoSubmitHtml(
  apiUrl: string,
  params: Record<string, string>
): string {
  const inputs = Object.entries(params)
    .map(
      ([k, v]) =>
        `<input type="hidden" name="${k}" value="${String(v).replace(/"/g, "&quot;")}" />`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head><meta charset="utf-8"/><title>前往綠界付款</title></head>
<body>
<form id="ecpay" method="post" action="${apiUrl}">
${inputs}
</form>
<script>document.getElementById('ecpay').submit();</script>
<p style="font-family:sans-serif;text-align:center;margin-top:2rem;">正在前往綠界金流…</p>
</body>
</html>`;
}
