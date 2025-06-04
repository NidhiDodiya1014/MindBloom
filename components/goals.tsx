"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Target, CheckCircle, Circle, Plus, Calendar, Star } from "lucide-react"

interface Goal {
  id: string
  text: string
  category: "health" | "study" | "personal" | "reading" | "screen"
  timeframe: "daily" | "weekly" | "monthly" | "yearly"
  completed: boolean
  progress?: number
}

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      text: "Increase hemoglobin to 10.5",
      category: "health",
      timeframe: "monthly",
      completed: false,
      progress: 30,
    },
    {
      id: "2",
      text: "Read 15 pages daily",
      category: "reading",
      timeframe: "daily",
      completed: false,
    },
    {
      id: "3",
      text: "Complete 30 days of Surya Namaskar",
      category: "health",
      timeframe: "monthly",
      completed: false,
      progress: 20,
    },
    {
      id: "4",
      text: "Reduce social media by 50%",
      category: "screen",
      timeframe: "weekly",
      completed: false,
      progress: 40,
    },
    {
      id: "5",
      text: "Study 2 hours daily",
      category: "study",
      timeframe: "daily",
      completed: false,
    },
  ])
  const [newGoal, setNewGoal] = useState("")
  const [newCategory, setNewCategory] = useState<Goal["category"]>("health")
  const [newTimeframe, setNewTimeframe] = useState<Goal["timeframe"]>("daily")
  const [activeTimeframe, setActiveTimeframe] = useState<Goal["timeframe"]>("daily")

  useEffect(() => {
    // Load saved goals
    const savedGoals = localStorage.getItem("goals")
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  const addGoal = () => {
    if (!newGoal.trim()) return

    const newGoalItem: Goal = {
      id: Date.now().toString(),
      text: newGoal,
      category: newCategory,
      timeframe: newTimeframe,
      completed: false,
    }

    const updatedGoals = [...goals, newGoalItem]
    setGoals(updatedGoals)
    localStorage.setItem("goals", JSON.stringify(updatedGoals))
    setNewGoal("")
  }

  const toggleGoal = (id: string) => {
    const updatedGoals = goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal))
    setGoals(updatedGoals)
    localStorage.setItem("goals", JSON.stringify(updatedGoals))
  }

  const updateProgress = (id: string, progress: number) => {
    const updatedGoals = goals.map((goal) => (goal.id === id ? { ...goal, progress } : goal))
    setGoals(updatedGoals)
    localStorage.setItem("goals", JSON.stringify(updatedGoals))
  }

  const filteredGoals = goals.filter((goal) => goal.timeframe === activeTimeframe)

  const getCategoryColor = (category: Goal["category"]) => {
    switch (category) {
      case "health":
        return "text-green-700 bg-green-100"
      case "study":
        return "text-blue-700 bg-blue-100"
      case "personal":
        return "text-purple-700 bg-purple-100"
      case "reading":
        return "text-yellow-700 bg-yellow-100"
      case "screen":
        return "text-red-700 bg-red-100"
    }
  }

  const getTimeframeIcon = (timeframe: Goal["timeframe"]) => {
    switch (timeframe) {
      case "daily":
        return <Circle className="w-4 h-4" />
      case "weekly":
        return <Calendar className="w-4 h-4" />
      case "monthly":
        return <Target className="w-4 h-4" />
      case "yearly":
        return <Star className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">🎯 Goals Center</h1>
        <p className="text-purple-600">Set, track, and achieve your goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goals List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-800">Your Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-6">
                <Button
                  variant={activeTimeframe === "daily" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTimeframe("daily")}
                  className={activeTimeframe === "daily" ? "bg-purple-500 hover:bg-purple-600" : ""}
                >
                  Daily
                </Button>
                <Button
                  variant={activeTimeframe === "weekly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTimeframe("weekly")}
                  className={activeTimeframe === "weekly" ? "bg-purple-500 hover:bg-purple-600" : ""}
                >
                  Weekly
                </Button>
                <Button
                  variant={activeTimeframe === "monthly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTimeframe("monthly")}
                  className={activeTimeframe === "monthly" ? "bg-purple-500 hover:bg-purple-600" : ""}
                >
                  Monthly
                </Button>
                <Button
                  variant={activeTimeframe === "yearly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTimeframe("yearly")}
                  className={activeTimeframe === "yearly" ? "bg-purple-500 hover:bg-purple-600" : ""}
                >
                  Yearly
                </Button>
              </div>

              <div className="space-y-4">
                {filteredGoals.length > 0 ? (
                  filteredGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`p-4 rounded-lg border ${
                        goal.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="mt-1 cursor-pointer" onClick={() => toggleGoal(goal.id)}>
                          {goal.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-purple-400" />
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-medium ${
                                goal.completed ? "text-green-700 line-through" : "text-purple-800"
                              }`}
                            >
                              {goal.text}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(goal.category)}`}>
                              {goal.category}
                            </span>
                          </div>

                          {goal.progress !== undefined && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{goal.progress}%</span>
                              </div>
                              <Progress value={goal.progress} className="h-2" />

                              <div className="flex gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs h-7 px-2"
                                  onClick={() => updateProgress(goal.id, Math.max(0, (goal.progress || 0) - 10))}
                                >
                                  -10%
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs h-7 px-2"
                                  onClick={() => updateProgress(goal.id, Math.min(100, (goal.progress || 0) + 10))}
                                >
                                  +10%
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎯</div>
                    <p className="text-purple-600 mb-4">No {activeTimeframe} goals yet.</p>
                    <p className="text-gray-500">Add a new goal to get started!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Goal */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Plus className="w-5 h-5 mr-2" />
                Add New Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-700 mb-2 block">
                    What would you like to achieve?
                  </label>
                  <Input
                    placeholder="Enter your goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-700 mb-2 block">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={newCategory === "health" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewCategory("health")}
                      className={newCategory === "health" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      Health
                    </Button>
                    <Button
                      type="button"
                      variant={newCategory === "study" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewCategory("study")}
                      className={newCategory === "study" ? "bg-blue-500 hover:bg-blue-600" : ""}
                    >
                      Study
                    </Button>
                    <Button
                      type="button"
                      variant={newCategory === "personal" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewCategory("personal")}
                      className={newCategory === "personal" ? "bg-purple-500 hover:bg-purple-600" : ""}
                    >
                      Personal
                    </Button>
                    <Button
                      type="button"
                      variant={newCategory === "reading" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewCategory("reading")}
                      className={newCategory === "reading" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                    >
                      Reading
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-700 mb-2 block">Timeframe</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={newTimeframe === "daily" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewTimeframe("daily")}
                      className={newTimeframe === "daily" ? "bg-purple-500 hover:bg-purple-600" : ""}
                    >
                      Daily
                    </Button>
                    <Button
                      type="button"
                      variant={newTimeframe === "weekly" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewTimeframe("weekly")}
                      className={newTimeframe === "weekly" ? "bg-purple-500 hover:bg-purple-600" : ""}
                    >
                      Weekly
                    </Button>
                    <Button
                      type="button"
                      variant={newTimeframe === "monthly" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewTimeframe("monthly")}
                      className={newTimeframe === "monthly" ? "bg-purple-500 hover:bg-purple-600" : ""}
                    >
                      Monthly
                    </Button>
                    <Button
                      type="button"
                      variant={newTimeframe === "yearly" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewTimeframe("yearly")}
                      className={newTimeframe === "yearly" ? "bg-purple-500 hover:bg-purple-600" : ""}
                    >
                      Yearly
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={addGoal}
                  disabled={!newGoal.trim()}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  Add Goal
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-purple-800">Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-purple-700 mb-1">
                    <span>Daily Goals</span>
                    <span>
                      {goals.filter((g) => g.timeframe === "daily" && g.completed).length}/
                      {goals.filter((g) => g.timeframe === "daily").length}
                    </span>
                  </div>
                  <Progress
                    value={
                      (goals.filter((g) => g.timeframe === "daily" && g.completed).length /
                        Math.max(1, goals.filter((g) => g.timeframe === "daily").length)) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm text-purple-700 mb-1">
                    <span>Weekly Goals</span>
                    <span>
                      {goals.filter((g) => g.timeframe === "weekly" && g.completed).length}/
                      {goals.filter((g) => g.timeframe === "weekly").length}
                    </span>
                  </div>
                  <Progress
                    value={
                      (goals.filter((g) => g.timeframe === "weekly" && g.completed).length /
                        Math.max(1, goals.filter((g) => g.timeframe === "weekly").length)) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm text-purple-700 mb-1">
                    <span>Monthly Goals</span>
                    <span>
                      {goals.filter((g) => g.timeframe === "monthly" && g.completed).length}/
                      {goals.filter((g) => g.timeframe === "monthly").length}
                    </span>
                  </div>
                  <Progress
                    value={
                      (goals.filter((g) => g.timeframe === "monthly" && g.completed).length /
                        Math.max(1, goals.filter((g) => g.timeframe === "monthly").length)) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
