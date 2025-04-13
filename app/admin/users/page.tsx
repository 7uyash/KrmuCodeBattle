import Link from "next/link"
import { requireAdmin } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomCursor } from "@/components/custom-cursor"
import prisma from "@/lib/db"

export default async function AdminUsersPage() {
  await requireAdmin()

  // Fetch all users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          participations: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

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
            <Link
              href="/admin/contests"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Contests
            </Link>
            <Link href="/admin/users" className="text-sm font-medium text-white transition-colors hover:text-white">
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
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-zinc-400">View and manage user accounts</p>
        </div>

        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription className="text-zinc-400">
              Total: {users.length} {users.length === 1 ? "user" : "users"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Contests</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-zinc-800">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${user.role === "ADMIN" ? "bg-primary/20 text-primary" : "bg-zinc-800 text-zinc-400"}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">{user._count.participations}</td>
                      <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
