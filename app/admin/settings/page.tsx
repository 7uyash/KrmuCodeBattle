import Link from "next/link"
import { requireAdmin } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomCursor } from "@/components/custom-cursor"

export default async function AdminSettingsPage() {
  await requireAdmin()

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
            <Link href="/admin/users" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Users
            </Link>
            <Link href="/admin/settings" className="text-sm font-medium text-white transition-colors hover:text-white">
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
          <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-zinc-400">Configure platform settings and preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
              <CardDescription className="text-zinc-400">Basic site settings and configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">Settings functionality will be implemented in a future update.</p>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
              <CardDescription className="text-zinc-400">Configure data export options</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">Export settings will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
