import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-ocean-900">找不到商品</h1>
      <p className="mt-2 text-lg text-ocean-700">此商品可能已下架或網址有誤。</p>
      <Link
        href="/products"
        className="mt-6 inline-flex min-h-[48px] items-center rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover"
      >
        返回商品列表
      </Link>
    </div>
  );
}
