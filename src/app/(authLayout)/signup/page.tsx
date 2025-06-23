"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Eye,
  EyeOff,
  Car,
  AlertCircle,
  CheckCircle,
  Check,
  X,
  Loader2,
} from "lucide-react"
import { useSignUpMutation } from "@/redux/features/auth/authApi"
import { useAppDispatch } from "@/redux/hooks"
import { setUser } from "@/redux/features/auth/authSlice"

import { useForm, Controller } from "react-hook-form"

type FormValues = {
  name: string
 
  email: string
  phone: string
  address: string
  password: string
  confirmPassword: string
  image: FileList
}

export default function SignupPage() {
  const router = useRouter()
  const [signup, { isLoading }] = useSignUpMutation()
  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
  })

  const password = watch("password")
  const confirmPassword = watch("confirmPassword")

  const onSubmit = async (data: FormValues) => {
    setError(null)
    setSuccess(null)

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!data.image || data.image.length === 0) {
      setError("Please upload a profile image.")
      return
    }

    try {
      const form = new FormData()
      form.append("name", data.name)
      form.append("email", data.email)
      form.append("phone", data.phone)
      form.append("address", data.address)
      form.append("password", data.password)
      form.append("confirmPassword", data.confirmPassword)
      form.append("image", data.image[0])

      const response = await signup(form).unwrap()
      const { accessToken, user } = response?.data

      dispatch(setUser({ user, token: accessToken }))

      setSuccess("Account created successfully! Redirecting to login...")

      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err: any) {
      setError(err?.data?.message || err.message || "Failed to create account.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <Card className="w-full max-w-lg mx-auto shadow-2xl glass-effect">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-2">
            <Car className="h-12 w-12 text-purple-600 animate-pulse-custom" />
          </div>
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>Join AutoShine today</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* First Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  placeholder="John"
                  {...register("name", { required: "First name is required" })}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

            
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0123456789"
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 digits",
                  },
                })}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Street Name"
                {...register("address", { required: "Address is required" })}
                aria-invalid={!!errors.address}
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Upload Profile Image</Label>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("image", { required: "Profile image is required" })}
                aria-invalid={!!errors.image}
                className="block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.image && (
                <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword ? (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
              ) : confirmPassword ? (
                <div className="flex items-center text-sm mt-1 text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  Passwords match
                </div>
              ) : null}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <CheckCircle className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center pt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 hover:underline font-medium"
            >
              Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
