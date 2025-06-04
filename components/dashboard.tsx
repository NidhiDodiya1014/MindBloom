"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Droplets, Book, Target, Heart } from "lucide-react"

export function Dashboard() {
  const [greeting, setGreeting] = useState("")
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, text: "Morning Surya Namaskar", completed: false, category: "exercise" },
    { id: 2, text: "Read 15 pages", completed: false, category: "reading" },
    { id: 3, text: "Study session - 2 hours", completed: false, category: "study" },
    { id: 4, text: "Nature walk", completed: false, category: "exercise" },
    { id: 5, text: "Journal writing", completed: false, category: "personal" },
    { id: 6, text: "Iron-rich meal", completed: false, category: "health" },
  ])
  const [waterIntake, setWaterIntake] = useState(0)
  const [dailyThought, setDailyThought] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 17) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

    // Load saved data
    const savedTasks = localStorage.getItem("dailyTasks")
    const savedWater = localStorage.getItem("waterIntake")

    if (savedTasks) setDailyTasks(JSON.parse(savedTasks))
    if (savedWater) setWaterIntake(Number.parseInt(savedWater))

    // Set daily thought
    const thoughts = [
      "Every small step forward is progress worth celebrating.",
      "Your health is your wealth. Nourish your body with love.",
      "Reading opens doors to infinite possibilities.",
      "Consistency in small things leads to extraordinary results.",
      "Take time to breathe. You are exactly where you need to be.",
      "Your iron levels are improving with every healthy choice you make.",
    ]
    setDailyThought(thoughts[Math.floor(Math.random() * thoughts.length)])
  }, [])

  const toggleTask = (id: number) => {
    const updatedTasks = dailyTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    setDailyTasks(updatedTasks)
    localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks))
  }

  const addWater = () => {
    const newWaterIntake = waterIntake + 250
    setWaterIntake(newWaterIntake)
    localStorage.setItem("waterIntake", newWaterIntake.toString())
  }

  const completedTasks = dailyTasks.filter((task) => task.completed).length
  const progressPercentage = (completedTasks / dailyTasks.length) * 100

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">{greeting}, Nidhi 🌸</h1>
        <p className="text-purple-600 text-lg">Welcome to your mindful day</p>
      </div>

      {/* Daily Progress */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Target className="w-5 h-5 mr-2" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-purple-600 mb-2">
              <span>Daily Goals</span>
              <span>
                {completedTasks}/{dailyTasks.length} completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">
              {progressPercentage === 100 ? "🌺" : progressPercentage > 50 ? "🌸" : "🌱"}
            </div>
            <p className="text-purple-600">
              {progressPercentage === 100
                ? "Amazing! You've completed all your goals!"
                : "Keep going! You're doing great!"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Daily Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-purple-800">Today's Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                    task.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-purple-100 hover:border-purple-200"
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  ) : (
                    <Circle className="w-5 h-5 text-purple-400 mr-3" />
                  )}
                  <span className={`flex-1 ${task.completed ? "text-green-700 line-through" : "text-purple-700"}`}>
                    {task.text}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.category === "exercise"
                        ? "bg-blue-100 text-blue-700"
                        : task.category === "reading"
                          ? "bg-yellow-100 text-yellow-700"
                          : task.category === "study"
                            ? "bg-purple-100 text-purple-700"
                            : task.category === "health"
                              ? "bg-green-100 text-green-700"
                              : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {task.category}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Water Intake */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Droplets className="w-5 h-5 mr-2" />
                Water Intake
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{waterIntake}ml</div>
                <div className="text-sm text-blue-600 mb-4">Goal: 2500ml</div>
                <Progress value={(waterIntake / 2500) * 100} className="mb-4" />
                <Button onClick={addWater} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  +250ml
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reading Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-700">
                <Book className="w-5 h-5 mr-2" />
                Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-sm text-yellow-600 mb-2">Current Book</div>
                <div className="font-medium text-yellow-800 mb-4">"Atomic Habits"</div>
                <div className="text-xs text-yellow-600">Pages read today: 0/15</div>
              </div>
            </CardContent>
          </Card>

          {/* Health Focus */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <Heart className="w-5 h-5 mr-2" />
                Iron Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-sm text-red-600 mb-2">Hemoglobin: 9.7 g/dL</div>
                <div className="text-xs text-red-600 mb-4">Target: 12+ g/dL</div>
                <div className="text-xs text-red-800">
                  Today's iron-rich foods:
                  <br />✓ Spinach, dates, nuts
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Daily Thought */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl mb-4">💭</div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Today's Thought</h3>
            <p className="text-yellow-700 italic">"{dailyThought}"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
