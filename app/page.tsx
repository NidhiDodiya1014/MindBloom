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
import { WaterCelebration } from "@/components/water-celebration"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [hasMeditated, setHasMeditated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [showWaterCelebration, setShowWaterCelebration] = useState(false)

  useEffect(() => {
    // Check if user has meditated today
    const today = new Date().toDateString()
    const lastMeditation = localStorage.getItem("lastMeditation")
    const savedDarkMode = localStorage.getItem("darkMode")

    if (lastMeditation === today) {
      setHasMeditated(true)
    }

    if (savedDarkMode === "true") {
      setDarkMode(true)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Apply dark mode classes
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleMeditationComplete = () => {
    const today = new Date().toDateString()
    localStorage.setItem("lastMeditation", today)
    setHasMeditated(true)
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
  }

  const handleWaterGoalComplete = () => {
    setShowWaterCelebration(true)
    setTimeout(() => setShowWaterCelebration(false), 4000)
  }

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? "bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117]"
            : "bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"
        }`}
      >
        <div className={`animate-pulse text-xl font-medium ${darkMode ? "text-[#58A6FF]" : "text-purple-600"}`}>
          Loading MindBloom...
        </div>
      </div>
    )
  }

  if (!hasMeditated) {
    return <MeditationGate onComplete={handleMeditationComplete} darkMode={darkMode} />
  }

  const renderPage = () => {
    const pageProps = { darkMode, onWaterGoalComplete: handleWaterGoalComplete }

    switch (currentPage) {
      case "dashboard":
        return <Dashboard {...pageProps} />
      case "planner":
        return <Planner darkMode={darkMode} />
      case "journal":
        return <Journal darkMode={darkMode} />
      case "health":
        return <Health {...pageProps} />
      case "reading":
        return <Reading darkMode={darkMode} />
      case "goals":
        return <Goals darkMode={darkMode} />
      case "breaks":
        return <Breaks darkMode={darkMode} />
      case "settings":
        return <Settings darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      default:
        return <Dashboard {...pageProps} />
    }
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117]"
          : "bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"
      }`}
    >
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <main className="pt-20 pb-8">{renderPage()}</main>

      {showWaterCelebration && <WaterCelebration darkMode={darkMode} />}
    </div>
  )
}
