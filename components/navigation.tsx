"use client"

import { Button } from "@/components/ui/button"
import { Home, Calendar, BookOpen, Heart, Book, Target, Coffee, Settings, Moon, Sun } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function Navigation({ currentPage, onPageChange, darkMode, onToggleDarkMode }: NavigationProps) {
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        darkMode ? "bg-[#161B22]/90 border-[#30363D]" : "bg-white/90 border-purple-100"
      } backdrop-blur-md border-b`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌸</span>
            <span className={`text-xl font-bold ${darkMode ? "text-[#C9D1D9]" : "text-purple-800"}`}>MindBloom</span>
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
                      ? darkMode
                        ? "bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117]"
                        : "bg-purple-500 hover:bg-purple-600 text-white"
                      : darkMode
                        ? "text-[#C9D1D9] hover:bg-[#30363D]"
                        : "text-purple-600 hover:bg-purple-50"
                  } transition-all duration-200`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              )
            })}

            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleDarkMode}
              className={`ml-2 ${
                darkMode ? "text-[#C9D1D9] hover:bg-[#30363D]" : "text-purple-600 hover:bg-purple-50"
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
