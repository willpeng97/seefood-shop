"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { TempLayerBadge } from "./TempLayerBadge";
import type { CheckoutFormData } from "@/types/product";
import { env } from "@/lib/env";

const initialForm: CheckoutFormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "line_pay",
  note: "",
};

export function OnePageCheckout() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState<CheckoutFormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${env.apiBaseUrl}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.product.id,
            quantity: i.quantity,
          })),
          shipping: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            address: form.address,
            city: form.city,
            postalCode: form.postalCode,
          },
          paymentMethod: form.paymentMethod,
          note: form.note,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "結帳失敗");

      setOrderId(data.orderId);
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "結帳時發生錯誤");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <div
        className="rounded-xl border border-celadon-200 bg-celadon-50 p-8 text-center"
        role="status"
      >
        <h2 className="text-2xl font-bold text-ocean-900">訂單已建立！</h2>
        <p className="mt-2 text-lg text-ocean-700">訂單編號：{orderId}</p>
        <p className="mt-4 text-base text-ocean-600">
          第一階段為 Mock 訂單，第二階段將串接 LINE Pay 與物流追蹤。
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex min-h-[48px] items-center rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover"
        >
          繼續購物
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-ocean-200 bg-white p-8 text-center">
        <p className="text-lg text-ocean-700">購物車是空的</p>
        <Link
          href="/products"
          className="mt-4 inline-flex min-h-[48px] items-center rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover"
        >
          前往選購
        </Link>
      </div>
    );
  }

  const frozenCount = items.filter(
    (i) => i.product.temp_layer === "frozen"
  ).length;
  const ambientCount = items.filter(
    (i) => i.product.temp_layer === "ambient"
  ).length;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* 購物清單 */}
      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="text-2xl font-bold text-ocean-900">
          購物清單
        </h2>
        {(frozenCount > 0 || ambientCount > 0) && (
          <p className="mt-2 text-base text-ocean-600">
            系統已依溫層標記，未來將自動拆單配送：
            {frozenCount > 0 && ` 冷凍 ${frozenCount} 項`}
            {ambientCount > 0 && ` 常溫 ${ambientCount} 項`}
          </p>
        )}

        <ul className="mt-4 space-y-4">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex gap-4 rounded-xl border border-ocean-100 bg-white p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-ocean-900">
                    {product.name}
                  </h3>
                  <TempLayerBadge layer={product.temp_layer} />
                </div>
                <p className="text-base text-ocean-600">
                  NT$ {product.price} × {quantity}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-ocean-200 text-lg font-medium hover:bg-ocean-50"
                    aria-label={`減少 ${product.name} 數量`}
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-lg">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-ocean-200 text-lg font-medium hover:bg-ocean-50"
                    aria-label={`增加 ${product.name} 數量`}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="ml-auto text-base text-red-600 underline hover:text-red-800"
                  >
                    移除
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-right text-xl font-bold text-ocean-900">
          小計：NT$ {totalPrice.toLocaleString()}
        </p>
      </section>

      {/* 收件與付款 */}
      <section aria-labelledby="checkout-form-heading">
        <h2
          id="checkout-form-heading"
          className="text-2xl font-bold text-ocean-900"
        >
          收件資訊與付款
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-base font-medium text-ocean-800">
                收件人姓名 *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full min-h-[48px] rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-base font-medium text-ocean-800">
                手機 *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 w-full min-h-[48px] rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium text-ocean-800">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full min-h-[48px] rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-500"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-base font-medium text-ocean-800">
                縣市 *
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={form.city}
                onChange={handleChange}
                className="mt-1 w-full min-h-[48px] rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-500"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-base font-medium text-ocean-800">
                郵遞區號 *
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                required
                autoComplete="postal-code"
                value={form.postalCode}
                onChange={handleChange}
                className="mt-1 w-full min-h-[48px] rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-base font-medium text-ocean-800">
                詳細地址 *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                autoComplete="street-address"
                value={form.address}
                onChange={handleChange}
                className="mt-1 w-full min-h-[48px] rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="paymentMethod" className="block text-base font-medium text-ocean-800">
                支付方式（暫存）
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="mt-1 w-full min-h-[48px] rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-500"
              >
                <option value="line_pay">LINE Pay（第二階段串接）</option>
                <option value="credit_card">信用卡預授權（第二階段串接）</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="note" className="block text-base font-medium text-ocean-800">
                備註
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                value={form.note}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-ocean-200 px-4 py-3 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-500"
              />
            </div>
          </div>

          {error && (
            <p className="text-base text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full min-h-[52px] rounded-xl bg-accent text-lg font-bold text-white transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-60"
          >
            {submitting ? "處理中…" : `確認結帳 NT$ ${totalPrice.toLocaleString()}`}
          </button>
        </form>
      </section>
    </div>
  );
}
