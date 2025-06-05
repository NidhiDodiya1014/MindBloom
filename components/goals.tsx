"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Plus, Trophy, Award } from "lucide-react"

interface Goal {
  id: string
  text: string
  category: "health" | "study" | "personal" | "reading" | "screen"
  timeframe: "daily" | "weekly" | "monthly" | "yearly"
  completed: boolean
  progress?: number
  specific: string
  measurable: string
  achievable: string
  relevant: string
  timeBound: string
  milestones?: string[]
  completedMilestones?: number
  streak?: number
  lastCompleted?: string
  priority: "low" | "medium" | "high"
  rewards?: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
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
      specific: "Increase hemoglobin from 9.7 to 10.5 g/dL",
      measurable: "Track through monthly blood tests",
      achievable: "With proper diet and supplements",
      relevant: "Essential for energy and health",
      timeBound: "Within 2 months",
      milestones: [
        "Week 1: Add iron-rich foods daily",
        "Week 2: Include vitamin C",
        "Week 4: First blood test",
        "Week 8: Final test",
      ],
      completedMilestones: 1,
      streak: 5,
      priority: "high",
    },
    {
      id: "2",
      text: "Read 15 pages daily",
      category: "reading",
      timeframe: "daily",
      completed: false,
      specific: "Read 15 pages of current book",
      measurable: "Track pages read daily",
      achievable: "15-20 minutes of reading",
      relevant: "Improves knowledge and focus",
      timeBound: "Every day",
      streak: 12,
      priority: "medium",
    },
    {
      id: "3",
      text: "Complete 30 days of Surya Namaskar",
      category: "health",
      timeframe: "monthly",
      completed: false,
      progress: 20,
      specific: "Perform 12 rounds of Surya Namaskar",
      measurable: "Track daily completion",
      achievable: "15 minutes each morning",
      relevant: "Improves flexibility and strength",
      timeBound: "30 consecutive days",
      milestones: ["Day 7: First week", "Day 14: Two weeks", "Day 21: Three weeks", "Day 30: Complete challenge"],
      completedMilestones: 0,
      streak: 6,
      priority: "high",
    },
    {
      id: "4",
      text: "Reduce social media by 50%",
      category: "screen",
      timeframe: "weekly",
      completed: false,
      progress: 40,
      specific: "Reduce daily social media time from 4 hours to 2 hours",
      measurable: "Track screen time daily",
      achievable: "Use app timers and mindful breaks",
      relevant: "Improves focus and mental health",
      timeBound: "This week",
      streak: 3,
      priority: "high",
    },
    {
      id: "5",
      text: "Study 2 hours daily",
      category: "study",
      timeframe: "daily",
      completed: false,
      specific: "Focused study sessions totaling 2 hours",
      measurable: "Track study time with timer",
      achievable: "Two 1-hour sessions with breaks",
      relevant: "Essential for academic success",
      timeBound: "Every day",
      streak: 8,
      priority: "high",
    },
  ])

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "First Week Warrior",
      description: "Completed 7 days of consistent goal tracking",
      icon: "🏆",
      unlockedAt: "2025-05-20",
    },
    {
      id: "2",
      title: "Reading Enthusiast",
      description: "Read for 10 consecutive days",
      icon: "📚",
      unlockedAt: "2025-05-25",
    },
  ])

  const [newGoal, setNewGoal] = useState("")
  const [newCategory, setNewCategory] = useState<Goal["category"]>("health")
  const [newTimeframe, setNewTimeframe] = useState<Goal["timeframe"]>("daily")
  const [newPriority, setNewPriority] = useState<Goal["priority"]>("medium")
  const [activeTimeframe, setActiveTimeframe] = useState<Goal["timeframe"]>("daily")
  const [showSMARTForm, setShowSMARTForm] = useState(false)
  const [smartGoal, setSMARTGoal] = useState({
    specific: "",
    measurable: "",
    achievable: "",
    relevant: "",
    timeBound: "",
  })
  const [showAchievements, setShowAchievements] = useState(false)

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals")
    const savedAchievements = localStorage.getItem("achievements")

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements))
    }
  }, [])

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals)
    localStorage.setItem("goals", JSON.stringify(updatedGoals))
  }

  const addGoal = () => {
    if (!newGoal.trim()) return

    const newGoalItem: Goal = {
      id: Date.now().toString(),
      text: newGoal,
      category: newCategory,
      timeframe: newTimeframe,
      completed: false,
      specific: smartGoal.specific || newGoal,
      measurable: smartGoal.measurable || "Track completion daily",
      achievable: smartGoal.achievable || "With consistent effort",
      relevant: smartGoal.relevant || "Important for personal growth",
      timeBound: smartGoal.timeBound || "As scheduled",
      streak: 0,
      priority: newPriority,
      milestones: [],
    }

    const updatedGoals = [...goals, newGoalItem]
    saveGoals(updatedGoals)

    setNewGoal("")
    setSMARTGoal({
      specific: "",
      measurable: "",
      achievable: "",
      relevant: "",
      timeBound: "",
    })
    setShowSMARTForm(false)
  }

  const toggleGoal = (id: string) => {
    const today = new Date().toISOString().split("T")[0]
    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        const newCompleted = !goal.completed
        let newStreak = goal.streak || 0

        if (newCompleted) {
          // Check if this is a consecutive day
          const lastCompleted = goal.lastCompleted
          if (lastCompleted) {
            const lastDate = new Date(lastCompleted)
            const todayDate = new Date(today)
            const diffTime = todayDate.getTime() - lastDate.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

            if (diffDays === 1) {
              newStreak += 1
            } else if (diffDays > 1) {
              newStreak = 1
            }
          } else {
            newStreak = 1
          }

          // Check for achievements
          checkForAchievements(newStreak, goal.category)
        }

        return {
          ...goal,
          completed: newCompleted,
          streak: newStreak,
          lastCompleted: newCompleted ? today : goal.lastCompleted,
        }
      }
      return goal
    })
    saveGoals(updatedGoals)
  }

  const updateProgress = (id: string, progress: number) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        const newProgress = Math.max(0, Math.min(100, progress))

        // Update milestones completion
        if (goal.milestones && goal.milestones.length > 0) {
          const completedMilestones = Math.floor((newProgress / 100) * goal.milestones.length)
          return { ...goal, progress: newProgress, completedMilestones }
        }

        return { ...goal, progress: newProgress }
      }
      return goal
    })
    saveGoals(updatedGoals)
  }

  const checkForAchievements = (streak: number, category: string) => {
    const newAchievements: Achievement[] = []

    if (streak === 7) {
      newAchievements.push({
        id: Date.now().toString(),
        title: "Week Warrior",
        description: "Completed 7 days streak!",
        icon: "🔥",
        unlockedAt: new Date().toISOString().split("T")[0],
      })
    }

    if (streak === 30) {
      newAchievements.push({
        id: (Date.now() + 1).toString(),
        title: "Monthly Master",
        description: "Incredible 30-day streak!",
        icon: "👑",
        unlockedAt: new Date().toISOString().split("T")[0],
      })
    }

    if (category === "reading" && streak === 10) {
      newAchievements.push({
        id: (Date.now() + 2).toString(),
        title: "Bookworm",
        description: "10 days of consistent reading!",
        icon: "📖",
        unlockedAt: new Date().toISOString().split("T")[0],
      })
    }

    if (newAchievements.length > 0) {
      const updatedAchievements = [...achievements, ...newAchievements]
      setAchievements(updatedAchievements)
      localStorage.setItem("achievements", JSON.stringify(updatedAchievements))

      // Show achievement notification
      newAchievements.forEach((achievement) => {
        setTimeout(() => {
          alert(`🎉 Achievement Unlocked: ${achievement.title} - ${achievement.description}`)
        }, 500)
      })
    }
  }

  const deleteGoal = (id: string) => {
    if (confirm("Are you sure you want to delete this goal?")) {
      const updatedGoals = goals.filter((goal) => goal.id !== id)
      saveGoals(updatedGoals)
    }
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

  const getPriorityColor = (priority: Goal["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-700 bg-red-100"
      case "medium":
        return "text-yellow-700 bg-yellow-100"
      case "low":
        return "text-green-700 bg-green-100"
    }
  }

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return "👑"
    if (streak >= 14) return "🔥"
    if (streak >= 7) return "⚡"
    if (streak >= 3) return "💪"
    return "🌱"
  }

  const totalGoalsCompleted = goals.filter((g) => g.completed).length
  const totalGoals = goals.length

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">🎯 Goals Center</h1>
        <p className="text-purple-600">Set, track, and achieve your SMART goals</p>
      </div>

      {/* Achievement Banner */}
      <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Trophy className="w-6 h-6 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-medium text-yellow-800">Your Progress</h3>
                <p className="text-sm text-yellow-700">
                  {totalGoalsCompleted} of {totalGoals} goals completed • {achievements.length} achievements unlocked
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAchievements(!showAchievements)}
              className="border-yellow-300 text-yellow-700"
            >
              <Award className="w-4 h-4 mr-1" />
              View Achievements
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Modal */}
      {showAchievements && (
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-purple-800">
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Your Achievements
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAchievements(false)}>
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="p-4 bg-white rounded-lg border border-purple-200">
                  <div className="text-center">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h3 className="font-medium text-purple-800">{achievement.title}</h3>
                    <p className="text-sm text-purple-600 mb-2">{achievement.description}</p>
                    <p className="text-xs text-gray-500">Unlocked: {achievement.unlockedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goals List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-800">Your Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-6 flex-wrap">
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
                    <Card
                      key={goal.id}
                      className={`border-l-4 ${
                        goal.priority === "high"
                          ? "border-l-red-400"
                          : goal.priority === "medium"
                            ? "border-l-yellow-400"
                            : "border-l-green-400"
                      }`}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start flex-1">
                            <div className="mt-1 cursor-pointer mr-3" onClick={() => toggleGoal(goal.id)}>
                              {goal.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-purple-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={`font-medium ${
                                    goal.completed ? "text-green-700 line-through" : "text-purple-800"
                                  }`}
                                >
                                  {goal.text}
                                </span>
                                <div className="flex gap-2">
                                  <Badge className={getCategoryColor(goal.category)}>{goal.category}</Badge>
                                  <Badge className={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
                                </div>
                              </div>

                              {/* SMART Goal Details */}
                              <div className="text-xs text-gray-600 mb-2">
                                <strong>Specific:</strong> {goal.specific}
                              </div>

                              {/* Streak Display */}
                              {goal.streak && goal.streak > 0 && (
                                <div className="flex items-center mb-2">
                                  <span className="text-lg mr-1">{getStreakIcon(goal.streak)}</span>
                                  <span className="text-sm font-medium text-orange-600">{goal.streak} day streak!</span>
                                </div>
                              )}

                              {/* Progress Bar */}
                              {goal.progress !== undefined && (
                                <div className="mb-3">
                                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Progress</span>
                                    <span>{goal.progress}%</span>
                                  </div>
                                  <Progress value={goal.progress} className="h-2 mb-2" />

                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-xs h-7 px-2"
                                      onClick={() => updateProgress(goal.id, (goal.progress || 0) - 10)}
                                    >
                                      -10%
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-xs h-7 px-2"
                                      onClick={() => updateProgress(goal.id, (goal.progress || 0) + 10)}
                                    >
                                      +10%
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Milestones */}
                              {goal.milestones && goal.milestones.length > 0 && (
                                <div className="mb-3">
                                  <h4 className="text-xs font-medium text-purple-700 mb-2">Milestones:</h4>
                                  <div className="space-y-1">
                                    {goal.milestones.map((milestone, index) => (
                                      <div
                                        key={index}
                                        className={`text-xs flex items-center ${
                                          index < (goal.completedMilestones || 0) ? "text-green-600" : "text-gray-500"
                                        }`}
                                      >
                                        {index < (goal.completedMilestones || 0) ? (
                                          <CheckCircle className="w-3 h-3 mr-1" />
                                        ) : (
                                          <Circle className="w-3 h-3 mr-1" />
                                        )}
                                        {milestone}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteGoal(goal.id)}
                            className="text-red-500 hover:text-red-700 p-1 h-auto ml-2"
                          >
                            ✕
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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
                Add SMART Goal
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

                <div>
                  <label className="text-sm font-medium text-purple-700 mb-2 block">Priority</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={newPriority === "high" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewPriority("high")}
                      className={newPriority === "high" ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      High
                    </Button>
                    <Button
                      type="button"
                      variant={newPriority === "medium" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewPriority("medium")}
                      className={newPriority === "medium" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                    >
                      Medium
                    </Button>
                    <Button
                      type="button"
                      variant={newPriority === "low" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewPriority("low")}
                      className={newPriority === "low" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      Low
                    </Button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowSMARTForm(!showSMARTForm)}
                  className="w-full border-purple-300 text-purple-600"
                >
                  {showSMARTForm ? "Hide" : "Show"} SMART Details
                </Button>

                {showSMARTForm && (
                  <div className="space-y-3 p-3 bg-purple-50 rounded border border-purple-200">
                    <div>
                      <label className="text-xs font-medium text-purple-700 mb-1 block">Specific</label>
                      <Input
                        placeholder="What exactly will you accomplish?"
                        value={smartGoal.specific}
                        onChange={(e) => setSMARTGoal({ ...smartGoal, specific: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-purple-700 mb-1 block">Measurable</label>
                      <Input
                        placeholder="How will you measure progress?"
                        value={smartGoal.measurable}
                        onChange={(e) => setSMARTGoal({ ...smartGoal, measurable: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-purple-700 mb-1 block">Achievable</label>
                      <Input
                        placeholder="How is this goal attainable?"
                        value={smartGoal.achievable}
                        onChange={(e) => setSMARTGoal({ ...smartGoal, achievable: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-purple-700 mb-1 block">Relevant</label>
                      <Input
                        placeholder="Why is this goal important?"
                        value={smartGoal.relevant}
                        onChange={(e) => setSMARTGoal({ ...smartGoal, relevant: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-purple-700 mb-1 block">Time-bound</label>
                      <Input
                        placeholder="When will you complete this?"
                        value={smartGoal.timeBound}
                        onChange={(e) => setSMARTGoal({ ...smartGoal, timeBound: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                  </div>
                )}

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

          {/* Goal Progress Summary */}
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

          {/* Motivational Card */}
          <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🌟</div>
                <h3 className="font-medium text-green-800 mb-2">Keep Going!</h3>
                <p className="text-sm text-green-700">
                  Every small step counts. You're building the life you want, one goal at a time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
