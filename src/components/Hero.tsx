import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative min-h-[72vh] overflow-hidden bg-ocean-900"
      aria-labelledby="hero-heading"
    >
      <Image
        src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1920&q=85"
        alt="煎至焦黃的鱸魚排，外酥內嫩的高食慾感熟食照片"
        fill
        priority
        className="object-cover opacity-70"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/90 via-ocean-900/60 to-ocean-900/20" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <p className="inline-flex w-fit rounded-full border border-white/40 bg-white/10 px-3 py-1 text-sm text-white/95 backdrop-blur-sm">
          Premium Seafood Lifestyle Brand
        </p>
        <h1
          id="hero-heading"
          className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          SEEFOOD｜遇見鮮食
          <span className="mt-2 block text-celadon-300">遇見最新鮮的日常</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ocean-100 sm:text-xl">
          以職人級選品與現代冷鏈，讓每一次下廚都更安心。看見海鮮真正的樣子，
          從海洋到餐桌，重新定義海鮮電商。
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-ocean-900 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-celadon-700 focus:outline-none focus:ring-2 focus:ring-celadon-300 focus:ring-offset-2 focus:ring-offset-ocean-900"
          >
            立即選購
          </Link>
          <Link
            href="/products/lu-hao-jia-001"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/70 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white"
          >
            查看職人選品
          </Link>
        </div>
      </div>
    </section>
  );
}
