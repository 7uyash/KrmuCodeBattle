import type React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Clock, Users } from "lucide-react"
import { getContests } from "@/actions/contest-actions"
import { getCurrentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CustomCursor } from "@/components/custom-cursor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ContestSearch } from "@/components/contest-search"
import { getRelativeTime } from "@/lib/utils"

export default async function ContestsPage({
  searchParams,
}: {
  searchParams: { search?: string; difficulty?: string; category?: string }
}) {
  const user = await getCurrentUser()
  const search = searchParams.search || ""
  const difficulty = searchParams.difficulty
  const category = searchParams.category

  const activeContests = await getContests("active", search, difficulty, category)
  const upcomingContests = await getContests("upcoming", search, difficulty, category)
  const pastContests = await getContests("past", search, difficulty, category)

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
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Contests</h1>
          <p className="text-zinc-400">Browse and participate in KRMU CodeBattle competitions</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[3fr_1fr]">
          <div className="space-y-6">
            <Suspense fallback={<div>Loading search...</div>}>
              <ContestSearch />
            </Suspense>

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
                    <p className="text-zinc-400">No active contests found</p>
                    {search && <p className="mt-2 text-sm text-zinc-500">Try adjusting your search or filters</p>}
                  </div>
                ) : (
                  activeContests.map((contest) => (
                    <ContestCard
                      key={contest.id}
                      id={contest.id}
                      title={contest.title}
                      description={contest.description}
                      date={`Ends ${getRelativeTime(contest.endDate)}`}
                      participants={contest.participants}
                      difficulty={contest.difficulty as any}
                      category={contest.category}
                    />
                  ))
                )}
              </TabsContent>
              <TabsContent value="upcoming" className="space-y-4 pt-4">
                {upcomingContests.length === 0 ? (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center">
                    <p className="text-zinc-400">No upcoming contests found</p>
                    {search && <p className="mt-2 text-sm text-zinc-500">Try adjusting your search or filters</p>}
                  </div>
                ) : (
                  upcomingContests.map((contest) => (
                    <ContestCard
                      key={contest.id}
                      id={contest.id}
                      title={contest.title}
                      description={contest.description}
                      date={`Starts ${getRelativeTime(contest.startDate)}`}
                      participants={contest.participants}
                      difficulty={contest.difficulty as any}
                      category={contest.category}
                    />
                  ))
                )}
              </TabsContent>
              <TabsContent value="past" className="space-y-4 pt-4">
                {pastContests.length === 0 ? (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center">
                    <p className="text-zinc-400">No past contests found</p>
                    {search && <p className="mt-2 text-sm text-zinc-500">Try adjusting your search or filters</p>}
                  </div>
                ) : (
                  pastContests.map((contest) => (
                    <ContestCard
                      key={contest.id}
                      id={contest.id}
                      title={contest.title}
                      description={contest.description}
                      date={`Ended ${getRelativeTime(contest.endDate)}`}
                      participants={contest.participants}
                      difficulty={contest.difficulty as any}
                      category={contest.category}
                      isPast
                    />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Filter Contests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form action="/contests" className="space-y-4">
                  <input type="hidden" name="search" value={search} />

                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="easy" name="difficulty" value="Easy" defaultChecked={difficulty === "Easy"} />
                        <Label htmlFor="easy" className="text-sm font-normal">
                          Easy
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="medium"
                          name="difficulty"
                          value="Medium"
                          defaultChecked={difficulty === "Medium"}
                        />
                        <Label htmlFor="medium" className="text-sm font-normal">
                          Medium
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="hard" name="difficulty" value="Hard" defaultChecked={difficulty === "Hard"} />
                        <Label htmlFor="hard" className="text-sm font-normal">
                          Hard
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="expert"
                          name="difficulty"
                          value="Expert"
                          defaultChecked={difficulty === "Expert"}
                        />
                        <Label htmlFor="expert" className="text-sm font-normal">
                          Expert
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue={category || "all"}>
                      <SelectTrigger className="w-full bg-zinc-900">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Algorithms">Algorithms</SelectItem>
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                        <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                        <SelectItem value="Game Development">Game Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Apply Filters
                  </Button>
                </form>
              </CardContent>
            </Card>

            {user ? (
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium text-primary">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-zinc-400">{user.email}</div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{user.participations.length}</p>
                      <p className="text-xs text-zinc-400">Contests Participated</p>
                    </div>
                  </div>
                  <Link href="/profile">
                    <Button variant="outline" className="w-full border-zinc-800">
                      View Full Profile
                    </Button>
                  </Link>
                </CardContent>
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
                <CardTitle>Featured Contest</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <Badge className="mb-2 bg-primary">Featured</Badge>
                  <h3 className="font-medium">KRMU Annual Coding Championship</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Our flagship annual competition with the biggest prizes and challenges
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
                    <Clock className="h-4 w-4" />
                    <span>Coming soon</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-zinc-800">
                  Register Interest
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

function ContestCard({
  id,
  title,
  description,
  date,
  participants,
  difficulty,
  category,
  isPast = false,
}: {
  id: string
  title: string
  description: string
  date: string
  participants: number
  difficulty: "Easy" | "Medium" | "Hard" | "Expert"
  category: string
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
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={difficultyColor}>
              {difficulty}
            </Badge>
            <Badge variant="outline" className="bg-zinc-800/50 text-zinc-400">
              {category}
            </Badge>
          </div>
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
