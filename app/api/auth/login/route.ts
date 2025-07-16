import { type NextRequest, NextResponse } from "next/server"
import { createToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // TODO: Replace with actual user authentication logic
    // This should validate credentials against your database
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication - replace with real authentication
    if (email === "demo@company.com" && password === "password123") {
      const user = {
        userId: "1",
        email: "demo@company.com",
        name: "Demo User",
      }

      const token = await createToken(user)

      const response = NextResponse.json(
        {
          message: "Login successful",
          user: {
            id: user.userId,
            email: user.email,
            name: user.name,
          },
        },
        { status: 200 },
      )

      // Set the JWT token as an HTTP-only cookie
      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      return response
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
