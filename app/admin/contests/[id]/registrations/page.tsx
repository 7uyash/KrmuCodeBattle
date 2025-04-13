import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { notFound } from "next/navigation"
import { requireAdmin } from "@/lib/auth"
import { getContest, getContestRegistrations } from "@/actions/contest-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { CustomCursor } from "@/components/custom-cursor"

export default async function ContestRegistrationsPage({ params }: { params: { id: string } }) {
  await requireAdmin()

  const contest = await getContest(params.id)
  if (!contest) {
    notFound()
  }

  const registrations = await getContestRegistrations(params.id)

  return (
    <main className="min-h-screen bg-black text-white">
      <CustomCursor />
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-6">
          <Link href={`/admin/contests`} className="inline-flex items-center text-sm text-zinc-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contests
          </Link>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{contest.title} - Registrations</h1>
            <p className="text-zinc-400">Manage participant registrations</p>
          </div>
          <Link href={`/api/exports/generate_${contest.id}.xlsx`} target="_blank">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export to Excel
            </Button>
          </Link>
        </div>

        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader>
            <CardTitle>Registered Participants</CardTitle>
            <CardDescription className="text-zinc-400">
              Total: {registrations.length} {registrations.length === 1 ? "participant" : "participants"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registrations.length === 0 ? (
              <div className="py-8 text-center text-zinc-400">No registrations yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Roll Number</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Section</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Semester</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Contact</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Registered On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration) => (
                      <tr key={registration.id} className="border-b border-zinc-800">
                        <td className="px-4 py-3">{registration.user.name}</td>
                        <td className="px-4 py-3">{registration.user.email}</td>
                        <td className="px-4 py-3">{registration.rollNumber || "N/A"}</td>
                        <td className="px-4 py-3">{registration.section || "N/A"}</td>
                        <td className="px-4 py-3">{registration.semester || "N/A"}</td>
                        <td className="px-4 py-3">{registration.contactNumber || "N/A"}</td>
                        <td className="px-4 py-3">{formatDate(registration.joinedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
