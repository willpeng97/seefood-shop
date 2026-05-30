import { AuthView } from "@neondatabase/auth-ui";
import { authViewPaths } from "@neondatabase/auth-ui/server";
import { isNeonAuthConfigured } from "@/lib/auth/server";
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  if (!isNeonAuthConfigured()) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <h1 className="text-xl font-semibold text-ocean-900">會員系統尚未設定</h1>
        <p className="mt-3 text-base text-ocean-700">
          請設定 <code className="text-sm">NEON_AUTH_BASE_URL</code> 與{" "}
          <code className="text-sm">NEON_AUTH_COOKIE_SECRET</code>。
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-celadon-700 underline"
        >
          返回首頁
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-lg grow flex-col justify-center px-4 py-12">
      <AuthView path={path} />
    </div>
  );
}
