"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  if (typeof window === "undefined") return null

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, input, textarea, select, [role="button"] {
          cursor: none;
        }
      `}</style>
      <div
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center mix-blend-difference"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s ease, transform 0.05s ease, width 0.15s ease, height 0.15s ease",
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: isClicking ? "24px" : "12px",
            height: isClicking ? "24px" : "12px",
            transition: "width 0.2s ease, height 0.2s ease",
          }}
        ></div>
      </div>
      <div
        className="pointer-events-none fixed left-0 top-0 z-40 flex items-center justify-center rounded-full border border-white/30 mix-blend-difference"
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
          width: "40px",
          height: "40px",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease, transform 0.2s ease",
        }}
      ></div>
    </>
  )
}
