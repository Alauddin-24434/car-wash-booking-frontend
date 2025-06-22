import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Home, Search, Frown } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center">
          {/* Sad Car Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
              <Car className="h-16 w-16 text-gray-400" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <Frown className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Oops! This page took a wrong turn</h2>
            <p className="text-gray-600 text-lg mb-2">
              The page you're looking for seems to have driven off into the sunset.
            </p>
            <p className="text-gray-500">Don't worry, we'll help you get back on track!</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                <Car className="mr-2 h-4 w-4" />
                View Services
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                <Search className="mr-2 h-4 w-4" />
                Get Help
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Popular Pages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
                Home
              </Link>
              <Link href="/services" className="text-blue-600 hover:text-blue-800 hover:underline">
                Our Services
              </Link>
              <Link href="/about" className="text-blue-600 hover:text-blue-800 hover:underline">
                About Us
              </Link>
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 hover:underline">
                Contact
              </Link>
              <Link href="/cart" className="text-blue-600 hover:text-blue-800 hover:underline">
                Shopping Cart
              </Link>
              <Link href="/checkout" className="text-blue-600 hover:text-blue-800 hover:underline">
                Checkout
              </Link>
              <Link href="/booking" className="text-blue-600 hover:text-blue-800 hover:underline">
                Book Now
              </Link>
              <Link href="/locations" className="text-blue-600 hover:text-blue-800 hover:underline">
                Locations
              </Link>
            </div>
          </div>

          {/* Fun Car Wash Facts */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Did you know?</h4>
            <p className="text-blue-700 text-sm">
              The first car wash was invented in 1914 in Detroit! While you're here, why not book a wash for your car
              and be part of automotive history?
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-sm text-gray-500">
            <p>Still can't find what you're looking for?</p>
            <p>
              Call us at{" "}
              <a href="tel:+15551234567" className="text-blue-600 hover:underline">
                (555) 123-4567
              </a>{" "}
              or email{" "}
              <a href="mailto:help@autoshine.com" className="text-blue-600 hover:underline">
                help@autoshine.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
