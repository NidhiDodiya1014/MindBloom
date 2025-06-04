"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coffee, Music, Pencil, Footprints, Flower, Timer, Play } from "lucide-react"

interface BreakActivity {
  id: string
  title: string
  description: string
  duration: number
  category: "creative" | "physical" | "mindful" | "nature"
  icon: React.ReactNode
}

export function Breaks() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [timerActive, setTimerActive] = useState(false)
  const [timerDuration, setTimerDuration] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)

  const breakActivities: BreakActivity[] = [
    {
      id: "1",
      title: "Mindful Breathing",
      description: "Take 5 minutes to focus on your breath. Inhale for 4 counts, hold for 4, exhale for 6.",
      duration: 5,
      category: "mindful",
      icon: <Coffee className="w-5 h-5" />,
    },
    {
      id: "2",
      title: "Nature Walk",
      description: "Step outside for a 15-minute walk. Notice the colors, sounds, and sensations around you.",
      duration: 15,
      category: "nature",
      icon: <Footprints className="w-5 h-5" />,
    },
    {
      id: "3",
      title: "Stretching Session",
      description: "Stretch your body for 10 minutes to release tension from sitting.",
      duration: 10,
      category: "physical",
      icon: <Flower className="w-5 h-5" />,
    },
    {
      id: "4",
      title: "Doodle Break",
      description: "Grab a paper and pen. Doodle freely for 10 minutes without judgment.",
      duration: 10,
      category: "creative",
      icon: <Pencil className="w-5 h-5" />,
    },
    {
      id: "5",
      title: "Music Meditation",
      description: "Listen to a calming song with your eyes closed, focusing only on the sounds.",
      duration: 5,
      category: "mindful",
      icon: <Music className="w-5 h-5" />,
    },
    {
      id: "6",
      title: "Find Something Purple",
      description: "Go on a mini scavenger hunt to find 3 purple things in your environment.",
      duration: 10,
      category: "nature",
      icon: <Flower className="w-5 h-5" />,
    },
    {
      id: "7",
      title: "One-Sentence Poem",
      description: "Write a single-sentence poem about how you're feeling right now.",
      duration: 5,
      category: "creative",
      icon: <Pencil className="w-5 h-5" />,
    },
    {
      id: "8",
      title: "Quick Yoga Flow",
      description: "Do a short yoga sequence: mountain pose, forward fold, plank, child's pose.",
      duration: 10,
      category: "physical",
      icon: <Flower className="w-5 h-5" />,
    },
  ]

  const startTimer = (duration: number) => {
    setTimerDuration(duration)
    setTimeLeft(duration * 60)
    setTimerActive(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const filteredActivities = activeCategory
    ? breakActivities.filter((activity) => activity.category === activeCategory)
    : breakActivities

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "creative":
        return "text-yellow-700 bg-yellow-100"
      case "physical":
        return "text-blue-700 bg-blue-100"
      case "mindful":
        return "text-purple-700 bg-purple-100"
      case "nature":
        return "text-green-700 bg-green-100"
      default:
        return "text-gray-700 bg-gray-100"
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">☕ Mindful Breaks</h1>
        <p className="text-purple-600">Refresh your mind with intentional break activities</p>
      </div>

      {timerActive ? (
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-800 mb-4">{formatTime(timeLeft)}</div>
              <p className="text-purple-600 mb-6">Take this time to refresh your mind and body</p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setTimerActive(false)}
                  className="border-purple-300 text-purple-600"
                >
                  End Break
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="mb-8">
          <div className="flex space-x-2 mb-6 justify-center">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
              className={activeCategory === null ? "bg-purple-500 hover:bg-purple-600" : ""}
            >
              All
            </Button>
            <Button
              variant={activeCategory === "mindful" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("mindful")}
              className={activeCategory === "mindful" ? "bg-purple-500 hover:bg-purple-600" : ""}
            >
              Mindful
            </Button>
            <Button
              variant={activeCategory === "physical" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("physical")}
              className={activeCategory === "physical" ? "bg-purple-500 hover:bg-purple-600" : ""}
            >
              Physical
            </Button>
            <Button
              variant={activeCategory === "creative" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("creative")}
              className={activeCategory === "creative" ? "bg-purple-500 hover:bg-purple-600" : ""}
            >
              Creative
            </Button>
            <Button
              variant={activeCategory === "nature" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("nature")}
              className={activeCategory === "nature" ? "bg-purple-500 hover:bg-purple-600" : ""}
            >
              Nature
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <Card
            key={activity.id}
            className="overflow-hidden border-t-4"
            style={{
              borderTopColor:
                activity.category === "creative"
                  ? "#EAB308"
                  : activity.category === "physical"
                    ? "#3B82F6"
                    : activity.category === "mindful"
                      ? "#8B5CF6"
                      : "#22C55E",
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-purple-800">
                {activity.icon}
                <span className="ml-2">{activity.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm">{activity.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Timer className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">{activity.duration} minutes</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => startTimer(activity.duration)}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Why Take Mindful Breaks?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/60 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Restore Focus</h3>
              <p className="text-sm text-green-700">
                Short breaks help reset your attention span and prevent mental fatigue during long study sessions.
              </p>
            </div>
            <div className="p-4 bg-white/60 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Physical Health</h3>
              <p className="text-sm text-blue-700">
                Moving your body during breaks improves circulation, reduces eye strain, and prevents stiffness.
              </p>
            </div>
            <div className="p-4 bg-white/60 rounded-lg">
              <h3 className="font-medium text-purple-800 mb-2">Mental Clarity</h3>
              <p className="text-sm text-purple-700">
                Mindful breaks reduce stress, improve creativity, and help you return to work with fresh perspectives.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
