"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerForContest } from "@/actions/contest-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CustomCursor } from "@/components/custom-cursor"

type RegistrationFormProps = {
  contestId: string
  contestTitle: string
}

export function RegistrationForm({ contestId, contestTitle }: RegistrationFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await registerForContest(contestId, formData)

      if (result.error) {
        setError(result.error)
        setIsSubmitting(false)
      } else {
        router.push(`/contests/${contestId}?registered=true`)
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <CustomCursor />
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mx-auto max-w-2xl">
          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle>Register for {contestTitle}</CardTitle>
              <CardDescription className="text-zinc-400">
                Please fill out the form below to register for this contest
              </CardDescription>
            </CardHeader>
            <form action={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Enter your full name" required className="bg-zinc-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number / Enrollment ID</Label>
                  <Input
                    id="rollNumber"
                    name="rollNumber"
                    placeholder="Enter your roll number or enrollment ID"
                    required
                    className="bg-zinc-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      name="section"
                      placeholder="Enter your section"
                      required
                      className="bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input
                      id="semester"
                      name="semester"
                      placeholder="Enter your semester"
                      required
                      className="bg-zinc-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    placeholder="Enter your contact number"
                    required
                    className="bg-zinc-900"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-zinc-800"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Complete Registration"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </main>
  )
}
