import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { requireAdmin } from "@/lib/auth"
import { getContest } from "@/actions/contest-actions"
import { ContestForm } from "@/components/contest-form"
import { CustomCursor } from "@/components/custom-cursor"

export default async function EditContestPage({ params }: { params: { id: string } }) {
  await requireAdmin()

  const contest = await getContest(params.id)

  if (!contest) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <CustomCursor />
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-6">
          <Link href="/admin/contests" className="inline-flex items-center text-sm text-zinc-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contests
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Contest</h1>
          <p className="text-zinc-400">Update contest details</p>
        </div>

        <div className="mx-auto max-w-2xl">
          <ContestForm contest={contest} />
        </div>
      </div>
    </main>
  )
}
