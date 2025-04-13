import Link from "next/link"
import { Plus, Edit, Trash2, Users } from "lucide-react"
import { requireAdmin } from "@/lib/auth"
import { getContests } from "@/actions/contest-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { DeleteContestButton } from "@/components/delete-contest-button"
import { CustomCursor } from "@/components/custom-cursor"

export default async function AdminContestsPage() {
  await requireAdmin()

  const activeContests = await getContests("active")
  const upcomingContests = await getContests("upcoming")
  const pastContests = await getContests("past")

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
            <Link href="/admin/contests" className="text-sm font-medium text-white transition-colors hover:text-white">
              Contests
            </Link>
            <Link href="/admin/users" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Users
            </Link>
            <Link
              href="/admin/settings"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="border-zinc-800">
                View Site
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="container px-4 py-6 md:px:6 md:py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Contests</h1>
            <p className="text-zinc-400">Create, edit, and delete contests</p>
          </div>
          <Link href="/admin/contests/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Contest
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle>Active Contests</CardTitle>
              <CardDescription className="text-zinc-400">Currently running contests</CardDescription>
            </CardHeader>
            <CardContent>
              {activeContests.length === 0 ? (
                <div className="py-4 text-center text-zinc-400">No active contests</div>
              ) : (
                <div className="space-y-4">
                  {activeContests.map((contest) => (
                    <div
                      key={contest.id}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 p-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{contest.title}</h3>
                          <Badge
                            variant="outline"
                            className={
                              contest.difficulty === "Easy"
                                ? "bg-green-500/10 text-green-500"
                                : contest.difficulty === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : contest.difficulty === "Hard"
                                    ? "bg-orange-500/10 text-orange-500"
                                    : "bg-red-500/10 text-red-500"
                            }
                          >
                            {contest.difficulty}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">
                          Ends: {formatDate(contest.endDate)} • {contest.participants} participants
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/contests/${contest.id}/registrations`}>
                          <Button size="sm" variant="outline" className="border-zinc-800">
                            <Users className="h-4 w-4" />
                            <span className="sr-only">Registrations</span>
                          </Button>
                        </Link>
                        <Link href={`/admin/contests/${contest.id}/edit`}>
                          <Button size="sm" variant="outline" className="border-zinc-800">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <DeleteContestButton id={contest.id}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-zinc-800 hover:bg-red-900/20 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </DeleteContestButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle>Upcoming Contests</CardTitle>
              <CardDescription className="text-zinc-400">Scheduled future contests</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingContests.length === 0 ? (
                <div className="py-4 text-center text-zinc-400">No upcoming contests</div>
              ) : (
                <div className="space-y-4">
                  {upcomingContests.map((contest) => (
                    <div
                      key={contest.id}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 p-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{contest.title}</h3>
                          <Badge
                            variant="outline"
                            className={
                              contest.difficulty === "Easy"
                                ? "bg-green-500/10 text-green-500"
                                : contest.difficulty === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : contest.difficulty === "Hard"
                                    ? "bg-orange-500/10 text-orange-500"
                                    : "bg-red-500/10 text-red-500"
                            }
                          >
                            {contest.difficulty}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">
                          Starts: {formatDate(contest.startDate)} • {contest.participants} participants
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/contests/${contest.id}/registrations`}>
                          <Button size="sm" variant="outline" className="border-zinc-800">
                            <Users className="h-4 w-4" />
                            <span className="sr-only">Registrations</span>
                          </Button>
                        </Link>
                        <Link href={`/admin/contests/${contest.id}/edit`}>
                          <Button size="sm" variant="outline" className="border-zinc-800">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <DeleteContestButton id={contest.id}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-zinc-800 hover:bg-red-900/20 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </DeleteContestButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle>Past Contests</CardTitle>
              <CardDescription className="text-zinc-400">Completed contests</CardDescription>
            </CardHeader>
            <CardContent>
              {pastContests.length === 0 ? (
                <div className="py-4 text-center text-zinc-400">No past contests</div>
              ) : (
                <div className="space-y-4">
                  {pastContests.map((contest) => (
                    <div
                      key={contest.id}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 p-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{contest.title}</h3>
                          <Badge
                            variant="outline"
                            className={
                              contest.difficulty === "Easy"
                                ? "bg-green-500/10 text-green-500"
                                : contest.difficulty === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : contest.difficulty === "Hard"
                                    ? "bg-orange-500/10 text-orange-500"
                                    : "bg-red-500/10 text-red-500"
                            }
                          >
                            {contest.difficulty}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">
                          Ended: {formatDate(contest.endDate)} • {contest.participants} participants
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/contests/${contest.id}/registrations`}>
                          <Button size="sm" variant="outline" className="border-zinc-800">
                            <Users className="h-4 w-4" />
                            <span className="sr-only">Registrations</span>
                          </Button>
                        </Link>
                        <Link href={`/admin/contests/${contest.id}/edit`}>
                          <Button size="sm" variant="outline" className="border-zinc-800">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <DeleteContestButton id={contest.id}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-zinc-800 hover:bg-red-900/20 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </DeleteContestButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
