import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/auth"

export default async function AdminPage() {
  await requireAdmin()
  redirect("/admin/contests")
}
