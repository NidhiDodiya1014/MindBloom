"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Heart, Lightbulb, Calendar } from "lucide-react"

interface JournalEntry {
  id: string
  date: string
  content: string
  mood: number
  aiInsights?: string
  tags: string[]
}

export function Journal() {
  const [currentEntry, setCurrentEntry] = useState("")
  const [mood, setMood] = useState(5)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    // Load saved entries
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  const saveEntry = async () => {
    if (!currentEntry.trim()) return

    setIsAnalyzing(true)

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      content: currentEntry,
      mood,
      tags: extractTags(currentEntry),
    }

    // Simulate AI analysis (in real app, this would call OpenAI API)
    setTimeout(() => {
      newEntry.aiInsights = generateAIInsights(currentEntry, mood)
      const updatedEntries = [newEntry, ...entries]
      setEntries(updatedEntries)
      localStorage.setItem("journalEntries", JSON.stringify(updatedEntries))
      setCurrentEntry("")
      setMood(5)
      setIsAnalyzing(false)
    }, 2000)
  }

  const extractTags = (content: string): string[] => {
    const tags = []
    if (content.toLowerCase().includes("study") || content.toLowerCase().includes("learn")) tags.push("study")
    if (content.toLowerCase().includes("exercise") || content.toLowerCase().includes("walk")) tags.push("exercise")
    if (content.toLowerCase().includes("food") || content.toLowerCase().includes("eat")) tags.push("nutrition")
    if (content.toLowerCase().includes("tired") || content.toLowerCase().includes("stress")) tags.push("rest-needed")
    if (content.toLowerCase().includes("happy") || content.toLowerCase().includes("good")) tags.push("positive")
    if (content.toLowerCase().includes("read") || content.toLowerCase().includes("book")) tags.push("reading")
    return tags
  }

  const generateAIInsights = (content: string, moodScore: number): string => {
    const insights = []

    if (moodScore <= 3) {
      insights.push("I notice you're feeling low today. Remember that difficult days help us grow stronger.")
    } else if (moodScore >= 8) {
      insights.push("Your positive energy is wonderful! This is a great time to tackle challenging tasks.")
    }

    if (content.toLowerCase().includes("tired")) {
      insights.push("Consider adjusting your sleep schedule or taking more breaks during study sessions.")
    }

    if (content.toLowerCase().includes("study")) {
      insights.push("Your dedication to learning is admirable. Remember to balance study with rest and nutrition.")
    }

    if (content.toLowerCase().includes("food") || content.toLowerCase().includes("eat")) {
      insights.push(
        "Great that you're mindful of your nutrition! Keep focusing on iron-rich foods for your hemoglobin.",
      )
    }

    if (insights.length === 0) {
      insights.push(
        "Thank you for sharing your thoughts. Consistent journaling helps build self-awareness and emotional intelligence.",
      )
    }

    return insights.join(" ")
  }

  const moodEmojis = ["😢", "😔", "😐", "🙂", "😊", "😄", "🤗", "😍", "🌟", "✨"]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">📖 Daily Journal & AI Guide</h1>
        <p className="text-purple-600">Reflect on your day and receive personalized guidance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Journal Entry Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <BookOpen className="w-5 h-5 mr-2" />
                Today's Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-700 mb-2 block">
                    How are you feeling today? (1-10)
                  </label>
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={mood}
                      onChange={(e) => setMood(Number.parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-2xl">{moodEmojis[mood - 1]}</span>
                    <span className="text-purple-600 font-medium">{mood}/10</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-700 mb-2 block">What's on your mind today?</label>
                  <Textarea
                    placeholder="Share your thoughts, experiences, challenges, wins, or anything you'd like to reflect on..."
                    value={currentEntry}
                    onChange={(e) => setCurrentEntry(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={saveEntry}
                  disabled={!currentEntry.trim() || isAnalyzing}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      AI is analyzing your entry...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Save & Get AI Insights
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Panel */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Brain className="w-5 h-5 mr-2" />
                AI Coach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Today's Guidance</h4>
                  <p className="text-blue-700 text-sm">
                    Based on your recent entries, I notice you're working hard on your studies. Remember to take breaks
                    and maintain your iron-rich diet for sustained energy.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Health Reminder</h4>
                  <p className="text-green-700 text-sm">
                    Your hemoglobin levels need attention. Include spinach, dates, and nuts in today's meals.
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">Productivity Tip</h4>
                  <p className="text-yellow-700 text-sm">
                    Your best focus time seems to be in the morning. Schedule your most challenging tasks then.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Previous Entries */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-2" />
          Previous Entries
        </h2>

        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="border-l-4 border-l-purple-400">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-purple-600">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                    <span className="text-lg">{moodEmojis[entry.mood - 1]}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-purple-700 mb-3 text-sm leading-relaxed">{entry.content}</p>

                {entry.aiInsights && (
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-purple-800">AI Insights</span>
                    </div>
                    <p className="text-purple-700 text-sm">{entry.aiInsights}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {entries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-purple-600">Start your journaling journey! Your first entry will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
