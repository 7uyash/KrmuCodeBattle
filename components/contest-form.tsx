"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createContest, updateContest } from "@/actions/contest-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ContestFormProps = {
  contest?: {
    id: string
    title: string
    description: string
    startDate: Date
    endDate: Date
    difficulty: string
    category: string
  }
}

export function ContestForm({ contest }: ContestFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Format date for input field (YYYY-MM-DDTHH:MM)
  function formatDateForInput(date: Date | string) {
    const d = new Date(date)
    return d.toISOString().slice(0, 16)
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      let result

      if (contest) {
        result = await updateContest(contest.id, formData)
      } else {
        result = await createContest(formData)
      }

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
      } else {
        router.push("/admin/contests")
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <form action={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">{error}</div>
          )}
          <div className="space-y-2">
            <Label htmlFor="title">Contest Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={contest?.title}
              placeholder="e.g., Algorithm Masters Challenge"
              required
              className="bg-zinc-900"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={contest?.description}
              placeholder="Describe the contest..."
              required
              className="min-h-[100px] bg-zinc-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                defaultValue={contest ? formatDateForInput(contest.startDate) : ""}
                required
                className="bg-zinc-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                defaultValue={contest ? formatDateForInput(contest.endDate) : ""}
                required
                className="bg-zinc-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select name="difficulty" defaultValue={contest?.difficulty || "Medium"}>
                <SelectTrigger className="bg-zinc-900">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                defaultValue={contest?.category}
                placeholder="e.g., Algorithms, Web Development"
                required
                className="bg-zinc-900"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            className="border-zinc-800"
            onClick={() => router.push("/admin/contests")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : contest ? "Update Contest" : "Create Contest"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
