"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Star, Search, Car, Droplets, Sparkles, Shield, Zap, Award } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: 1,
    name: "Basic Exterior Wash",
    description: "Complete exterior cleaning with premium soap and protective wax coating",
    price: 20,
    duration: 60,
    category: "exterior",
    rating: 4.8,
    features: ["Exterior wash", "Tire cleaning", "Basic wax", "Wheel cleaning"],
    icon: Droplets,
  },
  {
    id: 2,
    name: "Interior Detailing",
    description: "Thorough interior cleaning including vacuuming, dashboard, and upholstery care",
    price: 50,
    duration: 90,
    category: "interior",
    rating: 4.9,
    features: ["Deep vacuuming", "Dashboard cleaning", "Upholstery care", "Window cleaning"],
    icon: Sparkles,
  },
  {
    id: 3,
    name: "Full Service Wash",
    description: "Complete interior and exterior cleaning with premium detailing",
    price: 80,
    duration: 120,
    category: "full-service",
    rating: 4.9,
    features: ["Interior & exterior", "Premium wax", "Tire shine", "Air freshener"],
    icon: Award,
  },
  {
    id: 4,
    name: "Express Wax",
    description: "Quick wax application to protect and shine your car's exterior",
    price: 40,
    duration: 45,
    category: "exterior",
    rating: 4.7,
    features: ["Quick wax", "Exterior protection", "Shine enhancement", "Water repellent"],
    icon: Zap,
  },
  {
    id: 5,
    name: "Engine Cleaning",
    description: "Professional engine bay cleaning to maintain optimal performance",
    price: 60,
    duration: 75,
    category: "specialty",
    rating: 4.8,
    features: ["Engine degreasing", "Component cleaning", "Protective coating", "Performance check"],
    icon: Shield,
  },
  {
    id: 6,
    name: "Undercarriage Wash",
    description: "Thorough undercarriage cleaning to remove salt, dirt, and grime",
    price: 35,
    duration: 60,
    category: "specialty",
    rating: 4.6,
    features: ["Undercarriage cleaning", "Salt removal", "Rust prevention", "Protective spray"],
    icon: Shield,
  },
  {
    id: 7,
    name: "Headlight Restoration",
    description: "Restore cloudy or yellowed headlights for improved visibility",
    price: 45,
    duration: 60,
    category: "specialty",
    rating: 4.8,
    features: ["Headlight polishing", "UV protection", "Clarity restoration", "Safety improvement"],
    icon: Sparkles,
  },
  {
    id: 8,
    name: "Clay Bar Treatment",
    description: "Remove contaminants and prepare paint surface for optimal protection",
    price: 70,
    duration: 90,
    category: "specialty",
    rating: 4.9,
    features: ["Contaminant removal", "Paint preparation", "Smooth finish", "Enhanced protection"],
    icon: Award,
  },
]

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState({})

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-50 animate-slide-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-slide-in-left">
              <Car className="h-8 w-8 text-blue-600 animate-pulse-custom" />
              <span className="ml-2 text-xl font-bold text-gray-900 gradient-text">AutoShine</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 stagger-animation">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="text-blue-600 px-3 py-2 rounded-md text-sm font-medium bg-blue-50 rounded-full"
                >
                  Services
                </Link>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
                >
                  Contact
                </Link>
                <Link
                  href="/cart"
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
                >
                  Cart (0)
                </Link>
              </div>
            </div>
            <Button asChild className="btn-animate hover-glow animate-slide-in-right">
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Header with Parallax */}
      <div className="parallax-bg py-24" style={{ backgroundImage: "url(/images/bg-pattern.jpg)" }}>
        <div className="parallax-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6 text-white animate-slide-in-up">Our Services</h1>
              <p
                className="text-xl max-w-2xl mx-auto text-white/90 animate-slide-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Professional car care services designed to keep your vehicle looking its best
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-effect rounded-2xl shadow-lg p-6 mb-8 animate-fade-in-scale">
          <div className="flex flex-col md:flex-row gap-4 stagger-animation">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search services..." className="pl-10 bg-white/80 backdrop-blur-sm" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="exterior">Exterior</SelectItem>
                <SelectItem value="interior">Interior</SelectItem>
                <SelectItem value="full-service">Full Service</SelectItem>
                <SelectItem value="specialty">Specialty</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under $50</SelectItem>
                <SelectItem value="medium">$50 - $100</SelectItem>
                <SelectItem value="high">Over $100</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="quick">Under 1 hour</SelectItem>
                <SelectItem value="medium">1-2 hours</SelectItem>
                <SelectItem value="long">Over 2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-animation">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="hover-lift card-hover group overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300 animate-float"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div
                      className="flex items-center animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{service.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{service.name}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600 animate-pulse-custom">${service.price}</span>
                      <Badge variant="secondary" className="flex items-center animate-slide-in-left">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.duration}m
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600 animate-slide-in-up"
                          style={{ animationDelay: `${featureIndex * 0.1}s` }}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 animate-pulse-custom"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button className="w-full mt-4 btn-animate hover-glow" asChild>
                      <Link href={`/cart?add=${service.id}`}>Add to Cart</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Popular Packages */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text animate-slide-in-up">Popular Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
            <Card className="border-2 border-blue-200 relative hover-lift card-hover bg-white/90 backdrop-blur-sm">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 animate-heartbeat">
                Most Popular
              </Badge>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl gradient-text">Complete Care</CardTitle>
                <CardDescription>Everything your car needs</CardDescription>
                <div className="text-4xl font-bold text-blue-600 mt-4 animate-pulse-custom">$120</div>
                <div className="text-sm text-gray-500 animate-slide-in-up">Save $40</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {["Full Service Wash", "Interior Detailing", "Engine Cleaning", "Headlight Restoration"].map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-center animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse-custom"></div>
                        {item}
                      </li>
                    ),
                  )}
                </ul>
                <Button className="w-full btn-animate hover-glow" asChild>
                  <Link href="/cart?package=complete">Choose Package</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift card-hover bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Essential Clean</CardTitle>
                <CardDescription>Perfect for regular maintenance</CardDescription>
                <div className="text-4xl font-bold text-green-600 mt-4 animate-pulse-custom">$65</div>
                <div className="text-sm text-gray-500 animate-slide-in-up">Save $15</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {["Basic Exterior Wash", "Express Wax", "Interior Vacuum"].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3 animate-pulse-custom"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full btn-animate hover-glow bg-green-600 hover:bg-green-700"
                  variant="outline"
                  asChild
                >
                  <Link href="/cart?package=essential">Choose Package</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift card-hover bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium Shine</CardTitle>
                <CardDescription>Ultimate car care experience</CardDescription>
                <div className="text-4xl font-bold text-purple-600 mt-4 animate-pulse-custom">$200</div>
                <div className="text-sm text-gray-500 animate-slide-in-up">Save $60</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {["All Services Included", "Clay Bar Treatment", "Premium Protection", "6-Month Warranty"].map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-center animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 animate-pulse-custom"></div>
                        {item}
                      </li>
                    ),
                  )}
                </ul>
                <Button
                  className="w-full btn-animate hover-glow bg-purple-600 hover:bg-purple-700"
                  variant="outline"
                  asChild
                >
                  <Link href="/cart?package=premium">Choose Package</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
