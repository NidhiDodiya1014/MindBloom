"use client"

import { useEffect, useState } from "react"

interface WaterCelebrationProps {
  darkMode: boolean
}

export function WaterCelebration({ darkMode }: WaterCelebrationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className={`${
          darkMode ? "bg-[#161B22] border-[#58A6FF]" : "bg-white border-blue-500"
        } border-4 rounded-2xl p-8 text-center animate-bounce shadow-2xl`}
      >
        <div className="text-6xl mb-4 animate-pulse">💧🎉</div>
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? "text-[#58A6FF]" : "text-blue-600"}`}>
          Hydration Goal Complete!
        </h2>
        <p className={`text-lg ${darkMode ? "text-[#C9D1D9]" : "text-blue-700"}`}>
          Amazing! You've reached your daily water goal! 🌊
        </p>
        <div className="mt-4 text-4xl animate-spin">⭐</div>
      </div>
    </div>
  )
}
