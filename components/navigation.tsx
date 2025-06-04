"use client"

import { Button } from "@/components/ui/button"
import { Home, Calendar, BookOpen, Heart, Book, Target, Coffee, Settings } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "planner", label: "Planner", icon: Calendar },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "health", label: "Health", icon: Heart },
    { id: "reading", label: "Reading", icon: Book },
    { id: "goals", label: "Goals", icon: Target },
    { id: "breaks", label: "Breaks", icon: Coffee },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-purple-100 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-bold text-purple-800">MindBloom</span>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className={`${
                    currentPage === item.id
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : "text-purple-600 hover:bg-purple-50"
                  } transition-all duration-200`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
