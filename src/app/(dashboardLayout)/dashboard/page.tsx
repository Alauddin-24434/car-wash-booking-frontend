"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Car,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  Settings,
  Bell,
  LogOut,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import ServiceManagement from "@/components/ui/service"
import SlotManagement from "@/components/slot-management"

export default function DashboardPage() {
  const user = useSelector(selectCurrentUser)
  const [activeTab, setActiveTab] = useState("overview")


  const renderTabsByRole = () => {
    switch (user?.role) {
      case "admin":
        return (
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="slots">Slots</TabsTrigger>
          </TabsList>
        )
      case "user":
        return (
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="overview">Profile</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
           
             
          </TabsList>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AutoShine Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{user?.name.charAt(0)}</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <Badge className="role-badge text-xs">{user?.role}</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-slide-in-up">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
            Here's what's happening at AutoShine today.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {renderTabsByRole()}

          {/* Tab content for services tab */}
          <TabsContent value="services" className="space-y-6">
            <ServiceManagement />
          </TabsContent>
          <TabsContent value="slots" className="space-y-6">
            <SlotManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
