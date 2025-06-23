"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, CreditCard, Calendar, Mail, Lock, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Vehicle Info
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",

    // Appointment
    date: "",
    time: "",
    location: "main",

    // Payment
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",

    // Billing Address
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Preferences
    notifications: true,
    specialInstructions: "",
  })

  const cartItems = [
    { name: "Basic Exterior Wash", price: 20, duration: 60 },
    { name: "Full Service Wash", price: 80, duration: 120 },
  ]

  const subtotal = 100
  const tax = 8
  const total = 108

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Handle form submission
    alert("Booking confirmed! You will receive a confirmation email shortly.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AutoShine</span>
            </div>
            <div className="flex items-center space-x-4">
              <Lock className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-sm text-gray-600">
              Step {step} of 4:{" "}
              {step === 1
                ? "Personal Information"
                : step === 2
                  ? "Vehicle & Appointment"
                  : step === 3
                    ? "Payment Details"
                    : "Review & Confirm"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {step === 1 && (
                    <>
                      <Mail className="mr-2 h-5 w-5" /> Personal Information
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <Calendar className="mr-2 h-5 w-5" /> Vehicle & Appointment
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" /> Payment Details
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" /> Review & Confirm
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Vehicle & Appointment */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="make">Make</Label>
                          <Input
                            id="make"
                            value={formData.make}
                            onChange={(e) => handleInputChange("make", e.target.value)}
                            placeholder="Toyota"
                          />
                        </div>
                        <div>
                          <Label htmlFor="model">Model</Label>
                          <Input
                            id="model"
                            value={formData.model}
                            onChange={(e) => handleInputChange("model", e.target.value)}
                            placeholder="Camry"
                          />
                        </div>
                        <div>
                          <Label htmlFor="year">Year</Label>
                          <Select onValueChange={(value) => handleInputChange("year", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="color">Color</Label>
                          <Input
                            id="color"
                            value={formData.color}
                            onChange={(e) => handleInputChange("color", e.target.value)}
                            placeholder="Silver"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="licensePlate">License Plate (Optional)</Label>
                        <Input
                          id="licensePlate"
                          value={formData.licensePlate}
                          onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                          placeholder="ABC123"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Preferred Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange("date", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Preferred Time</Label>
                          <Select onValueChange={(value) => handleInputChange("time", value)}>
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
                      <div className="mt-4">
                        <Label>Location</Label>
                        <RadioGroup
                          value={formData.location}
                          onValueChange={(value) => handleInputChange("location", value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="main" id="main" />
                            <Label htmlFor="main">Main Location - 123 Main St</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="downtown" id="downtown" />
                            <Label htmlFor="downtown">Downtown - 456 Oak Ave</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mobile" id="mobile" />
                            <Label htmlFor="mobile">Mobile Service (+$20)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Payment Method</Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleInputChange("paymentMethod", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card">Credit/Debit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash">Pay at Location</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value)}
                              placeholder="123"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input
                            id="nameOnCard"
                            value={formData.nameOnCard}
                            onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                placeholder="123 Main Street"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  value={formData.city}
                                  onChange={(e) => handleInputChange("city", e.target.value)}
                                  placeholder="New York"
                                />
                              </div>
                              <div>
                                <Label htmlFor="state">State</Label>
                                <Select onValueChange={(value) => handleInputChange("state", value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="AL">Alabama</SelectItem>
                                    <SelectItem value="CA">California</SelectItem>
                                    <SelectItem value="FL">Florida</SelectItem>
                                    <SelectItem value="NY">New York</SelectItem>
                                    <SelectItem value="TX">Texas</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="zipCode">ZIP Code</Label>
                                <Input
                                  id="zipCode"
                                  value={formData.zipCode}
                                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                  placeholder="10001"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Review & Confirm */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p>
                          <strong>Name:</strong> {formData.firstName} {formData.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {formData.phone}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Vehicle & Appointment</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p>
                          <strong>Vehicle:</strong> {formData.year} {formData.make} {formData.model} ({formData.color})
                        </p>
                        <p>
                          <strong>Date:</strong> {formData.date}
                        </p>
                        <p>
                          <strong>Time:</strong> {formData.time}
                        </p>
                        <p>
                          <strong>Location:</strong>{" "}
                          {formData.location === "main"
                            ? "Main Location"
                            : formData.location === "downtown"
                              ? "Downtown Location"
                              : "Mobile Service"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Services</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {cartItems.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2">
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.notifications}
                        onCheckedChange={(checked) => handleInputChange("notifications", checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                    Previous
                  </Button>

                  {step < 4 ? (
                    <Button onClick={nextStep}>Next Step</Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                      Confirm Booking
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium">${item.price}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax}</span>
                </div>

                {formData.location === "mobile" && (
                  <div className="flex justify-between">
                    <span>Mobile Service Fee</span>
                    <span>$20</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total + (formData.location === "mobile" ? 20 : 0)}</span>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-blue-800 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Satisfaction Guaranteed</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">100% money-back guarantee if you're not satisfied</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
