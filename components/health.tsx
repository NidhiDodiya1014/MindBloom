"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Heart, Droplets, Apple, Activity, Plus, Minus, Target, TrendingUp, Play, Video, Trash2 } from "lucide-react"

interface HealthProps {
  darkMode: boolean
  onWaterGoalComplete: () => void
}

interface NutritionData {
  protein: number
  iron: number
  vitamins: number
  calories: number
}

interface ExerciseSession {
  id: string
  type: string
  duration: number
  completed: boolean
  date: string
}

interface ExerciseVideo {
  id: string
  title: string
  url: string
  category: string
  duration: number
  description?: string
}

interface IndianFood {
  name: string
  protein: number
  iron: number
  vitamins: number
  calories: number
  category: string
}

export function Health({ darkMode, onWaterGoalComplete }: HealthProps) {
  const [waterIntake, setWaterIntake] = useState(0)
  const [nutrition, setNutrition] = useState<NutritionData>({
    protein: 0,
    iron: 0,
    vitamins: 0,
    calories: 0,
  })
  const [exercises, setExercises] = useState<ExerciseSession[]>([
    { id: "1", type: "Surya Namaskar", duration: 15, completed: false, date: new Date().toISOString().split("T")[0] },
    { id: "2", type: "Nature Walk", duration: 30, completed: false, date: new Date().toISOString().split("T")[0] },
    {
      id: "3",
      type: "Breathing Exercises",
      duration: 10,
      completed: false,
      date: new Date().toISOString().split("T")[0],
    },
    { id: "4", type: "Yoga Flow", duration: 20, completed: false, date: new Date().toISOString().split("T")[0] },
  ])

  const [exerciseVideos, setExerciseVideos] = useState<ExerciseVideo[]>([
    {
      id: "1",
      title: "Morning Surya Namaskar",
      url: "https://www.youtube.com/embed/73sjOgWZO7I",
      category: "Morning Routine",
      duration: 15,
      description: "Complete Surya Namaskar sequence for beginners",
    },
  ])

  const [todaysMeals, setTodaysMeals] = useState<string[]>([])
  const [newMeal, setNewMeal] = useState("")
  const [showAddVideo, setShowAddVideo] = useState(false)
  const [newVideoTitle, setNewVideoTitle] = useState("")
  const [newVideoUrl, setNewVideoUrl] = useState("")
  const [newVideoCategory, setNewVideoCategory] = useState("Morning Routine")
  const [newVideoDuration, setNewVideoDuration] = useState("")
  const [selectedVideoCategory, setSelectedVideoCategory] = useState("all")
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [hasShownWaterCelebration, setHasShownWaterCelebration] = useState(false)

  // Enhanced Indian food database
  const indianFoods: IndianFood[] = [
    { name: "roti", protein: 3, iron: 1, vitamins: 5, calories: 80, category: "grains" },
    { name: "chapati", protein: 3, iron: 1, vitamins: 5, calories: 80, category: "grains" },
    { name: "rice", protein: 2, iron: 0.5, vitamins: 2, calories: 130, category: "grains" },
    { name: "dal", protein: 8, iron: 3, vitamins: 10, calories: 120, category: "protein" },
    { name: "sabzi", protein: 2, iron: 2, vitamins: 15, calories: 60, category: "vegetables" },
    { name: "palak", protein: 3, iron: 4, vitamins: 20, calories: 25, category: "vegetables" },
    { name: "spinach", protein: 3, iron: 4, vitamins: 20, calories: 25, category: "vegetables" },
    { name: "rajma", protein: 15, iron: 5, vitamins: 8, calories: 200, category: "protein" },
    { name: "chole", protein: 12, iron: 4, vitamins: 8, calories: 180, category: "protein" },
    { name: "paneer", protein: 18, iron: 1, vitamins: 5, calories: 250, category: "protein" },
    { name: "dahi", protein: 6, iron: 0.5, vitamins: 12, calories: 80, category: "dairy" },
    { name: "yogurt", protein: 6, iron: 0.5, vitamins: 12, calories: 80, category: "dairy" },
    { name: "milk", protein: 8, iron: 0.5, vitamins: 15, calories: 100, category: "dairy" },
    { name: "aloo", protein: 2, iron: 1, vitamins: 8, calories: 90, category: "vegetables" },
    { name: "potato", protein: 2, iron: 1, vitamins: 8, calories: 90, category: "vegetables" },
    { name: "bhindi", protein: 2, iron: 1, vitamins: 12, calories: 35, category: "vegetables" },
    { name: "okra", protein: 2, iron: 1, vitamins: 12, calories: 35, category: "vegetables" },
    { name: "methi", protein: 4, iron: 4, vitamins: 18, calories: 40, category: "vegetables" },
    { name: "karela", protein: 1, iron: 1, vitamins: 15, calories: 20, category: "vegetables" },
    { name: "lauki", protein: 1, iron: 0.5, vitamins: 8, calories: 15, category: "vegetables" },
    { name: "paratha", protein: 4, iron: 1.5, vitamins: 6, calories: 150, category: "grains" },
    { name: "poha", protein: 2, iron: 2, vitamins: 8, calories: 110, category: "grains" },
    { name: "upma", protein: 3, iron: 1, vitamins: 6, calories: 120, category: "grains" },
    { name: "idli", protein: 3, iron: 1, vitamins: 5, calories: 60, category: "grains" },
    { name: "dosa", protein: 4, iron: 1.5, vitamins: 6, calories: 120, category: "grains" },
    { name: "sambar", protein: 6, iron: 3, vitamins: 12, calories: 100, category: "protein" },
    { name: "rasam", protein: 2, iron: 1, vitamins: 8, calories: 50, category: "soup" },
    { name: "khichdi", protein: 5, iron: 2, vitamins: 8, calories: 140, category: "grains" },
    { name: "biryani", protein: 8, iron: 2, vitamins: 6, calories: 300, category: "grains" },
    { name: "pulao", protein: 6, iron: 1.5, vitamins: 5, calories: 250, category: "grains" },
  ]

  useEffect(() => {
    const savedWater = localStorage.getItem("waterIntake")
    const savedMeals = localStorage.getItem("todaysMeals")
    const savedExercises = localStorage.getItem("exercises")
    const savedVideos = localStorage.getItem("exerciseVideos")
    const savedWaterCelebration = localStorage.getItem("hasShownWaterCelebration")

    if (savedWater) setWaterIntake(Number.parseInt(savedWater))
    if (savedMeals) setTodaysMeals(JSON.parse(savedMeals))
    if (savedExercises) setExercises(JSON.parse(savedExercises))
    if (savedVideos) setExerciseVideos(JSON.parse(savedVideos))
    if (savedWaterCelebration) setHasShownWaterCelebration(JSON.parse(savedWaterCelebration))
  }, [])

  useEffect(() => {
    // Check if water goal is complete and celebration hasn't been shown today
    if (waterIntake >= 2500 && !hasShownWaterCelebration) {
      onWaterGoalComplete()
      setHasShownWaterCelebration(true)
      localStorage.setItem("hasShownWaterCelebration", "true")
    }
  }, [waterIntake, hasShownWaterCelebration, onWaterGoalComplete])

  const addWater = (amount: number) => {
    const newAmount = Math.max(0, waterIntake + amount)
    setWaterIntake(newAmount)
    localStorage.setItem("waterIntake", newAmount.toString())
  }

  const addMeal = () => {
    if (!newMeal.trim()) return

    const updatedMeals = [...todaysMeals, newMeal]
    setTodaysMeals(updatedMeals)
    localStorage.setItem("todaysMeals", JSON.stringify(updatedMeals))

    const nutritionBoost = calculateNutrition(newMeal)
    setNutrition((prev) => ({
      protein: prev.protein + nutritionBoost.protein,
      iron: prev.iron + nutritionBoost.iron,
      vitamins: prev.vitamins + nutritionBoost.vitamins,
      calories: prev.calories + nutritionBoost.calories,
    }))

    setNewMeal("")
  }

  const calculateNutrition = (meal: string): NutritionData => {
    const mealLower = meal.toLowerCase()
    let protein = 0,
      iron = 0,
      vitamins = 0,
      calories = 0

    // Check against Indian food database
    indianFoods.forEach((food) => {
      if (mealLower.includes(food.name)) {
        protein += food.protein
        iron += food.iron
        vitamins += food.vitamins
        calories += food.calories
      }
    })

    // Additional generic foods
    if (mealLower.includes("chicken") || mealLower.includes("fish")) {
      protein += 25
      iron += 8
      calories += 200
    }
    if (mealLower.includes("eggs")) {
      protein += 12
      iron += 5
      calories += 120
    }
    if (mealLower.includes("nuts") || mealLower.includes("almonds")) {
      protein += 15
      iron += 5
      calories += 150
    }
    if (mealLower.includes("dates")) {
      iron += 10
      calories += 100
    }

    return { protein, iron, vitamins, calories }
  }

  const addExerciseVideo = () => {
    if (!newVideoTitle || !newVideoUrl) return

    // Convert YouTube URL to embed format
    let embedUrl = newVideoUrl
    if (newVideoUrl.includes("youtube.com/watch?v=")) {
      const videoId = newVideoUrl.split("v=")[1]?.split("&")[0]
      embedUrl = `https://www.youtube.com/embed/${videoId}`
    } else if (newVideoUrl.includes("youtu.be/")) {
      const videoId = newVideoUrl.split("youtu.be/")[1]?.split("?")[0]
      embedUrl = `https://www.youtube.com/embed/${videoId}`
    }

    const newVideo: ExerciseVideo = {
      id: Date.now().toString(),
      title: newVideoTitle,
      url: embedUrl,
      category: newVideoCategory,
      duration: Number.parseInt(newVideoDuration) || 15,
      description: "",
    }

    const updatedVideos = [...exerciseVideos, newVideo]
    setExerciseVideos(updatedVideos)
    localStorage.setItem("exerciseVideos", JSON.stringify(updatedVideos))

    setNewVideoTitle("")
    setNewVideoUrl("")
    setNewVideoDuration("")
    setShowAddVideo(false)
  }

  const deleteVideo = (videoId: string) => {
    const updatedVideos = exerciseVideos.filter((video) => video.id !== videoId)
    setExerciseVideos(updatedVideos)
    localStorage.setItem("exerciseVideos", JSON.stringify(updatedVideos))
  }

  const toggleExercise = (exerciseId: string) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === exerciseId ? { ...exercise, completed: !exercise.completed } : exercise,
    )
    setExercises(updatedExercises)
    localStorage.setItem("exercises", JSON.stringify(updatedExercises))
  }

  const filteredVideos =
    selectedVideoCategory === "all"
      ? exerciseVideos
      : exerciseVideos.filter((video) => video.category === selectedVideoCategory)

  const videoCategories = ["Morning Routine", "Yoga", "Stretching", "Cardio", "Strength", "Breathing"]

  const dailyTargets = {
    water: 2500,
    protein: 60,
    iron: 18,
    vitamins: 100,
    calories: 2000,
  }

  const cardClass = darkMode ? "bg-[#161B22] border-[#30363D]" : "bg-white border-gray-200"

  const textClass = darkMode ? "text-[#C9D1D9]" : "text-purple-800"
  const subtextClass = darkMode ? "text-[#8B949E]" : "text-purple-600"

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${textClass}`}>💚 Health & Wellness Tracker</h1>
        <p className={subtextClass}>Monitor your nutrition, hydration, and fitness journey</p>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card
          className={`${
            darkMode
              ? "bg-gradient-to-br from-[#161B22] to-[#0D1117] border-[#58A6FF]"
              : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
          }`}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? "text-[#58A6FF]" : "text-blue-600"}`}>Water Intake</p>
                <p className={`text-2xl font-bold ${darkMode ? "text-[#58A6FF]" : "text-blue-800"}`}>{waterIntake}ml</p>
                <p className={`text-xs ${darkMode ? "text-[#8B949E]" : "text-blue-600"}`}>
                  Goal: {dailyTargets.water}ml
                </p>
              </div>
              <Droplets className={`w-8 h-8 ${darkMode ? "text-[#58A6FF]" : "text-blue-500"}`} />
            </div>
            <Progress value={(waterIntake / dailyTargets.water) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gradient-to-br from-[#161B22] to-[#0D1117] border-[#F85149]"
              : "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
          }`}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? "text-[#F85149]" : "text-red-600"}`}>Iron Intake</p>
                <p className={`text-2xl font-bold ${darkMode ? "text-[#F85149]" : "text-red-800"}`}>
                  {nutrition.iron}mg
                </p>
                <p className={`text-xs ${darkMode ? "text-[#8B949E]" : "text-red-600"}`}>Goal: {dailyTargets.iron}mg</p>
              </div>
              <Heart className={`w-8 h-8 ${darkMode ? "text-[#F85149]" : "text-red-500"}`} />
            </div>
            <Progress value={(nutrition.iron / dailyTargets.iron) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gradient-to-br from-[#161B22] to-[#0D1117] border-[#238636]"
              : "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
          }`}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? "text-[#238636]" : "text-green-600"}`}>Protein</p>
                <p className={`text-2xl font-bold ${darkMode ? "text-[#238636]" : "text-green-800"}`}>
                  {nutrition.protein}g
                </p>
                <p className={`text-xs ${darkMode ? "text-[#8B949E]" : "text-green-600"}`}>
                  Goal: {dailyTargets.protein}g
                </p>
              </div>
              <Target className={`w-8 h-8 ${darkMode ? "text-[#238636]" : "text-green-500"}`} />
            </div>
            <Progress value={(nutrition.protein / dailyTargets.protein) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gradient-to-br from-[#161B22] to-[#0D1117] border-[#F778BA]"
              : "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
          }`}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? "text-[#F778BA]" : "text-purple-600"}`}>Calories</p>
                <p className={`text-2xl font-bold ${darkMode ? "text-[#F778BA]" : "text-purple-800"}`}>
                  {nutrition.calories}
                </p>
                <p className={`text-xs ${darkMode ? "text-[#8B949E]" : "text-purple-600"}`}>
                  Goal: {dailyTargets.calories}
                </p>
              </div>
              <TrendingUp className={`w-8 h-8 ${darkMode ? "text-[#F778BA]" : "text-purple-500"}`} />
            </div>
            <Progress value={(nutrition.calories / dailyTargets.calories) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Exercise Videos Section */}
      <Card className={`mb-8 ${cardClass}`}>
        <CardHeader>
          <CardTitle className={`flex items-center justify-between ${textClass}`}>
            <div className="flex items-center">
              <Video className="w-5 h-5 mr-2" />
              My Exercise Videos
            </div>
            <Button
              size="sm"
              onClick={() => setShowAddVideo(!showAddVideo)}
              className={
                darkMode ? "bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117]" : "bg-purple-500 hover:bg-purple-600"
              }
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Video
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Video Form */}
          {showAddVideo && (
            <div
              className={`mb-6 p-4 rounded-lg border ${
                darkMode ? "bg-[#0D1117] border-[#30363D]" : "bg-purple-50 border-purple-200"
              }`}
            >
              <h4 className={`font-medium mb-3 ${textClass}`}>Add Exercise Video</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Video Title"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  className={darkMode ? "bg-[#161B22] border-[#30363D] text-[#C9D1D9]" : ""}
                />
                <Input
                  placeholder="YouTube URL"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className={darkMode ? "bg-[#161B22] border-[#30363D] text-[#C9D1D9]" : ""}
                />
                <select
                  value={newVideoCategory}
                  onChange={(e) => setNewVideoCategory(e.target.value)}
                  className={`p-2 border rounded ${
                    darkMode ? "bg-[#161B22] border-[#30363D] text-[#C9D1D9]" : "border-purple-200"
                  }`}
                >
                  {videoCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Input
                  placeholder="Duration (minutes)"
                  type="number"
                  value={newVideoDuration}
                  onChange={(e) => setNewVideoDuration(e.target.value)}
                  className={darkMode ? "bg-[#161B22] border-[#30363D] text-[#C9D1D9]" : ""}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={addExerciseVideo}
                  className={
                    darkMode ? "bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117]" : "bg-purple-500 hover:bg-purple-600"
                  }
                >
                  Add Video
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddVideo(false)}
                  className={darkMode ? "border-[#30363D] text-[#C9D1D9]" : "border-purple-300 text-purple-600"}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Video Categories Filter */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <Button
              size="sm"
              variant={selectedVideoCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedVideoCategory("all")}
              className={
                selectedVideoCategory === "all"
                  ? darkMode
                    ? "bg-[#58A6FF] text-[#0D1117]"
                    : "bg-purple-500"
                  : darkMode
                    ? "border-[#30363D] text-[#C9D1D9]"
                    : ""
              }
            >
              All
            </Button>
            {videoCategories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedVideoCategory === category ? "default" : "outline"}
                onClick={() => setSelectedVideoCategory(category)}
                className={
                  selectedVideoCategory === category
                    ? darkMode
                      ? "bg-[#58A6FF] text-[#0D1117]"
                      : "bg-purple-500"
                    : darkMode
                      ? "border-[#30363D] text-[#C9D1D9]"
                      : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video) => (
              <Card key={video.id} className={`overflow-hidden ${cardClass}`}>
                <CardContent className="p-0">
                  {activeVideo === video.id ? (
                    <div className="aspect-video">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div
                      className={`aspect-video flex items-center justify-center cursor-pointer ${
                        darkMode
                          ? "bg-gradient-to-br from-[#161B22] to-[#2E294E]"
                          : "bg-gradient-to-br from-purple-100 to-pink-100"
                      }`}
                      onClick={() => setActiveVideo(video.id)}
                    >
                      <Play className={`w-12 h-12 ${darkMode ? "text-[#58A6FF]" : "text-purple-600"}`} />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-medium ${textClass}`}>{video.title}</h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteVideo(video.id)}
                        className={`p-1 h-auto ${
                          darkMode ? "text-[#F85149] hover:bg-[#0D1117]" : "text-red-500 hover:text-red-700"
                        }`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className={`flex justify-between text-sm ${subtextClass}`}>
                      <span>{video.category}</span>
                      <span>{video.duration} min</span>
                    </div>
                    {activeVideo !== video.id && (
                      <Button
                        size="sm"
                        onClick={() => setActiveVideo(video.id)}
                        className={`w-full mt-2 ${
                          darkMode
                            ? "bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117]"
                            : "bg-purple-500 hover:bg-purple-600"
                        }`}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Watch
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-8">
              <Video className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-[#8B949E]" : "text-gray-400"}`} />
              <p className={subtextClass}>No videos in this category yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Water Tracking */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center ${darkMode ? "text-[#58A6FF]" : "text-blue-700"}`}>
              <Droplets className="w-5 h-5 mr-2" />
              Hydration Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className={`text-4xl font-bold mb-2 ${darkMode ? "text-[#58A6FF]" : "text-blue-600"}`}>
                {waterIntake}ml
              </div>
              <div className={`text-sm mb-4 ${darkMode ? "text-[#8B949E]" : "text-blue-600"}`}>
                {Math.max(0, dailyTargets.water - waterIntake)}ml remaining
              </div>
              <Progress value={(waterIntake / dailyTargets.water) * 100} className="mb-4" />
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => addWater(250)}
                size="sm"
                className={
                  darkMode
                    ? "bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117]"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }
              >
                <Plus className="w-4 h-4 mr-1" />
                250ml
              </Button>
              <Button
                onClick={() => addWater(500)}
                size="sm"
                className={
                  darkMode
                    ? "bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117]"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }
              >
                <Plus className="w-4 h-4 mr-1" />
                500ml
              </Button>
              <Button
                onClick={() => addWater(-250)}
                size="sm"
                variant="outline"
                className={darkMode ? "border-[#30363D] text-[#C9D1D9]" : "border-blue-300 text-blue-600"}
              >
                <Minus className="w-4 h-4 mr-1" />
                250ml
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Tracker */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center ${darkMode ? "text-[#238636]" : "text-green-700"}`}>
              <Activity className="w-5 h-5 mr-2" />
              Today's Exercise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    exercise.completed
                      ? darkMode
                        ? "bg-[#0D1117] border-[#238636]"
                        : "bg-green-50 border-green-200"
                      : darkMode
                        ? "bg-[#0D1117] border-[#30363D]"
                        : "bg-white border-gray-200"
                  }`}
                >
                  <div>
                    <div
                      className={`font-medium ${
                        exercise.completed
                          ? darkMode
                            ? "text-[#238636] line-through"
                            : "text-green-700 line-through"
                          : darkMode
                            ? "text-[#C9D1D9]"
                            : "text-gray-700"
                      }`}
                    >
                      {exercise.type}
                    </div>
                    <div className={`text-sm ${darkMode ? "text-[#8B949E]" : "text-gray-500"}`}>
                      {exercise.duration} minutes
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={exercise.completed ? "default" : "outline"}
                    onClick={() => toggleExercise(exercise.id)}
                    className={
                      exercise.completed
                        ? darkMode
                          ? "bg-[#238636] hover:bg-[#238636]/80"
                          : "bg-green-500 hover:bg-green-600"
                        : darkMode
                          ? "border-[#30363D] text-[#C9D1D9]"
                          : ""
                    }
                  >
                    {exercise.completed ? "Done" : "Mark Done"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Meal Tracker */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center ${darkMode ? "text-[#FFAB91]" : "text-orange-700"}`}>
              <Apple className="w-5 h-5 mr-2" />
              Meal Tracker (Indian Cuisine Supported)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="What did you eat? (e.g., 2 roti with dal and sabzi)"
                  value={newMeal}
                  onChange={(e) => setNewMeal(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addMeal()}
                  className={darkMode ? "bg-[#0D1117] border-[#30363D] text-[#C9D1D9]" : ""}
                />
                <Button
                  onClick={addMeal}
                  className={
                    darkMode ? "bg-[#FFAB91] hover:bg-[#FFAB91]/80 text-[#0D1117]" : "bg-orange-500 hover:bg-orange-600"
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div
                className={`text-xs p-2 rounded ${
                  darkMode ? "text-[#FFAB91] bg-[#0D1117] border border-[#30363D]" : "text-orange-600 bg-orange-50"
                }`}
              >
                <strong>Supported Indian foods:</strong> roti, chapati, rice, dal, sabzi, palak, rajma, chole, paneer,
                dahi, aloo, bhindi, methi, paratha, poha, upma, idli, dosa, sambar, khichdi, biryani, and more!
              </div>

              <div className="space-y-2">
                <h4 className={`font-medium ${darkMode ? "text-[#FFAB91]" : "text-orange-700"}`}>Today's Meals:</h4>
                {todaysMeals.length > 0 ? (
                  todaysMeals.map((meal, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded border ${
                        darkMode
                          ? "bg-[#0D1117] border-[#30363D] text-[#C9D1D9]"
                          : "bg-orange-50 border-orange-200 text-orange-800"
                      }`}
                    >
                      <span>{meal}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className={`text-sm ${darkMode ? "text-[#8B949E]" : "text-orange-600"}`}>
                      Start tracking your meals to see them here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Iron-Rich Foods Recommendations */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center ${darkMode ? "text-[#F85149]" : "text-red-700"}`}>
              <Heart className="w-5 h-5 mr-2" />
              Iron-Rich Foods for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm mb-4 ${darkMode ? "text-[#8B949E]" : "text-red-600"}`}>
              With hemoglobin at 9.7 g/dL, focus on these iron-rich foods daily:
            </p>
            <div className="grid grid-cols-1 gap-2">
              <div
                className={`p-2 rounded border ${
                  darkMode ? "bg-[#0D1117] border-[#30363D]" : "bg-red-50 border-red-200"
                }`}
              >
                <span className={`text-sm font-medium ${darkMode ? "text-[#F85149]" : "text-red-800"}`}>
                  Indian Foods:
                </span>
                <div className={`text-sm mt-1 ${darkMode ? "text-[#C9D1D9]" : "text-red-700"}`}>
                  • Palak (Spinach) sabzi • Dal (especially masoor) • Methi leaves • Rajma • Chole • Dates (khajur) •
                  Jaggery (gur)
                </div>
              </div>
              <div
                className={`p-2 rounded border ${
                  darkMode ? "bg-[#0D1117] border-[#30363D]" : "bg-red-50 border-red-200"
                }`}
              >
                <span className={`text-sm font-medium ${darkMode ? "text-[#F85149]" : "text-red-800"}`}>
                  Other Foods:
                </span>
                <div className={`text-sm mt-1 ${darkMode ? "text-[#C9D1D9]" : "text-red-700"}`}>
                  • Nuts & Seeds • Beetroot • Pomegranate • Dark Chocolate • Quinoa • Lean meats • Eggs
                </div>
              </div>
            </div>
            <div
              className={`mt-4 p-3 rounded border ${
                darkMode ? "bg-[#0D1117] border-[#30363D]" : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <p className={`text-sm ${darkMode ? "text-[#C9D1D9]" : "text-yellow-800"}`}>
                💡 <strong>Tip:</strong> Combine iron-rich foods with vitamin C sources (like citrus fruits) to enhance
                absorption! Avoid tea/coffee with iron-rich meals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Insights */}
      <Card
        className={`mt-8 ${
          darkMode
            ? "bg-gradient-to-r from-[#161B22] to-[#2E294E] border-[#F778BA]"
            : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
        }`}
      >
        <CardHeader>
          <CardTitle className={textClass}>Today's Health Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? "bg-[#0D1117]/60" : "bg-white/60"}`}>
              <h3 className={`font-medium mb-2 ${darkMode ? "text-[#58A6FF]" : "text-blue-800"}`}>Hydration Status</h3>
              <p className={`text-sm ${darkMode ? "text-[#C9D1D9]" : "text-blue-700"}`}>
                {waterIntake >= dailyTargets.water
                  ? "Excellent! You've met your hydration goal."
                  : `You need ${dailyTargets.water - waterIntake}ml more water today.`}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-[#0D1117]/60" : "bg-white/60"}`}>
              <h3 className={`font-medium mb-2 ${darkMode ? "text-[#F85149]" : "text-red-800"}`}>Iron Focus</h3>
              <p className={`text-sm ${darkMode ? "text-[#C9D1D9]" : "text-red-700"}`}>
                {nutrition.iron >= dailyTargets.iron
                  ? "Great job meeting your iron intake goal!"
                  : "Add more iron-rich Indian foods like palak, dal, and methi to boost your hemoglobin levels."}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-[#0D1117]/60" : "bg-white/60"}`}>
              <h3 className={`font-medium mb-2 ${darkMode ? "text-[#238636]" : "text-green-800"}`}>
                Exercise Progress
              </h3>
              <p className={`text-sm ${darkMode ? "text-[#C9D1D9]" : "text-green-700"}`}>
                {exercises.filter((e) => e.completed).length > 0
                  ? "You're doing great with your exercise routine!"
                  : "Start with some gentle movement or watch one of your exercise videos."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
