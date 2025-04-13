"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { getCurrentUser, requireAdmin } from "@/lib/auth"

// Get all contests with filtering
export async function getContests(
  status: "active" | "upcoming" | "past" = "active",
  search = "",
  difficulty?: string,
  category?: string,
) {
  const now = new Date()

  const whereClause: any = {}

  // Add search filter if provided
  if (search) {
    whereClause.title = {
      contains: search,
      // Remove the unsupported mode parameter
    }
  }

  // Add difficulty filter if provided
  if (difficulty) {
    whereClause.difficulty = difficulty
  }

  // Add category filter if provided
  if (category) {
    whereClause.category = category
  }

  // Add date filters based on status
  if (status === "active") {
    whereClause.startDate = { lte: now }
    whereClause.endDate = { gte: now }
  } else if (status === "upcoming") {
    whereClause.startDate = { gt: now }
  } else if (status === "past") {
    whereClause.endDate = { lt: now }
  }

  try {
    const contests = await prisma.contest.findMany({
      where: whereClause,
      orderBy:
        status === "past" ? { endDate: "desc" } : status === "upcoming" ? { startDate: "asc" } : { endDate: "asc" },
      include: {
        _count: {
          select: { participations: true },
        },
      },
    })

    return contests.map((contest) => ({
      ...contest,
      participants: contest._count.participations,
    }))
  } catch (error) {
    console.error("Error fetching contests:", error)
    return []
  }
}

// Get a single contest by ID
export async function getContest(id: string) {
  try {
    const contest = await prisma.contest.findUnique({
      where: { id },
      include: {
        _count: {
          select: { participations: true },
        },
      },
    })

    if (!contest) {
      return null
    }

    return {
      ...contest,
      participants: contest._count.participations,
    }
  } catch (error) {
    console.error("Error fetching contest:", error)
    return null
  }
}

// Create a new contest (admin only)
export async function createContest(formData: FormData) {
  await requireAdmin()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const difficulty = formData.get("difficulty") as string
  const category = formData.get("category") as string

  if (!title || !description || !startDate || !endDate || !difficulty || !category) {
    return { error: "All fields are required" }
  }

  try {
    await prisma.contest.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        difficulty: difficulty as any,
        category,
      },
    })

    revalidatePath("/contests")
    revalidatePath("/admin/contests")
    return { success: true }
  } catch (error) {
    console.error("Error creating contest:", error)
    return { error: "Failed to create contest" }
  }
}

// Update a contest (admin only)
export async function updateContest(id: string, formData: FormData) {
  await requireAdmin()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const difficulty = formData.get("difficulty") as string
  const category = formData.get("category") as string

  if (!title || !description || !startDate || !endDate || !difficulty || !category) {
    return { error: "All fields are required" }
  }

  try {
    await prisma.contest.update({
      where: { id },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        difficulty: difficulty as any,
        category,
      },
    })

    revalidatePath("/contests")
    revalidatePath(`/contests/${id}`)
    revalidatePath("/admin/contests")
    return { success: true }
  } catch (error) {
    console.error("Error updating contest:", error)
    return { error: "Failed to update contest" }
  }
}

// Delete a contest (admin only)
export async function deleteContest(id: string) {
  await requireAdmin()

  try {
    await prisma.contest.delete({
      where: { id },
    })

    revalidatePath("/contests")
    revalidatePath("/admin/contests")
    return { success: true }
  } catch (error) {
    console.error("Error deleting contest:", error)
    return { error: "Failed to delete contest" }
  }
}

// Register for a contest
export async function registerForContest(contestId: string, formData?: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    return { error: "You must be logged in to register for contests" }
  }

  try {
    // Check if already registered
    const existingParticipation = await prisma.participation.findUnique({
      where: {
        userId_contestId: {
          userId: user.id,
          contestId,
        },
      },
    })

    if (existingParticipation) {
      return { error: "You are already registered for this contest" }
    }

    // If formData is provided, extract the registration details
    let registrationData: any = {}

    if (formData) {
      const name = formData.get("name") as string
      const rollNumber = formData.get("rollNumber") as string
      const section = formData.get("section") as string
      const semester = formData.get("semester") as string
      const contactNumber = formData.get("contactNumber") as string

      if (!rollNumber || !section || !semester || !contactNumber) {
        return { error: "All fields are required" }
      }

      registrationData = {
        rollNumber,
        section,
        semester,
        contactNumber,
      }
    }

    // Register for contest
    await prisma.participation.create({
      data: {
        userId: user.id,
        contestId,
        ...registrationData,
      },
    })

    revalidatePath(`/contests/${contestId}`)
    return { success: true }
  } catch (error) {
    console.error("Error registering for contest:", error)
    return { error: "Failed to register for contest" }
  }
}

// Get registrations for a contest (admin only)
export async function getContestRegistrations(contestId: string) {
  await requireAdmin()

  try {
    const registrations = await prisma.participation.findMany({
      where: { contestId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { joinedAt: "desc" },
    })

    return registrations
  } catch (error) {
    console.error("Error fetching contest registrations:", error)
    return []
  }
}
