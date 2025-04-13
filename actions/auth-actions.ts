"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import { hashPassword, verifyPassword } from "@/lib/auth"

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword(password),
      },
    })

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Error signing up:", error)
    return { error: "Failed to create account" }
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !verifyPassword(password, user.password)) {
      return { error: "Invalid email or password" }
    }

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Error logging in:", error)
    return { error: "Failed to log in" }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("userId")
  redirect("/")
}
