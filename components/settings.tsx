"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SettingsIcon, Bell, Moon, Volume2, User, Shield } from "lucide-react"

export function Settings() {
  const [name, setName] = useState("Nidhi")
  const [email, setEmail] = useState("nidhi@example.com")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [sounds, setSounds] = useState(true)
  const [meditationReminder, setMeditationReminder] = useState(true)
  const [waterReminder, setWaterReminder] = useState(true)
  const [screenTimeLimit, setScreenTimeLimit] = useState("120")

  const handleSave = () => {
    // In a real app, this would save to backend/localStorage
    alert("Settings saved successfully!")
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all app data? This cannot be undone.")) {
      localStorage.clear()
      alert("All data has been reset. The app will reload.")
      window.location.reload()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          <SettingsIcon className="inline-block w-8 h-8 mr-2" />
          Settings
        </h1>
        <p className="text-purple-600">Customize your MindBloom experience</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <User className="w-5 h-5 mr-2" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-purple-700 mb-1 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-purple-200"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-purple-700 mb-1 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-purple-200"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Moon className="w-5 h-5 mr-2" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-gray-500">Enable dark mode for a gentler screen experience</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Notifications</Label>
                  <p className="text-sm text-gray-500">Receive reminders and updates</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Meditation Reminders</Label>
                  <p className="text-sm text-gray-500">Morning and evening meditation prompts</p>
                </div>
                <Switch
                  checked={meditationReminder}
                  onCheckedChange={setMeditationReminder}
                  disabled={!notifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Water Reminders</Label>
                  <p className="text-sm text-gray-500">Hourly reminders to stay hydrated</p>
                </div>
                <Switch checked={waterReminder} onCheckedChange={setWaterReminder} disabled={!notifications} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sound Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Volume2 className="w-5 h-5 mr-2" />
              Sound Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Sounds</Label>
                <p className="text-sm text-gray-500">Play calming sounds during meditation and as feedback</p>
              </div>
              <Switch checked={sounds} onCheckedChange={setSounds} />
            </div>
          </CardContent>
        </Card>

        {/* Screen Time Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Shield className="w-5 h-5 mr-2" />
              Digital Wellbeing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="screenTimeLimit" className="text-sm font-medium text-purple-700 mb-1 block">
                  Daily Screen Time Limit (minutes)
                </Label>
                <Input
                  id="screenTimeLimit"
                  type="number"
                  value={screenTimeLimit}
                  onChange={(e) => setScreenTimeLimit(e.target.value)}
                  className="border-purple-200"
                />
                <p className="text-xs text-gray-500 mt-1">Set a daily limit for social media and entertainment apps</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button variant="outline" onClick={handleReset} className="border-red-300 text-red-600 hover:bg-red-50">
            Reset All Data
          </Button>
          <Button onClick={handleSave} className="bg-purple-500 hover:bg-purple-600">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
