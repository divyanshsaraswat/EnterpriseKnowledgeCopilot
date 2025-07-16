import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this-in-production")

export interface JWTPayload {
  userId: string
  email: string
  name: string
  exp?: number
}

export async function createToken(payload: Omit<JWTPayload, "exp">): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, secret)
  return payload as JWTPayload
}

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("auth-token")?.value || null
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const token = await getTokenFromCookies()
    if (!token) return null

    return await verifyToken(token)
  } catch (error) {
    console.error("Failed to get current user:", error)
    return null
  }
}

export function setAuthCookie(token: string) {
  const cookieStore = cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })
}

export function removeAuthCookie() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
}
