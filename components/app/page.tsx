"use client"

import { useState, useEffect } from "react"
import { MeditationGate } from "@/components/meditation-gate"
import { Dashboard } from "@/components/dashboard"
import { Navigation } from "@/components/navigation"
import { Planner } from "@/components/planner"
import { Journal } from "@/components/journal"
import { Health } from "@/components/health"
import { Reading } from "@/components/reading"
import { Goals } from "@/components/goals"
import { Breaks } from "@/components/breaks"
import { Settings } from "@/components/settings"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [hasMeditated, setHasMeditated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has meditated today
    const today = new Date().toDateString()
    const lastMeditation = localStorage.getItem("lastMeditation")

    if (lastMeditation === today) {
      setHasMeditated(true)
    }

    setIsLoading(false)
  }, [])

  const handleMeditationComplete = () => {
    const today = new Date().toDateString()
    localStorage.setItem("lastMeditation", today)
    setHasMeditated(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-purple-600 text-xl font-medium">Loading MindBloom...</div>
      </div>
    )
  }

  if (!hasMeditated) {
    return <MeditationGate onComplete={handleMeditationComplete} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "planner":
        return <Planner />
      case "journal":
        return <Journal />
      case "health":
        return <Health />
      case "reading":
        return <Reading />
      case "goals":
        return <Goals />
      case "breaks":
        return <Breaks />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="pt-20 pb-8">{renderPage()}</main>
    </div>
  )
}
