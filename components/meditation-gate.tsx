"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from "lucide-react"

interface MeditationGateProps {
  onComplete: () => void
}

export function MeditationGate({ onComplete }: MeditationGateProps) {
  const [selectedDuration, setSelectedDuration] = useState(5)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(5 * 60)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft <= 1) {
            setIsActive(false)
            setIsCompleted(true)
            return 0
          }
          return timeLeft - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const startMeditation = () => {
    setTimeLeft(selectedDuration * 60)
    setIsActive(true)
    setIsCompleted(false)
  }

  const pauseMeditation = () => {
    setIsActive(false)
  }

  const resetMeditation = () => {
    setIsActive(false)
    setTimeLeft(selectedDuration * 60)
    setIsCompleted(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">🌸 MindBloom</h1>
          <p className="text-purple-600 text-lg">Begin your day with mindfulness</p>
        </div>

        {!isCompleted ? (
          <>
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-purple-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                    className="text-purple-500 transition-all duration-1000 ease-in-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-700">{formatTime(timeLeft)}</span>
                </div>
              </div>

              {!isActive && timeLeft === selectedDuration * 60 && (
                <div className="mb-6">
                  <p className="text-sm text-purple-600 mb-4">Choose your meditation duration:</p>
                  <div className="flex gap-2 justify-center">
                    {[5, 10, 15].map((duration) => (
                      <Button
                        key={duration}
                        variant={selectedDuration === duration ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedDuration(duration)
                          setTimeLeft(duration * 60)
                        }}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        {duration}m
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-center">
              {!isActive ? (
                <Button onClick={startMeditation} className="bg-purple-500 hover:bg-purple-600 text-white px-8">
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              ) : (
                <Button
                  onClick={pauseMeditation}
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}

              <Button
                onClick={resetMeditation}
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {isActive && (
              <div className="mt-6 text-center">
                <p className="text-purple-600 text-sm animate-pulse">Focus on your breath... Let your mind settle...</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">🌸</div>
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Beautiful! You've completed your meditation.</h2>
            <p className="text-purple-600 mb-6">Your mind is now clear and ready for a productive day.</p>
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
            >
              Enter MindBloom 🌺
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
