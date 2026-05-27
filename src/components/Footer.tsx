export function Footer() {
  return (
    <footer className="mt-auto border-t border-ocean-200 bg-ocean-900 text-ocean-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-white">鱸好家</h2>
            <p className="mt-2 text-base leading-relaxed">
              台灣在地水產直送，急凍鎖鮮、溯源透明，讓您安心選購每一口鮮味。
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">客服資訊</h3>
            <p className="mt-2 text-base">週一至週五 09:00–18:00</p>
            <p className="text-base">service@luhaojia.example.com</p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">第二階段預告</h3>
            <ul className="mt-2 space-y-1 text-base">
              <li>PostgreSQL 商品資料庫</li>
              <li>LINE Pay / 信用卡金流</li>
              <li>黑貓 / 新竹物流追蹤</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-ocean-700 pt-6 text-center text-sm text-ocean-300">
          © {new Date().getFullYear()} 鱸好家水產電商 · 第一階段 Mock 展示版
        </p>
      </div>
    </footer>
  );
}
