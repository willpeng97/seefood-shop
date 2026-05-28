export function Footer() {
  return (
    <footer className="mt-auto border-t border-ocean-100 bg-ocean-900 text-ocean-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-white">SEEFOOD｜遇見鮮食</h2>
            <p className="mt-2 text-base leading-relaxed">
              現代化高品質海鮮生活品牌，以專業冷鏈與透明溯源，讓每一餐都安心且有儀式感。
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">客服資訊</h3>
            <p className="mt-2 text-base">週一至週五 09:00–18:00</p>
            <p className="text-base">service@seefood.example.com</p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">品牌關鍵字</h3>
            <ul className="mt-2 space-y-1 text-base">
              <li>Fresh / Curated / Modern</li>
              <li>Trustworthy / Lifestyle</li>
              <li>Japanese Minimal Ocean Aesthetic</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-ocean-700 pt-6 text-center text-sm text-ocean-300">
          © {new Date().getFullYear()} SEEFOOD｜遇見鮮食 · 重新定義海鮮電商的生活品牌
        </p>
      </div>
    </footer>
  );
}
