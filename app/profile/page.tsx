import type React from "react"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { requireAuth } from "@/lib/auth"
import { getContests } from "@/actions/contest-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { CustomCursor } from "@/components/custom-cursor"

export default async function ProfilePage() {
  const user = await requireAuth()

  // Get all contests the user has participated in
  const contestIds = user.participations.map((p) => p.contestId)
  let participatedContests: any[] = []

  if (contestIds.length > 0) {
    // This is a simplified approach - in a real app, you'd want to fetch these more efficiently
    const activeContests = await getContests("active")
    const upcomingContests = await getContests("upcoming")
    const pastContests = await getContests("past")

    const allContests = [...activeContests, ...upcomingContests, ...pastContests]
    participatedContests = allContests.filter((contest) => contestIds.includes(contest.id))
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <CustomCursor />
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <span className="text-xl font-bold">KRMU CodeBattle</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link href="/contests" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Contests
            </Link>
            <Link href="/prizes" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Prizes
            </Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Contact Us
            </Link>
            <Link href="/rules" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Rules
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <form action="/api/logout" method="post">
              <Button type="submit" variant="outline" className="hidden border-zinc-800 md:flex">
                Log Out
              </Button>
            </form>
            <Button size="icon" variant="outline" className="border-zinc-800 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-zinc-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription className="text-zinc-400">Your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{user.name.charAt(0)}</span>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-zinc-400">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-zinc-800 p-3 text-center">
                    <p className="text-2xl font-bold">{user.participations.length}</p>
                    <p className="text-xs text-zinc-400">Contests</p>
                  </div>
                  <div className="rounded-lg border border-zinc-800 p-3 text-center">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs text-zinc-400">Wins</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-zinc-800">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full border-zinc-800">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full border-zinc-800">
                  Notification Settings
                </Button>
                <form action="/api/logout" method="post">
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full border-zinc-800 hover:bg-red-900/20 hover:text-red-500"
                  >
                    Log Out
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Contest Participation</CardTitle>
                <CardDescription className="text-zinc-400">Contests you have registered for</CardDescription>
              </CardHeader>
              <CardContent>
                {participatedContests.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-zinc-400">You haven't participated in any contests yet</p>
                    <Link href="/contests" className="mt-4 inline-block">
                      <Button>Browse Contests</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {participatedContests.map((contest) => (
                      <div
                        key={contest.id}
                        className="flex items-center justify-between rounded-lg border border-zinc-800 p-4"
                      >
                        <div>
                          <h3 className="font-medium">{contest.title}</h3>
                          <div className="mt-1 flex items-center gap-4 text-sm text-zinc-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(contest.startDate) > new Date()
                                  ? `Starts: ${formatDate(contest.startDate)}`
                                  : new Date(contest.endDate) > new Date()
                                    ? `Ends: ${formatDate(contest.endDate)}`
                                    : `Ended: ${formatDate(contest.endDate)}`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link href={`/contests/${contest.id}`}>
                          <Button variant="outline" size="sm" className="border-zinc-800">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription className="text-zinc-400">Your accomplishments on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <p className="text-zinc-400">No achievements yet</p>
                  <p className="mt-2 text-sm text-zinc-500">Participate in contests to earn achievements</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
