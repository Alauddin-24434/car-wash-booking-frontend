"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, Clock, Search, Filter, Car, Sparkles, Shield, Droplets, Zap, Leaf, ArrowRight, Heart, ShoppingCart } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

const services = [
  {
    id: "1",
    name: "Basic Wash & Dry",
    category: "exterior",
    description: "Essential exterior cleaning with soap wash, rinse, and towel dry",
    price: 25,
    originalPrice: 35,
    duration: 30,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    features: ["Exterior Soap Wash", "High-Pressure Rinse", "Hand Towel Dry", "Tire Cleaning"],
    popular: false,
    discount: 29,
  },
  {
    id: "2",
    name: "Premium Wash & Wax",
    category: "exterior",
    description: "Complete exterior care with premium wax protection and shine enhancement",
    price: 45,
    originalPrice: 60,
    duration: 60,
    rating: 4.8,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop",
    features: ["Premium Soap Wash", "Clay Bar Treatment", "Carnauba Wax", "Tire Shine", "Window Cleaning"],
    popular: true,
    discount: 25,
  },
  {
    id: "3",
    name: "Interior Deep Clean",
    category: "interior",
    description: "Thorough interior cleaning and sanitization for a fresh cabin experience",
    price: 65,
    originalPrice: 80,
    duration: 90,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=300&fit=crop",
    features: ["Vacuum All Surfaces", "Steam Cleaning", "Leather Treatment", "Dashboard Polish", "Air Freshener"],
    popular: false,
    discount: 19,
  },
  {
    id: "4",
    name: "Full Service Detail",
    category: "complete",
    description: "Complete interior and exterior detailing for the ultimate car care experience",
    price: 120,
    originalPrice: 150,
    duration: 180,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
    features: ["Everything in Premium Wash", "Interior Deep Clean", "Engine Bay Clean", "Headlight Restoration"],
    popular: true,
    discount: 20,
  },
  {
    id: "5",
    name: "Paint Correction",
    category: "specialty",
    description: "Professional paint restoration to remove swirl marks and scratches",
    price: 200,
    originalPrice: 250,
    duration: 240,
    rating: 5.0,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    features: ["Paint Assessment", "Multi-Stage Polishing", "Swirl Mark Removal", "Paint Protection"],
    popular: false,
    discount: 20,
  },
  {
    id: "6",
    name: "Ceramic Coating",
    category: "specialty",
    description: "Long-lasting paint protection with advanced ceramic technology",
    price: 350,
    originalPrice: 450,
    duration: 300,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop",
    features: ["Paint Preparation", "Ceramic Application", "UV Protection", "Hydrophobic Coating", "5-Year Warranty"],
    popular: false,
    discount: 22,
  },
  {
    id: "7",
    name: "Eco-Friendly Wash",
    category: "eco",
    description: "Environmentally conscious cleaning using biodegradable products",
    price: 35,
    originalPrice: 45,
    duration: 45,
    rating: 4.6,
    reviews: 278,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    features: ["Biodegradable Soap", "Water Conservation", "Eco-Friendly Wax", "Green Certification"],
    popular: false,
    discount: 22,
  },
  {
    id: "8",
    name: "Express Quick Wash",
    category: "express",
    description: "Fast and efficient wash for busy schedules",
    price: 18,
    originalPrice: 25,
    duration: 15,
    rating: 4.3,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    features: ["Quick Exterior Wash", "Spot-Free Rinse", "Air Dry", "Basic Tire Clean"],
    popular: false,
    discount: 28,
  },
]

const categories = [
  { value: "all", label: "All Services", icon: Car },
  { value: "exterior", label: "Exterior", icon: Sparkles },
  { value: "interior", label: "Interior", icon: Shield },
  { value: "complete", label: "Complete Detail", icon: Zap },
  { value: "specialty", label: "Specialty", icon: Star },
  { value: "eco", label: "Eco-Friendly", icon: Leaf },
  { value: "express", label: "Express", icon: Clock },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "duration":
          return a.duration - b.duration
        default:
          return b.popular ? 1 : -1
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional car care services designed to keep your vehicle looking its best
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center space-x-2">
                      <category.icon className="h-4 w-4" />
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg px-4 py-2">
              <Filter className="h-4 w-4 text-gray-600 mr-2" />
              <span className="text-gray-700 font-medium">
                {filteredServices.length} Services
              </span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {service.popular && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                      POPULAR
                    </Badge>
                  )}
                  {service.discount > 0 && (
                    <Badge className="bg-green-600 text-white">
                      {service.discount}% OFF
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(service.id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`h-5 w-5 ${
                      favorites.includes(service.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-600'
                    }`} 
                  />
                </button>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{service.rating}</span>
                  <span className="text-xs text-gray-600">({service.reviews})</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {service.name}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {service.duration}m
                  </Badge>
                </div>

                <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </CardDescription>

                {/* Features */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Includes:</div>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {service.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{service.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-orange-600">${service.price}</span>
                    {service.originalPrice > service.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${service.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button asChild className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                    <Link href={`/services/${service.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-orange-50 hover:border-orange-300">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button 
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
