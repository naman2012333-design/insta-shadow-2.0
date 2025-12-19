import { NextResponse } from "next/server"
import crypto from "crypto"
import { getKeyStore } from "@/lib/keys"

export async function POST() {
  const key = crypto.randomBytes(16).toString("hex")

  const store = getKeyStore()
  store.add(key)

  return NextResponse.json({
    success: true,
    key,
  })
}
