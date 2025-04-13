import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getRelativeTime(date: Date | string): string {
  const now = new Date()
  const d = new Date(date)
  const diffMs = d.getTime() - now.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMs < 0) {
    // In the past
    if (diffDays > -1) return "Today"
    if (diffDays > -2) return "Yesterday"
    if (diffDays > -7) return `${Math.abs(diffDays)} days ago`
    if (diffDays > -30) return `${Math.floor(Math.abs(diffDays) / 7)} weeks ago`
    if (diffDays > -365) return `${Math.floor(Math.abs(diffDays) / 30)} months ago`
    return `${Math.floor(Math.abs(diffDays) / 365)} years ago`
  } else {
    // In the future
    if (diffDays < 1) return "Today"
    if (diffDays < 2) return "Tomorrow"
    if (diffDays < 7) return `In ${diffDays} days`
    if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`
    if (diffDays < 365) return `In ${Math.floor(diffDays / 30)} months`
    return `In ${Math.floor(diffDays / 365)} years`
  }
}
