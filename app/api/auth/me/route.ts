import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: user.userId,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
