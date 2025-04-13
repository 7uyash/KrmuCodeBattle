import type React from "react"
import Link from "next/link"
import { ArrowRight, Search, Trophy, Users, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CustomCursor } from "@/components/custom-cursor"
import { getContests } from "@/actions/contest-actions"
import { getCurrentUser } from "@/lib/auth"
import { getRelativeTime } from "@/lib/utils"

export default async function Home() {
  const user = await getCurrentUser()

  const activeContests = await getContests("active", "", undefined, undefined)
  const upcomingContests = await getContests("upcoming", "", undefined, undefined)
  const pastContests = await getContests("past", "", undefined, undefined)

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
            {user ? (
              <>
                <Link href="/profile">
                  <Button
                    variant="outline"
                    className="hidden border-zinc-800 text-white hover:bg-zinc-800 hover:text-white md:flex"
                  >
                    Profile
                  </Button>
                </Link>
                <form action="/api/logout" method="post">
                  <Button type="submit" variant="outline" className="hidden border-zinc-800 md:flex">
                    Log Out
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="hidden border-zinc-800 text-white hover:bg-zinc-800 hover:text-white md:flex"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="hidden md:flex">Sign Up</Button>
                </Link>
              </>
            )}
            <Button size="icon" variant="outline" className="border-zinc-800 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome to KRMU CodeBattle</h1>
              <p className="text-zinc-400">Compete, learn, and win amazing prizes in our coding contests.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Search contests..."
                  className="w-full bg-zinc-950 pl-8 text-white placeholder:text-zinc-500"
                />
              </div>
              <Link href="/contests">
                <Button variant="outline" className="shrink-0 border-zinc-800">
                  Browse All
                </Button>
              </Link>
            </div>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="w-full bg-zinc-950">
                <TabsTrigger value="active" className="flex-1">
                  Active Contests
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="flex-1">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="flex-1">
                  Past
                </TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="space-y-4 pt-4">
                {activeContests.length === 0 ? (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center">
                    <p className="text-zinc-400">No active contests at the moment</p>
                    <p className="mt-2 text-sm text-zinc-500">Check back soon or browse upcoming contests</p>
                  </div>
                ) : (
                  activeContests
                    .slice(0, 3)
                    .map((contest) => (
                      <ContestCard
                        key={contest.id}
                        title={contest.title}
                        description={contest.description}
                        date={`Ends ${getRelativeTime(contest.endDate)}`}
                        participants={contest.participants}
                        difficulty={contest.difficulty as any}
                        id={contest.id}
                      />
                    ))
                )}
              </TabsContent>
              <TabsContent value="upcoming" className="space-y-4 pt-4">
                {upcomingContests.length === 0 ? (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center">
                    <p className="text-zinc-400">No upcoming contests scheduled</p>
                    <p className="mt-2 text-sm text-zinc-500">Check back soon for new contests</p>
                  </div>
                ) : (
                  upcomingContests
                    .slice(0, 3)
                    .map((contest) => (
                      <ContestCard
                        key={contest.id}
                        title={contest.title}
                        description={contest.description}
                        date={`Starts ${getRelativeTime(contest.startDate)}`}
                        participants={contest.participants}
                        difficulty={contest.difficulty as any}
                        id={contest.id}
                      />
                    ))
                )}
              </TabsContent>
              <TabsContent value="past" className="space-y-4 pt-4">
                {pastContests.length === 0 ? (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center">
                    <p className="text-zinc-400">No past contests</p>
                    <p className="mt-2 text-sm text-zinc-500">Contests will appear here after they end</p>
                  </div>
                ) : (
                  pastContests
                    .slice(0, 3)
                    .map((contest) => (
                      <ContestCard
                        key={contest.id}
                        title={contest.title}
                        description={contest.description}
                        date={`Ended ${getRelativeTime(contest.endDate)}`}
                        participants={contest.participants}
                        difficulty={contest.difficulty as any}
                        id={contest.id}
                        isPast
                      />
                    ))
                )}
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            {user ? (
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription className="text-zinc-400">Manage your contests and track progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-zinc-400">{user.email}</p>
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
                </CardContent>
                <CardFooter>
                  <Link href="/profile" className="w-full">
                    <Button variant="outline" className="w-full border-zinc-800">
                      View Full Profile
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader>
                  <CardTitle>Join KRMU CodeBattle</CardTitle>
                  <CardDescription className="text-zinc-400">Sign up to participate in contests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-zinc-400">
                    Create an account to register for contests, track your progress, and compete with other students.
                  </p>
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1">
                      <Button variant="outline" className="w-full border-zinc-800">
                        Log In
                      </Button>
                    </Link>
                    <Link href="/signup" className="flex-1">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Weekly Code Challenge</h3>
                    <p className="text-sm text-zinc-400">Tomorrow, 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Community Meetup</h3>
                    <p className="text-sm text-zinc-400">Saturday, 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Workshop: Advanced Algorithms</h3>
                    <p className="text-sm text-zinc-400">Next Monday, 7:00 PM</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="w-full text-primary">
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

function ContestCard({
  title,
  description,
  date,
  participants,
  difficulty,
  id,
  isPast = false,
}: {
  title: string
  description: string
  date: string
  participants: number
  difficulty: "Easy" | "Medium" | "Hard" | "Expert"
  id: string
  isPast?: boolean
}) {
  const difficultyColor = {
    Easy: "bg-green-500/10 text-green-500",
    Medium: "bg-yellow-500/10 text-yellow-500",
    Hard: "bg-orange-500/10 text-orange-500",
    Expert: "bg-red-500/10 text-red-500",
  }[difficulty]

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="text-zinc-400">{description}</CardDescription>
          </div>
          <Badge variant="outline" className={difficultyColor}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-zinc-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-zinc-400" />
            <span>{participants} participants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isPast ? (
          <Link href={`/contests/${id}`} className="w-full">
            <Button variant="outline" className="w-full border-zinc-800">
              View Results
            </Button>
          </Link>
        ) : (
          <Link href={`/contests/${id}`} className="w-full">
            <Button className="w-full">
              Register Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
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

function Clock(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
