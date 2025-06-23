"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Clock,
  Shield,
  CheckCircle,
  Calendar,
  Phone,
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  MessageSquare,
  ThumbsUp,
  Award,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - in real app, this would come from API
const serviceDetails = {
  "1": {
    id: "1",
    name: "Basic Wash & Dry",
    category: "Exterior Cleaning",
    description:
      "Our essential exterior cleaning service provides your vehicle with a thorough soap wash, high-pressure rinse, and careful hand towel dry. Perfect for regular maintenance and keeping your car looking clean and presentable.",
    longDescription:
      "The Basic Wash & Dry service is designed for customers who want reliable, quality car cleaning at an affordable price. Our experienced technicians use premium automotive soaps and equipment to ensure your vehicle receives the care it deserves. This service includes a complete exterior wash, tire cleaning, and spot-free drying process.",
    price: 25,
    originalPrice: 35,
    duration: 30,
    rating: 4.5,
    reviews: 234,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop",
    ],
    features: [
      "Exterior Soap Wash",
      "High-Pressure Rinse",
      "Hand Towel Dry",
      "Tire Cleaning",
      "Window Cleaning",
      "Spot-Free Finish",
    ],
    process: [
      "Pre-rinse to remove loose dirt",
      "Apply premium car soap",
      "Hand wash all exterior surfaces",
      "Clean tires and wheels",
      "Final rinse with spot-free water",
      "Hand dry with microfiber towels",
    ],
    includes: [
      "All exterior surfaces",
      "Tires and wheels",
      "Windows and mirrors",
      "Door jambs",
      "License plate cleaning",
    ],
    addOns: [
      { name: "Interior Vacuum", price: 10 },
      { name: "Tire Shine", price: 5 },
      { name: "Air Freshener", price: 3 },
      { name: "Dashboard Wipe", price: 8 },
    ],
    popular: false,
    discount: 29,
    warranty: "Satisfaction Guaranteed",
    estimatedTime: "30 minutes",
  },
}

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent service! My car looks amazing and the staff was very professional. Will definitely come back.",
    helpful: 12,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Good value for money. Quick service and my car is clean. Only minor issue was some water spots but overall satisfied.",
    helpful: 8,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 5,
    date: "2024-01-08",
    comment: "Amazing attention to detail! The team went above and beyond. Highly recommend this service.",
    helpful: 15,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
  },
]

const relatedServices = [
  {
    id: "2",
    name: "Premium Wash & Wax",
    price: 45,
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&h=200&fit=crop",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Interior Deep Clean",
    price: 65,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=300&h=200&fit=crop",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Full Service Detail",
    price: 120,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=200&fit=crop",
    rating: 4.9,
  },
]

export default function ServiceDetailsPage() {
  const params = useParams()
  const serviceId = params.id as string
  const service = serviceDetails[serviceId as keyof typeof serviceDetails]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnName) ? prev.filter((name) => name !== addOnName) : [...prev, addOnName],
    )
  }

  const calculateTotal = () => {
    const basePrice = service.price * quantity
    const addOnPrice = selectedAddOns.reduce((total, addOnName) => {
      const addOn = service.addOns.find((a) => a.name === addOnName)
      return total + (addOn ? addOn.price : 0)
    }, 0)
    return basePrice + addOnPrice
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-orange-600">
              Services
            </Link>
            <span>/</span>
            <span className="text-gray-900">{service.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <Link href="/services" className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>

            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={service.images[currentImageIndex] || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-96 object-cover"
                />

                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {service.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {service.popular && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white">POPULAR</Badge>
                  )}
                  {service.discount > 0 && <Badge className="bg-green-600 text-white">{service.discount}% OFF</Badge>}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "text-red-500 fill-current" : "text-gray-600"}`} />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {service.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-orange-500" : "border-gray-200"
                    }`}
                  >
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{service.name}</h1>
                  <p className="text-gray-600">{service.category}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(service.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-orange-600">${service.price}</span>
                    {service.originalPrice > service.price && (
                      <span className="text-lg text-gray-500 line-through">${service.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="process">Process</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{service.longDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">What's Included</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <div className="font-semibold">Duration</div>
                        <div className="text-gray-600">{service.duration} minutes</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <div className="font-semibold">Warranty</div>
                        <div className="text-gray-600">{service.warranty}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <div className="font-semibold">Quality</div>
                        <div className="text-gray-600">Professional Grade</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="process" className="mt-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Service Process</h3>
                    <div className="space-y-4">
                      {service.process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Customer Reviews</h3>
                      <Button variant="outline">Write a Review</Button>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <div className="font-semibold">{review.name}</div>
                                  <div className="text-sm text-gray-600">{review.date}</div>
                                </div>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">{review.comment}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <button className="flex items-center space-x-1 hover:text-orange-600">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>Helpful ({review.helpful})</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-orange-600">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>Reply</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {[
                        {
                          q: "How long does the service take?",
                          a: "The Basic Wash & Dry service typically takes 30 minutes to complete.",
                        },
                        {
                          q: "Do I need to make an appointment?",
                          a: "While walk-ins are welcome, we recommend booking an appointment to guarantee your preferred time slot.",
                        },
                        {
                          q: "What if I'm not satisfied with the service?",
                          a: "We offer a 100% satisfaction guarantee. If you're not happy with our service, we'll make it right.",
                        },
                      ].map((faq, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="font-semibold mb-2">{faq.q}</div>
                          <div className="text-gray-700">{faq.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-orange-600 mb-1">${calculateTotal()}</div>
                    <div className="text-sm text-gray-600">Total Price</div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <Label className="text-sm font-semibold mb-2 block">Quantity</Label>
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="mb-6">
                    <Label className="text-sm font-semibold mb-3 block">Add-ons</Label>
                    <div className="space-y-2">
                      {service.addOns.map((addOn) => (
                        <div key={addOn.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={addOn.name}
                              checked={selectedAddOns.includes(addOn.name)}
                              onChange={() => toggleAddOn(addOn.name)}
                              className="rounded border-gray-300"
                            />
                            <label htmlFor={addOn.name} className="text-sm">
                              {addOn.name}
                            </label>
                          </div>
                          <span className="text-sm font-semibold">+${addOn.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="mb-6 space-y-4">
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Preferred Date</Label>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Preferred Time</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-6 space-y-4">
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Your Name</Label>
                      <Input placeholder="Enter your name" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Phone Number</Label>
                      <Input placeholder="Enter your phone" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Special Instructions</Label>
                      <Textarea placeholder="Any special requests..." rows={3} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3">
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="text-center text-sm text-gray-600 mb-4">Need help? Contact us</div>
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              <Card className="mt-6 shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Services</h3>
                  <div className="space-y-4">
                    {relatedServices.map((relatedService) => (
                      <Link
                        key={relatedService.id}
                        href={`/services/${relatedService.id}`}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={relatedService.image || "/placeholder.svg"}
                          alt={relatedService.name}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{relatedService.name}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-orange-600 font-semibold">${relatedService.price}</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600 ml-1">{relatedService.rating}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
