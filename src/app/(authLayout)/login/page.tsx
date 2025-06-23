"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Car,
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Shield,
    Users,
    Calendar,
    Star,
    AlertCircle,
    CheckCircle,
    Loader2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const router = useRouter()

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        setError("") // Clear error when user types
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Basic validation
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields")
            setIsLoading(false)
            return
        }

        if (!formData.email.includes("@")) {
            setError("Please enter a valid email address")
            setIsLoading(false)
            return
        }

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Mock authentication logic
            const mockUsers = [
                { email: "admin@autoshine.com", password: "admin123", role: "admin", name: "Admin User" },
                { email: "manager@autoshine.com", password: "manager123", role: "manager", name: "John Manager" },
                { email: "employee@autoshine.com", password: "employee123", role: "employee", name: "Jane Employee" },
                { email: "customer@example.com", password: "customer123", role: "customer", name: "Mike Customer" },
            ]

            const user = mockUsers.find((u) => u.email === formData.email && u.password === formData.password)

            if (user) {
                setSuccess("Login successful! Redirecting...")
                // Store user data (in real app, use proper auth tokens)
                localStorage.setItem("user", JSON.stringify(user))

                setTimeout(() => {
                    // Redirect based on role
                    if (user.role === "customer") {
                        router.push("/")
                    } else {
                        router.push("/dashboard")
                    }
                }, 1500)
            } else {
                setError("Invalid email or password")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>



            {/* - Login Form */}
            <div className="flex flex-col justify-center p-4 sm:p-8 animate-slide-in-right w-full max-w-md mx-auto">
                <Card className="glass-effect border-0 shadow-2xl">
                    <CardHeader className="text-center pb-8">
                        <div className="flex justify-center mb-4 lg:hidden">
                            <Car className="h-12 w-12 text-blue-600 animate-pulse-custom" />
                        </div>
                        <CardTitle className="text-3xl font-bold gradient-text">Welcome Back</CardTitle>
                        <CardDescription className="text-lg">Sign in to your AutoShine account</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">


                        <Separator />

                        {/* Error/Success Messages */}
                        {error && (
                            <Alert className="border-red-200 bg-red-50 animate-slide-in-up">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <AlertDescription className="text-red-700">{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="border-green-200 bg-green-50 animate-slide-in-up">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-700">{success}</AlertDescription>
                            </Alert>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 transition-all"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange("password", e.target.value)}
                                            className="pl-10 pr-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 transition-all"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formData.rememberMe}
                                        onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="remember" className="text-sm text-gray-600">
                                        Remember me
                                    </Label>
                                </div>
                                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 btn-animate hover-glow"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                          <Separator />
                        {/* Sign Up Link */}
                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>

                    </CardContent>
                </Card>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link
                        href="/"
                        className="text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center"
                    >
                        ← Back to AutoShine Home
                    </Link>
                </div>
            </div>

        </div>
    )
}
