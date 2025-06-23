"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { selectAuthLoading, selectCurrentUser } from "@/redux/features/auth/authSlice"

// Mock authentication check
const useAuth = () => {



    const user = useSelector(selectCurrentUser)
    const loading = useSelector(selectAuthLoading)
    return { user, loading }
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, loading } = useAuth()
    const router = useRouter()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if (!user) {
        router.push("/login")
        return null
    }

    return <>{children}</>
}
