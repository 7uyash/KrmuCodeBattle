"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"

export function ContestSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [isPending, startTransition] = useTransition()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()

    const params = new URLSearchParams(searchParams)
    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }

    startTransition(() => {
      router.push(`/contests?${params.toString()}`)
    })
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
        <Input
          type="search"
          placeholder="Search contests..."
          className="w-full bg-zinc-950 pl-8 text-white placeholder:text-zinc-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button type="submit" variant="outline" className="shrink-0 border-zinc-800" disabled={isPending}>
        Search
      </Button>
    </form>
  )
}
