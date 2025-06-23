"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { selectAuthLoading, selectCurrentUser } from "@/redux/features/auth/authSlice"

const useAuth = () => {
  const user = useSelector(selectCurrentUser)
  const loading = useSelector(selectAuthLoading)
  return { user, loading }
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!user) {
    // ইউজার নেই, কিন্তু রিডাইরেক্ট প্রক্রিয়া চলছে — কিছু না দেখানোই ভাল
    return null
  }

  return <>{children}</>
}
