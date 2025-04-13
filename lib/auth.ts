import { cookies } from "next/headers"
import { createHash } from "crypto"
import { redirect } from "next/navigation"
import prisma from "./db"

// Simple password hashing
export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex")
}

// Verify password
export function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword
}

// Get current user from cookie
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        participations: {
          select: {
            contestId: true,
            joinedAt: true,
          },
        },
      },
    })

    return user
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}

// Check if user is admin
export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === "ADMIN"
}

// Require authentication
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

// Require admin
export async function requireAdmin() {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") {
    redirect("/")
  }

  return user
}
