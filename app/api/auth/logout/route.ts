import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logout successful" }, { status: 200 })

    // Remove the auth token cookie
    response.cookies.delete("auth-token")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
