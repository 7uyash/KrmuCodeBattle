import { type NextRequest, NextResponse } from "next/server"
import { join } from "path"
import { readFile, mkdir, writeFile } from "fs/promises"
import { existsSync } from "fs"
import * as XLSX from "xlsx"
import prisma from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

// Ensure the exports directory exists
async function ensureExportsDirectory() {
  const dir = join(process.cwd(), "public", "exports")
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }
  return dir
}

// Generate Excel file for a contest
async function generateExcelFile(contestId: string) {
  const contest = await prisma.contest.findUnique({
    where: { id: contestId },
  })

  if (!contest) {
    throw new Error("Contest not found")
  }

  const registrations = await prisma.participation.findMany({
    where: { contestId },
    include: {
      user: true,
    },
  })

  // Format data for Excel
  const data = registrations.map((reg) => ({
    Name: reg.user.name,
    Email: reg.user.email,
    "Roll Number": reg.rollNumber || "N/A",
    Section: reg.section || "N/A",
    Semester: reg.semester || "N/A",
    "Contact Number": reg.contactNumber || "N/A",
    "Registration Date": reg.joinedAt.toLocaleString(),
  }))

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data)

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Registrations")

  // Generate Excel file
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" })

  // Create directory if it doesn't exist
  const dir = await ensureExportsDirectory()
  const filename = `${contest.title.replace(/\s+/g, "_")}_registrations.xlsx`
  const filePath = join(dir, filename)

  // Write the file
  await writeFile(filePath, excelBuffer)

  return { filename, filePath }
}

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  try {
    await requireAdmin()

    const filename = params.filename

    // If the filename contains a contestId parameter, generate the file
    if (filename.includes("generate_")) {
      const contestId = filename.replace("generate_", "").replace(".xlsx", "")
      const { filename: generatedFilename, filePath } = await generateExcelFile(contestId)

      // Redirect to the generated file
      return NextResponse.redirect(new URL(`/api/exports/${generatedFilename}`, request.url))
    }

    // Otherwise, serve the existing file
    const dir = await ensureExportsDirectory()
    const filePath = join(dir, filename)

    try {
      const fileBuffer = await readFile(filePath)

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      })
    } catch (error) {
      console.error("Error reading file:", error)
      return new NextResponse("File not found", { status: 404 })
    }
  } catch (error) {
    console.error("Error in exports route:", error)
    return new NextResponse("Unauthorized or error occurred", { status: 401 })
  }
}
