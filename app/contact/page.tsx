import type React from "react"
import Link from "next/link"
import { AtSign, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CustomCursor } from "@/components/custom-cursor"

export default function ContactPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-zinc-400">Get in touch with the KRMU CodeBattle team</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription className="text-zinc-400">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Enter your first name" className="bg-zinc-900" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Enter your last name" className="bg-zinc-900" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="bg-zinc-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter the subject" className="bg-zinc-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message" className="min-h-[150px] bg-zinc-900" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Send Message</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription className="text-zinc-400">Ways to reach the KRMU CodeBattle team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-zinc-400">For general inquiries</p>
                    <p className="mt-1 text-sm">contact@krmucodebattle.edu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-zinc-400">Monday to Friday, 9am to 5pm</p>
                    <p className="mt-1 text-sm">+91 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-zinc-400">K.R. Mangalam University</p>
                    <p className="mt-1 text-sm">Sohna Road, Gurugram, Haryana, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <AtSign className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Social Media</h3>
                    <div className="mt-2 flex gap-2">
                      <Link href="#" className="rounded-full bg-zinc-800 p-2 transition-colors hover:bg-zinc-700">
                        <span className="sr-only">Twitter</span>
                        <TwitterIcon className="h-4 w-4" />
                      </Link>
                      <Link href="#" className="rounded-full bg-zinc-800 p-2 transition-colors hover:bg-zinc-700">
                        <span className="sr-only">Instagram</span>
                        <InstagramIcon className="h-4 w-4" />
                      </Link>
                      <Link href="#" className="rounded-full bg-zinc-800 p-2 transition-colors hover:bg-zinc-700">
                        <span className="sr-only">LinkedIn</span>
                        <LinkedinIcon className="h-4 w-4" />
                      </Link>
                      <Link href="#" className="rounded-full bg-zinc-800 p-2 transition-colors hover:bg-zinc-700">
                        <span className="sr-only">GitHub</span>
                        <GithubIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <h3 className="font-medium">When are contests typically held?</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Contests are typically held on weekends, with special events during university festivals and tech
                    weeks.
                  </p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <h3 className="font-medium">How do I join the organizing team?</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    We recruit volunteers at the beginning of each semester. Watch for announcements or contact us
                    directly.
                  </p>
                </div>
                <Link href="/rules" className="inline-block">
                  <Button variant="link" className="text-primary">
                    View more FAQs
                  </Button>
                </Link>
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

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}
