import { type NextRequest, NextResponse } from "next/server"
import { join } from "path"
import { readFile } from "fs/promises"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const url = new URL(request.url)
    const filename = url.pathname.split("/exports/")[1]

    if (!filename) {
      return new NextResponse("File not found", { status: 404 })
    }

    const filePath = join(process.cwd(), "public", "exports", filename)

    try {
      const fileBuffer = await readFile(filePath)

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      })
    } catch (error) {
      return new NextResponse("File not found", { status: 404 })
    }
  } catch (error) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
}
