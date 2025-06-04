"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Heart, Droplets, Apple, Activity, Plus, Minus, Target, TrendingUp } from "lucide-react"

interface NutritionData {
  protein: number
  iron: number
  vitamins: number
  calories: number
}

interface ExerciseSession {
  type: string
  duration: number
  completed: boolean
}

export function Health() {
  const [waterIntake, setWaterIntake] = useState(0)
  const [nutrition, setNutrition] = useState<NutritionData>({
    protein: 0,
    iron: 0,
    vitamins: 0,
    calories: 0,
  })
  const [exercises] = useState<ExerciseSession[]>([
    { type: "Surya Namaskar", duration: 15, completed: false },
    { type: "Breast Reduction Exercises", duration: 20, completed: false },
    { type: "Nature Walk", duration: 30, completed: false },
    { type: "Breathing Exercises", duration: 10, completed: false },
  ])

  const [todaysMeals, setTodaysMeals] = useState<string[]>([])
  const [newMeal, setNewMeal] = useState("")

  useEffect(() => {
    // Load saved data
    const savedWater = localStorage.getItem("waterIntake")
    const savedMeals = localStorage.getItem("todaysMeals")

    if (savedWater) setWaterIntake(Number.parseInt(savedWater))
    if (savedMeals) setTodaysMeals(JSON.parse(savedMeals))
  }, [])

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

    // Simulate nutrition calculation
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

    // Simple nutrition estimation based on keywords
    if (mealLower.includes("spinach") || mealLower.includes("green")) {
      iron += 15
      vitamins += 20
      calories += 50
    }
    if (mealLower.includes("dates") || mealLower.includes("dry fruits")) {
      iron += 10
      calories += 100
    }
    if (mealLower.includes("nuts") || mealLower.includes("almonds")) {
      protein += 15
      iron += 5
      calories += 150
    }
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
    if (mealLower.includes("milk") || mealLower.includes("yogurt")) {
      protein += 8
      vitamins += 15
      calories += 100
    }

    return { protein, iron, vitamins, calories }
  }

  const ironRichFoods = [
    "Spinach & Green Leafy Vegetables",
    "Dates & Raisins",
    "Nuts (Almonds, Cashews)",
    "Lentils & Legumes",
    "Beetroot",
    "Pomegranate",
    "Dark Chocolate",
    "Quinoa",
  ]

  const dailyTargets = {
    water: 2500, // ml
    protein: 60, // g
    iron: 18, // mg
    vitamins: 100, // %
    calories: 2000, // kcal
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">💚 Health & Wellness Tracker</h1>
        <p className="text-purple-600">Monitor your nutrition, hydration, and fitness journey</p>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Water Intake</p>
                <p className="text-2xl font-bold text-blue-800">{waterIntake}ml</p>
                <p className="text-blue-600 text-xs">Goal: {dailyTargets.water}ml</p>
              </div>
              <Droplets className="w-8 h-8 text-blue-500" />
            </div>
            <Progress value={(waterIntake / dailyTargets.water) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Iron Intake</p>
                <p className="text-2xl font-bold text-red-800">{nutrition.iron}mg</p>
                <p className="text-red-600 text-xs">Goal: {dailyTargets.iron}mg</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <Progress value={(nutrition.iron / dailyTargets.iron) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Protein</p>
                <p className="text-2xl font-bold text-green-800">{nutrition.protein}g</p>
                <p className="text-green-600 text-xs">Goal: {dailyTargets.protein}g</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
            <Progress value={(nutrition.protein / dailyTargets.protein) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Calories</p>
                <p className="text-2xl font-bold text-purple-800">{nutrition.calories}</p>
                <p className="text-purple-600 text-xs">Goal: {dailyTargets.calories}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
            <Progress value={(nutrition.calories / dailyTargets.calories) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Water Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Droplets className="w-5 h-5 mr-2" />
              Hydration Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">{waterIntake}ml</div>
              <div className="text-sm text-blue-600 mb-4">
                {Math.max(0, dailyTargets.water - waterIntake)}ml remaining
              </div>
              <Progress value={(waterIntake / dailyTargets.water) * 100} className="mb-4" />
            </div>

            <div className="flex gap-2 justify-center">
              <Button onClick={() => addWater(250)} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="w-4 h-4 mr-1" />
                250ml
              </Button>
              <Button onClick={() => addWater(500)} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="w-4 h-4 mr-1" />
                500ml
              </Button>
              <Button
                onClick={() => addWater(-250)}
                size="sm"
                variant="outline"
                className="border-blue-300 text-blue-600"
              >
                <Minus className="w-4 h-4 mr-1" />
                250ml
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Activity className="w-5 h-5 mr-2" />
              Today's Exercise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    exercise.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                  }`}
                >
                  <div>
                    <div
                      className={`font-medium ${exercise.completed ? "text-green-700 line-through" : "text-gray-700"}`}
                    >
                      {exercise.type}
                    </div>
                    <div className="text-sm text-gray-500">{exercise.duration} minutes</div>
                  </div>
                  <Button
                    size="sm"
                    variant={exercise.completed ? "default" : "outline"}
                    className={exercise.completed ? "bg-green-500 hover:bg-green-600" : ""}
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
        {/* Meal Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <Apple className="w-5 h-5 mr-2" />
              Meal Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="What did you eat? (e.g., Spinach salad with nuts)"
                  value={newMeal}
                  onChange={(e) => setNewMeal(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addMeal()}
                />
                <Button onClick={addMeal} className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-orange-700">Today's Meals:</h4>
                {todaysMeals.length > 0 ? (
                  todaysMeals.map((meal, index) => (
                    <div key={index} className="p-2 bg-orange-50 rounded border border-orange-200">
                      <span className="text-orange-800">{meal}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-orange-600 text-sm">Start tracking your meals to see them here.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Iron-Rich Foods Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <Heart className="w-5 h-5 mr-2" />
              Iron-Rich Foods for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600 mb-4">
              With hemoglobin at 9.7 g/dL, focus on these iron-rich foods daily:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {ironRichFoods.map((food, index) => (
                <div key={index} className="p-2 bg-red-50 rounded border border-red-200">
                  <span className="text-red-800 text-sm">• {food}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                💡 <strong>Tip:</strong> Combine iron-rich foods with vitamin C sources (like citrus fruits) to enhance
                absorption!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Insights */}
      <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Today's Health Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/60 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Hydration Status</h3>
              <p className="text-sm text-blue-700">
                {waterIntake >= dailyTargets.water
                  ? "Excellent! You've met your hydration goal."
                  : `You need ${dailyTargets.water - waterIntake}ml more water today.`}
              </p>
            </div>
            <div className="p-4 bg-white/60 rounded-lg">
              <h3 className="font-medium text-red-800 mb-2">Iron Focus</h3>
              <p className="text-sm text-red-700">
                {nutrition.iron >= dailyTargets.iron
                  ? "Great job meeting your iron intake goal!"
                  : "Add more iron-rich foods to boost your hemoglobin levels."}
              </p>
            </div>
            <div className="p-4 bg-white/60 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Exercise Progress</h3>
              <p className="text-sm text-green-700">
                {exercises.filter((e) => e.completed).length > 0
                  ? "You're doing great with your exercise routine!"
                  : "Start with some gentle movement to energize your day."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
