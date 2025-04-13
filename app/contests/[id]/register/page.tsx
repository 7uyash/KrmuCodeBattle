import { notFound, redirect } from "next/navigation"
import { getContest } from "@/actions/contest-actions"
import { requireAuth } from "@/lib/auth"
import { RegistrationForm } from "@/components/registration-form"

export default async function RegisterPage({ params }: { params: { id: string } }) {
  const user = await requireAuth()
  const contest = await getContest(params.id)

  if (!contest) {
    notFound()
  }

  // Check if contest is active or upcoming
  const now = new Date()
  if (new Date(contest.endDate) < now) {
    redirect(`/contests/${params.id}?error=contest-ended`)
  }

  // Check if user is already registered
  const isRegistered = user.participations.some((p) => p.contestId === contest.id)
  if (isRegistered) {
    redirect(`/contests/${params.id}?error=already-registered`)
  }

  return <RegistrationForm contestId={contest.id} contestTitle={contest.title} />
}
