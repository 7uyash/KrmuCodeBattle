import type React from "react"
import Link from "next/link"
import { Gift, Medal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomCursor } from "@/components/custom-cursor"
import { TrophyIcon } from "lucide-react"

export default function PrizesPage() {
  // Sample prize data
  const currentPrizes = [
    {
      id: 1,
      contest: "Algorithm Masters Challenge",
      endDate: "March 30, 2025",
      prizes: [
        { position: "1st Place", reward: "₹20,000 + Internship Opportunity at Tech Giant" },
        { position: "2nd Place", reward: "₹10,000 + Premium Coding Course Bundle" },
        { position: "3rd Place", reward: "₹5,000 + 1-year Subscription to Coding Platform" },
      ],
      difficulty: "Hard",
    },
    {
      id: 2,
      contest: "Web Dev Hackathon",
      endDate: "April 2, 2025",
      prizes: [
        { position: "1st Place", reward: "₹15,000 + Latest MacBook Air" },
        { position: "2nd Place", reward: "₹7,500 + Mechanical Keyboard + Premium Headphones" },
        { position: "3rd Place", reward: "₹3,000 + 1-year Subscription to Web Dev Tools" },
      ],
      difficulty: "Medium",
    },
    {
      id: 3,
      contest: "Data Science Cup",
      endDate: "April 5, 2025",
      prizes: [
        { position: "1st Place", reward: "₹25,000 + GPU for Machine Learning" },
        { position: "2nd Place", reward: "₹12,500 + Cloud Credits Worth ₹50,000" },
        { position: "3rd Place", reward: "₹6,000 + Data Science Course Bundle" },
      ],
      difficulty: "Medium",
    },
  ]

  const upcomingPrizes = [
    {
      id: 4,
      contest: "Mobile App Challenge",
      startDate: "April 15, 2025",
      prizes: [
        { position: "1st Place", reward: "₹30,000 + App Store Publishing Support" },
        { position: "2nd Place", reward: "₹15,000 + Latest iPad Pro" },
        { position: "3rd Place", reward: "₹7,500 + Mobile Dev Course Bundle" },
      ],
      difficulty: "Medium",
    },
    {
      id: 5,
      contest: "Security CTF",
      startDate: "April 22, 2025",
      prizes: [
        { position: "1st Place", reward: "₹40,000 + Cybersecurity Certification" },
        { position: "2nd Place", reward: "₹20,000 + Security Tools Bundle" },
        { position: "3rd Place", reward: "₹10,000 + 1-year VPN Subscription" },
      ],
      difficulty: "Expert",
    },
  ]

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
            <Button
              variant="outline"
              className="hidden border-zinc-800 text-white hover:bg-zinc-800 hover:text-white md:flex"
            >
              Log In
            </Button>
            <Button className="hidden md:flex">Sign Up</Button>
            <Button size="icon" variant="outline" className="border-zinc-800 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Prizes & Rewards</h1>
          <p className="text-zinc-400">Compete and win amazing prizes in KRMU CodeBattle competitions</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[3fr_1fr]">
          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrophyIcon className="h-5 w-5 text-primary" />
                  Standard Prize Structure
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  All contests follow this standard prize structure
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
