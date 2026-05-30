import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";

const notConfigured = () =>
  NextResponse.json({ error: "Neon Auth 尚未設定" }, { status: 503 });

const handlers = auth ? auth.handler() : null;

export const GET = handlers?.GET ?? notConfigured;
export const POST = handlers?.POST ?? notConfigured;
