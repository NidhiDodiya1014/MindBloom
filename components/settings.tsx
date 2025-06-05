"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SettingsIcon, Bell, Moon, Volume2, User, Shield } from "lucide-react"

interface SettingsProps {
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function Settings({ darkMode, onToggleDarkMode }: SettingsProps) {
  const [name, setName] = useState("Nidhi")
  const [email, setEmail] = useState("nidhi@example.com")
  const [notifications, setNotifications] = useState(true)
  const [sounds, setSounds] = useState(true)
  const [meditationReminder, setMeditationReminder] = useState(true)
  const [waterReminder, setWaterReminder] = useState(true)
  const [screenTimeLimit, setScreenTimeLimit] = useState("120")

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  const handleReset = () => {
    localStorage.clear()
    alert("All data has been reset. The app will reload.")
    window.location.reload()
  }

  const cardClass = darkMode ? "bg-[#161B22] border-[#30363D]" : "bg-white border-gray-200"

  const textClass = darkMode ? "text-[#C9D1D9]" : "text-purple-800"
  const subtextClass = darkMode ? "text-[#8B949E]" : "text-purple-600"

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${textClass}`}>
          <SettingsIcon className="inline-block w-8 h-8 mr-2" />
          Settings
        </h1>
        <p className={subtextClass}>Customize your MindBloom experience</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center ${textClass}`}>
              <User className="w-5 h-5 mr-2" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className={`text-sm font-medium mb-1 block ${subtextClass}`}>
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={darkMode ? "bg-[#0D1117] border-[#30363D] text-[#C9D1D9]" : "border-purple-200"}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className={`text-sm font-medium mb-1 block ${subtextClass}`}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={darkMode ? "bg-[#0D1117] border-[#30363D] text-[#C9D1D9]" : "border-purple-200"}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center ${textClass}`}>
              <Moon className="w-5 h-5 mr-2" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className={`text-base ${textClass}`}>Dark Mode</Label>
                <p className={`text-sm ${subtextClass}`}>Enable dark mode for a gentler screen experience</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={onToggleDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center ${textClass}`}>
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className={`text-base ${textClass}`}>Enable Notifications</Label>
                  <p className={`text-sm ${subtextClass}`}>Receive reminders and updates</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className={`text-base ${textClass}`}>Meditation Reminders</Label>
                  <p className={`text-sm ${subtextClass}`}>Morning and evening meditation prompts</p>
                </div>
                <Switch
                  checked={meditationReminder}
                  onCheckedChange={setMeditationReminder}
                  disabled={!notifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className={`text-base ${textClass}`}>Water Reminders</Label>
                  <p className={`text-sm ${subtextClass}`}>Hourly reminders to stay hydrated</p>
                </div>
                <Switch checked={waterReminder} onCheckedChange={setWaterReminder} disabled={!notifications} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sound Settings */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center ${textClass}`}>
              <Volume2 className="w-5 h-5 mr-2" />
              Sound Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className={`text-base ${textClass}`}>Enable Sounds</Label>
                <p className={`text-sm ${subtextClass}`}>Play calming sounds during meditation and as feedback</p>
              </div>
              <Switch checked={sounds} onCheckedChange={setSounds} />
            </div>
          </CardContent>
        </Card>

        {/* Screen Time Settings */}
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center ${textClass}`}>
              <Shield className="w-5 h-5 mr-2" />
              Digital Wellbeing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="screenTimeLimit" className={`text-sm font-medium mb-1 block ${subtextClass}`}>
                  Daily Screen Time Limit (minutes)
                </Label>
                <Input
                  id="screenTimeLimit"
                  type="number"
                  value={screenTimeLimit}
                  onChange={(e) => setScreenTimeLimit(e.target.value)}
                  className={darkMode ? "bg-[#0D1117] border-[#30363D] text-[#C9D1D9]" : "border-purple-200"}
                />
                <p className={`text-xs mt-1 ${subtextClass}`}>
                  Set a daily limit for social media and entertainment apps
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            variant="outline"
            onClick={handleReset}
            className={
              darkMode
                ? "border-[#F85149] text-[#F85149] hover:bg-[#0D1117]"
                : "border-red-300 text-red-600 hover:bg-red-50"
            }
          >
            Reset All Data
          </Button>
          <Button
            onClick={handleSave}
            className={
              darkMode ? "bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-[#0D1117]" : "bg-purple-500 hover:bg-purple-600"
            }
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
