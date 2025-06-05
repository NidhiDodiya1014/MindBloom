"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { CheckCircle, Circle, Droplets, Book, Target, Heart, Plus, Trash2 } from "lucide-react"

interface DashboardProps {
  darkMode: boolean
  onWaterGoalComplete: () => void
}

export function Dashboard({ darkMode, onWaterGoalComplete }: DashboardProps) {
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
  const [newTask, setNewTask] = useState("")
  const [hasShownWaterCelebration, setHasShownWaterCelebration] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 17) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

    // Load saved data
    const savedTasks = localStorage.getItem("dailyTasks")
    const savedWater = localStorage.getItem("waterIntake")
    const savedWaterCelebration = localStorage.getItem("hasShownWaterCelebration")

    if (savedTasks) setDailyTasks(JSON.parse(savedTasks))
    if (savedWater) setWaterIntake(Number.parseInt(savedWater))
    if (savedWaterCelebration) setHasShownWaterCelebration(JSON.parse(savedWaterCelebration))

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

  useEffect(() => {
    // Check if water goal is complete and celebration hasn't been shown today
    if (waterIntake >= 2500 && !hasShownWaterCelebration) {
      onWaterGoalComplete()
      setHasShownWaterCelebration(true)
      localStorage.setItem("hasShownWaterCelebration", "true")
    }
  }, [waterIntake, hasShownWaterCelebration, onWaterGoalComplete])

  const toggleTask = (id: number) => {
    const updatedTasks = dailyTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    setDailyTasks(updatedTasks)
    localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks))
  }

  const addTask = () => {
    if (!newTask.trim()) return

    const newTaskItem = {
      id: Date.now(),
      text: newTask,
      completed: false,
      category: "personal",
    }

    const updatedTasks = [...dailyTasks, newTaskItem]
    setDailyTasks(updatedTasks)
    localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks))
    setNewTask("")
  }

  const deleteTask = (id: number) => {
    const updatedTasks = dailyTasks.filter((task) => task.id !== id)
    setDailyTasks(updatedTasks)
    localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks))
  }

  const addWater = () => {
    const newWaterIntake = waterIntake + 250
    setWaterIntake(newWaterIntake)
    localStorage.setItem("waterIntake", newWaterIntake.toString())
  }

  const completedTasks = dailyTasks.filter((task) => task.completed).length
  const progressPercentage = dailyTasks.length > 0 ? (completedTasks / dailyTasks.length) * 100 : 0

  const cardClass = darkMode ? "bg-[#161B22] border-[#30363D]" : "bg-white border-gray-200"

  const textClass = darkMode ? "text-[#C9D1D9]" : "text-purple-800"
  const subtextClass = darkMode ? "text-[#8B949E]" : "text-purple-600"

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${textClass}`}>{greeting}, Nidhi 🌸</h1>
        <p className={`text-lg ${subtextClass}`}>Welcome to your mindful day</p>
      </div>

      {/* Daily Progress */}
      <Card
        className={`mb-8 ${
          darkMode
            ? "bg-gradient-to-r from-[#161B22] to-[#2E294E] border-[#58A6FF]"
            : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
        }`}
      >
        <CardHeader>
          <CardTitle className={`flex items-center ${textClass}`}>
            <Target className="w-5 h-5 mr-2" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className={`flex justify-between text-sm mb-2 ${subtextClass}`}>
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
            <p className={subtextClass}>
              {progressPercentage === 100
                ? "Amazing! You've completed all your goals!"
                : "Keep going! You're doing great!"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Daily Tasks */}
        <Card className={`lg:col-span-2 ${cardClass}`}>
          <CardHeader>
            <CardTitle className={textClass}>Today's Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add Task Input */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                className={darkMode ? "bg-[#0D1117] border-[#30363D] text-[#C9D1D9]" : ""}
              />
              <Button
                onClick={addTask}
                className={
                  darkMode ? "bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117]" : "bg-purple-500 hover:bg-purple-600"
                }
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${
                    task.completed
                      ? darkMode
                        ? "bg-[#0D1117] border-[#238636]"
                        : "bg-green-50 border-green-200"
                      : darkMode
                        ? "bg-[#0D1117] border-[#30363D] hover:border-[#58A6FF]"
                        : "bg-white border-purple-100 hover:border-purple-200"
                  }`}
                >
                  <div className="cursor-pointer" onClick={() => toggleTask(task.id)}>
                    {task.completed ? (
                      <CheckCircle
                        className={darkMode ? "w-5 h-5 text-[#238636] mr-3" : "w-5 h-5 text-green-500 mr-3"}
                      />
                    ) : (
                      <Circle className={darkMode ? "w-5 h-5 text-[#8B949E] mr-3" : "w-5 h-5 text-purple-400 mr-3"} />
                    )}
                  </div>
                  <span
                    className={`flex-1 ${
                      task.completed
                        ? darkMode
                          ? "text-[#238636] line-through"
                          : "text-green-700 line-through"
                        : darkMode
                          ? "text-[#C9D1D9]"
                          : "text-purple-700"
                    }`}
                  >
                    {task.text}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full mr-2 ${
                      task.category === "exercise"
                        ? darkMode
                          ? "bg-[#0D1117] text-[#58A6FF]"
                          : "bg-blue-100 text-blue-700"
                        : task.category === "reading"
                          ? darkMode
                            ? "bg-[#0D1117] text-[#F778BA]"
                            : "bg-yellow-100 text-yellow-700"
                          : task.category === "study"
                            ? darkMode
                              ? "bg-[#0D1117] text-[#80CBC4]"
                              : "bg-purple-100 text-purple-700"
                            : task.category === "health"
                              ? darkMode
                                ? "bg-[#0D1117] text-[#238636]"
                                : "bg-green-100 text-green-700"
                              : darkMode
                                ? "bg-[#0D1117] text-[#FFAB91]"
                                : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {task.category}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className={`p-1 h-auto ${
                      darkMode ? "text-[#F85149] hover:bg-[#0D1117]" : "text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Water Intake */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className={`flex items-center ${darkMode ? "text-[#58A6FF]" : "text-blue-700"}`}>
                <Droplets className="w-5 h-5 mr-2" />
                Water Intake
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${darkMode ? "text-[#58A6FF]" : "text-blue-600"}`}>
                  {waterIntake}ml
                </div>
                <div className={`text-sm mb-4 ${darkMode ? "text-[#8B949E]" : "text-blue-600"}`}>Goal: 2500ml</div>
                <Progress value={(waterIntake / 2500) * 100} className="mb-4" />
                <Button
                  onClick={addWater}
                  size="sm"
                  className={
                    darkMode
                      ? "bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117]"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }
                >
                  +250ml
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reading Progress */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className={`flex items-center ${darkMode ? "text-[#F778BA]" : "text-yellow-700"}`}>
                <Book className="w-5 h-5 mr-2" />
                Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-sm mb-2 ${darkMode ? "text-[#8B949E]" : "text-yellow-600"}`}>Current Book</div>
                <div className={`font-medium mb-4 ${darkMode ? "text-[#C9D1D9]" : "text-yellow-800"}`}>
                  "Atomic Habits"
                </div>
                <div className={`text-xs ${darkMode ? "text-[#8B949E]" : "text-yellow-600"}`}>
                  Pages read today: 0/15
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Focus */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className={`flex items-center ${darkMode ? "text-[#F85149]" : "text-red-700"}`}>
                <Heart className="w-5 h-5 mr-2" />
                Iron Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-sm mb-2 ${darkMode ? "text-[#8B949E]" : "text-red-600"}`}>
                  Hemoglobin: 9.7 g/dL
                </div>
                <div className={`text-xs mb-4 ${darkMode ? "text-[#8B949E]" : "text-red-600"}`}>Target: 12+ g/dL</div>
                <div className={`text-xs ${darkMode ? "text-[#C9D1D9]" : "text-red-800"}`}>
                  Today's iron-rich foods:
                  <br />✓ Spinach, dates, nuts
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Daily Thought */}
      <Card
        className={`${
          darkMode
            ? "bg-gradient-to-r from-[#161B22] to-[#2E294E] border-[#FFAB91]"
            : "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
        }`}
      >
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl mb-4">💭</div>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-[#FFAB91]" : "text-yellow-800"}`}>
              Today's Thought
            </h3>
            <p className={`italic ${darkMode ? "text-[#C9D1D9]" : "text-yellow-700"}`}>"{dailyThought}"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
