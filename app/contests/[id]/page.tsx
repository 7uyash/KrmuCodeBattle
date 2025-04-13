import Link from "next/link"
import { ArrowLeft, Calendar, Clock, TrophyIcon, Users, Medal, Gift } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomCursor } from "@/components/custom-cursor"
import { getContest } from "@/actions/contest-actions"
import { getCurrentUser } from "@/lib/auth"
import { formatDate } from "@/lib/utils"

export default async function ContestPage({ params }: { params: { id: string } }) {
  const contest = await getContest(params.id)
  const user = await getCurrentUser()

  if (!contest) {
    notFound()
  }

  // Check if user is already registered
  const isRegistered = user?.participations.some((p) => p.contestId === contest.id) || false

  // Determine contest status
  const now = new Date()
  const isActive = new Date(contest.startDate) <= now && new Date(contest.endDate) >= now
  const isUpcoming = new Date(contest.startDate) > now
  const isPast = new Date(contest.endDate) < now

  return (
    <main className="min-h-screen bg-black text-white">
      <CustomCursor />
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-6">
          <Link href="/contests" className="inline-flex items-center text-sm text-zinc-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contests
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
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
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {contest.category}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{contest.title}</h1>
              <p className="mt-2 text-zinc-400">{contest.description}</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full bg-zinc-950">
                <TabsTrigger value="overview" className="flex-1">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="prizes" className="flex-1">
                  Prizes
                </TabsTrigger>
                <TabsTrigger value="rules" className="flex-1">
                  Rules
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 pt-4">
                <Card className="border-zinc-800 bg-zinc-950">
                  <CardContent className="pt-6">
                    <p className="mb-4">{contest.description}</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-800 p-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Start Date</p>
                          <p className="text-sm text-zinc-400">{formatDate(contest.startDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-800 p-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">End Date</p>
                          <p className="text-sm text-zinc-400">{formatDate(contest.endDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-800 p-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-zinc-400">
                            {Math.ceil(
                              (new Date(contest.endDate).getTime() - new Date(contest.startDate).getTime()) /
                                (1000 * 60 * 60),
                            )}{" "}
                            hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-800 p-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Participants</p>
                          <p className="text-sm text-zinc-400">{contest.participants} registered</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="prizes" className="space-y-4 pt-4">
                <Card className="border-zinc-800 bg-zinc-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrophyIcon className="h-5 w-5 text-yellow-500" />
                      Contest Prizes
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Top performers will receive the following rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 rounded-lg border border-zinc-800 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                          <Medal className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">1st Place</h3>
                          <p className="text-sm text-zinc-400">₹5,000</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 rounded-lg border border-zinc-800 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400/10 text-zinc-400">
                          <Medal className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">2nd Place</h3>
                          <p className="text-sm text-zinc-400">₹3,000</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 rounded-lg border border-zinc-800 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700/10 text-amber-700">
                          <Medal className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">3rd Place</h3>
                          <p className="text-sm text-zinc-400">₹2,000</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 rounded-lg border border-zinc-800 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Gift className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">4th & 5th Place</h3>
                          <p className="text-sm text-zinc-400">Special Goodies</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="rules" className="space-y-4 pt-4">
                <Card className="border-zinc-800 bg-zinc-950">
                  <CardHeader>
                    <CardTitle>Contest Rules</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Please read and follow all rules carefully
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          1
                        </span>
                        <span>All submissions must be your original work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          2
                        </span>
                        <span>You may use any programming language supported by our platform</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          3
                        </span>
                        <span>External libraries are allowed only if specified in the problem statement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          4
                        </span>
                        <span>Collaboration with other participants is strictly prohibited</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          5
                        </span>
                        <span>Time and space complexity will be considered in the evaluation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          6
                        </span>
                        <span>Submissions after the deadline will not be accepted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          7
                        </span>
                        <span>Judges' decisions are final</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Registration</CardTitle>
                <CardDescription className="text-zinc-400">Sign up for this contest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">
                        {isPast ? "Contest Ended" : isActive ? "Contest Active" : "Registration Closes"}
                      </span>
                    </div>
                    <span>
                      {isPast
                        ? formatDate(contest.endDate)
                        : isActive
                          ? `Ends ${formatDate(contest.endDate)}`
                          : formatDate(contest.startDate)}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-medium">Participants</span>
                    </div>
                    <span>{contest.participants}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {!user ? (
                  <Link href="/login" className="w-full">
                    <Button className="w-full">Log in to Register</Button>
                  </Link>
                ) : isPast ? (
                  <Button className="w-full" disabled>
                    Contest Ended
                  </Button>
                ) : isRegistered ? (
                  <Button className="w-full" disabled>
                    Already Registered
                  </Button>
                ) : (
                  <Link href={`/contests/${contest.id}/register`} className="w-full">
                    <Button className="w-full">Register Now</Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Similar Contests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <TrophyIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Data Structures Challenge</h3>
                    <p className="text-sm text-zinc-400">Starts in 2 weeks</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <TrophyIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Competitive Programming Cup</h3>
                    <p className="text-sm text-zinc-400">Starts in 1 month</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/contests">
                  <Button variant="link" className="w-full text-primary">
                    View All Similar Contests
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
