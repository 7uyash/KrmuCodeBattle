"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerForContest } from "@/actions/contest-actions"
import { Button } from "@/components/ui/button"

type RegisterButtonProps = {
  contestId: string
}

export function RegisterButton({ contestId }: RegisterButtonProps) {
  const router = useRouter()
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleRegister() {
    setIsRegistering(true)
    setError(null)

    try {
      const result = await registerForContest(contestId)

      if (result.error) {
        setError(result.error)
      } else {
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">{error}</div>
      )}
      <Button className="w-full" onClick={handleRegister} disabled={isRegistering}>
        {isRegistering ? "Registering..." : "Register for this Contest"}
      </Button>
    </>
  )
}
