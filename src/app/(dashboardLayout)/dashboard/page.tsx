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

export default function DashboardPage() {
  const user = useSelector(selectCurrentUser)
  const [activeTab, setActiveTab] = useState("overview")

  const dashboardData = {
    stats: {
      totalRevenue: 15420,
      totalBookings: 234,
      activeCustomers: 156,
      completedServices: 189,
      pendingBookings: 12,
      todayRevenue: 1240,
    },
    recentBookings: [
      {
        id: 1,
        customer: "Alice Johnson",
        service: "Full Service Wash",
        time: "10:00 AM",
        status: "completed",
        amount: 80,
      },
      {
        id: 2,
        customer: "Bob Smith",
        service: "Basic Exterior Wash",
        time: "11:30 AM",
        status: "in-progress",
        amount: 20,
      },
      { id: 3, customer: "Carol Davis", service: "Interior Detailing", time: "2:00 PM", status: "pending", amount: 50 },
      {
        id: 4,
        customer: "David Wilson",
        service: "Premium Detailing",
        time: "3:30 PM",
        status: "pending",
        amount: 150,
      },
    ],
    monthlyRevenue: [
      { month: "Jan", revenue: 12000 },
      { month: "Feb", revenue: 15000 },
      { month: "Mar", revenue: 18000 },
      { month: "Apr", revenue: 16000 },
      { month: "May", revenue: 20000 },
      { month: "Jun", revenue: 22000 },
    ],
    serviceStats: [
      { name: "Basic Wash", count: 45, percentage: 35 },
      { name: "Full Service", count: 38, percentage: 30 },
      { name: "Interior Detail", count: 25, percentage: 20 },
      { name: "Premium Detail", count: 19, percentage: 15 },
    ],
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  const renderTabsByRole = () => {
    switch (user?.role) {
      case "admin":
        return (
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
        )
      case "user":
        return (
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Profile</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
             <TabsTrigger value="services">Services</TabsTrigger>
             <TabsTrigger value="slots">Slots</TabsTrigger>
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
            <ServiceManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
