import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative min-h-[70vh] overflow-hidden bg-ocean-900"
      aria-labelledby="hero-heading"
    >
      <Image
        src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b9a2?w=1920&q=85"
        alt="煎至焦黃的鱸魚排，外酥內嫩的高食慾感熟食照片"
        fill
        priority
        className="object-cover opacity-70"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/95 via-ocean-900/70 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <h1
          id="hero-heading"
          className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          從魚塭到餐桌
          <span className="mt-2 block text-celadon-300">急凍鎖鮮，安心溯源</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ocean-100 sm:text-xl">
          嘉義直送金目鱸、雲林野生白蝦——三清處理、去刺去殼，30-50
          歲家庭也能輕鬆料理的好鮮味。
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ocean-900"
          >
            立即選購
          </Link>
          <Link
            href="/products/lu-hao-jia-001"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
          >
            人氣鱸魚排
          </Link>
        </div>
      </div>
    </section>
  );
}
