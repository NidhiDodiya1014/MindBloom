"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Clock, Target, Calendar } from "lucide-react"

export function Planner() {
  const [newTask, setNewTask] = useState("")
  const [newGoal, setNewGoal] = useState("")

  const timeSlots = [
    { time: "6:00 AM", activity: "Wake up & Meditation", completed: true },
    { time: "6:30 AM", activity: "Surya Namaskar", completed: false },
    { time: "7:00 AM", activity: "Bath & Morning routine", completed: false },
    { time: "8:00 AM", activity: "Breakfast (Iron-rich)", completed: false },
    { time: "9:00 AM", activity: "Study Session 1", completed: false },
    { time: "11:00 AM", activity: "Break & Hydration", completed: false },
    { time: "11:30 AM", activity: "Study Session 2", completed: false },
    { time: "1:00 PM", activity: "Lunch & Rest", completed: false },
    { time: "2:30 PM", activity: "Reading (15 pages)", completed: false },
    { time: "3:30 PM", activity: "Nature Walk", completed: false },
    { time: "5:00 PM", activity: "Evening Snack", completed: false },
    { time: "6:00 PM", activity: "Study Session 3", completed: false },
    { time: "8:00 PM", activity: "Dinner", completed: false },
    { time: "9:00 PM", activity: "Journal Writing", completed: false },
    { time: "10:00 PM", activity: "Reading before sleep", completed: false },
    { time: "10:30 PM", activity: "Evening Meditation", completed: false },
    { time: "11:00 PM", activity: "Sleep", completed: false },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">📅 Life Planner</h1>
        <p className="text-purple-600">Plan your days, weeks, months, and years mindfully</p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="daily" className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly" className="flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Yearly
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-800">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-lg border ${
                        slot.completed ? "bg-green-50 border-green-200" : "bg-white border-purple-100"
                      }`}
                    >
                      <div className="w-20 text-sm font-medium text-purple-600">{slot.time}</div>
                      <div
                        className={`flex-1 ml-4 ${slot.completed ? "text-green-700 line-through" : "text-purple-700"}`}
                      >
                        {slot.activity}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${slot.completed ? "bg-green-500" : "bg-purple-300"}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-800">Add New Task</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="What would you like to add to your day?"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button className="w-full bg-purple-500 hover:bg-purple-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-800">Daily Reflection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-purple-700 mb-2 block">
                        How do you want to feel today?
                      </label>
                      <Input placeholder="Peaceful, productive, energized..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-purple-700 mb-2 block">What's your main focus?</label>
                      <Textarea placeholder="Today I will focus on..." />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-800">This Week's Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-purple-700 mb-4">Health & Wellness</h3>
                  <ul className="space-y-2 text-purple-600">
                    <li>• Complete 7 days of Surya Namaskar</li>
                    <li>• Read 105 pages (15/day)</li>
                    <li>• Daily nature walks</li>
                    <li>• Maintain iron-rich diet</li>
                    <li>• 2.5L water daily</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-700 mb-4">Study & Growth</h3>
                  <ul className="space-y-2 text-purple-600">
                    <li>• 14 hours of focused study</li>
                    <li>• Complete 2 practice tests</li>
                    <li>• Journal daily experiences</li>
                    <li>• Limit screen time to 2 hours</li>
                    <li>• Meditation twice daily</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-800">Monthly Missions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3">Health Goals</h3>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• Increase hemoglobin to 10.5</li>
                    <li>• Complete 30 days of exercise</li>
                    <li>• Read 2 complete books</li>
                    <li>• Establish consistent sleep schedule</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3">Study Goals</h3>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Complete syllabus revision</li>
                    <li>• Take 8 mock tests</li>
                    <li>• Improve weak subjects</li>
                    <li>• Create study notes</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-3">Personal Goals</h3>
                  <ul className="space-y-2 text-purple-700 text-sm">
                    <li>• Reduce social media by 50%</li>
                    <li>• Practice gratitude daily</li>
                    <li>• Learn a new skill</li>
                    <li>• Strengthen relationships</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-800">Yearly Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">🌟 Your 2025 Vision</h3>
                  <p className="text-purple-600 italic">
                    "To become the healthiest, most productive, and mindful version of myself"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-3">Major Milestones</h4>
                    <ul className="space-y-2 text-purple-600">
                      <li>• Achieve optimal hemoglobin levels (12+ g/dL)</li>
                      <li>• Read 24 books (2 per month)</li>
                      <li>• Complete academic goals successfully</li>
                      <li>• Establish unbreakable healthy habits</li>
                      <li>• Reduce screen time by 70%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-3">Life Areas to Transform</h4>
                    <ul className="space-y-2 text-purple-600">
                      <li>• Physical Health & Fitness</li>
                      <li>• Mental Clarity & Focus</li>
                      <li>• Academic Excellence</li>
                      <li>• Emotional Well-being</li>
                      <li>• Spiritual Growth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
