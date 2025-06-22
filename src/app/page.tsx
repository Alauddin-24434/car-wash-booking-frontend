"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Clock,
  Shield,
  Award,
  Users,
  MapPin,
  Phone,
  Mail,
  Car,
  Droplets,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react"
import Link from "next/link"

const heroSlides = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    title: "Premium Car Wash & Detailing",
    subtitle: "Experience the ultimate car care with our professional services",
    cta: "Book Now",
    ctaSecondary: "View Services",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    title: "Shine Like Never Before",
    subtitle: "Professional detailing that makes your car look brand new",
    cta: "Get Started",
    ctaSecondary: "Learn More",
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    title: "Your Car Deserves the Best",
    subtitle: "Premium care with eco-friendly products and expert service",
    cta: "Book Service",
    ctaSecondary: "Call Now",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState({})

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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

  // Scroll progress bar
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      const progressBar = document.querySelector(".scroll-progress") as HTMLElement
      if (progressBar) {
        progressBar.style.width = `${scrolled}%`
      }
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress"></div>

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
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
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
            <Button asChild className="btn-animate animate-slide-in-right">
              <Link href="/services">Book Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Carousel Section */}
      <section className="relative h-screen hero-carousel">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="carousel-content">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1
                  className={`text-4xl md:text-7xl font-bold mb-6 ${index === currentSlide ? "animate-slide-in-up" : ""}`}
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${index === currentSlide ? "animate-slide-in-up" : ""}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.subtitle}
                </p>
                <div
                  className={`flex flex-col sm:flex-row gap-4 justify-center ${index === currentSlide ? "animate-fade-in-scale" : ""}`}
                  style={{ animationDelay: "0.4s" }}
                >
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 btn-animate hover-glow">
                    <Link href="/services" className="flex items-center">
                      {slide.cta}
                      <Play className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass-effect text-white border-white hover:bg-white hover:text-blue-900 btn-animate"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {slide.ctaSecondary}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation */}
        <button className="carousel-nav prev" onClick={prevSlide}>
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="carousel-nav next" onClick={nextSlide}>
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section with Parallax */}
      <section className="py-20 parallax-bg" style={{ backgroundImage: "url(/images/bg-pattern.jpg)" }}>
        <div className="parallax-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-animate" id="features-title">
              <h2 className="text-4xl font-bold text-white mb-4 animate-slide-in-up">Why Choose AutoShine?</h2>
              <p
                className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                We provide exceptional car care services with attention to detail and customer satisfaction
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
              <div className="text-center glass-effect p-8 rounded-2xl hover-lift card-hover">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center animate-float">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">100% Safe</h3>
                <p className="text-white/80">Eco-friendly products that protect your car's finish</p>
              </div>
              <div className="text-center glass-effect p-8 rounded-2xl hover-lift card-hover">
                <div
                  className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Clock className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Quick Service</h3>
                <p className="text-white/80">Fast and efficient service without compromising quality</p>
              </div>
              <div className="text-center glass-effect p-8 rounded-2xl hover-lift card-hover">
                <div
                  className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <Award className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Expert Team</h3>
                <p className="text-white/80">Professional technicians with years of experience</p>
              </div>
              <div className="text-center glass-effect p-8 rounded-2xl hover-lift card-hover">
                <div
                  className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center animate-float"
                  style={{ animationDelay: "1.5s" }}
                >
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">5000+ Customers</h3>
                <p className="text-white/80">Trusted by thousands of satisfied customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-animate" id="services-title">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text animate-slide-in-up">
              Our Popular Services
            </h2>
            <p className="text-xl text-gray-600 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              Choose from our range of professional car care services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
            <Card className="hover-lift card-hover group overflow-hidden">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Droplets className="h-16 w-16 text-white animate-bounce-custom" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">Basic Exterior Wash</CardTitle>
                <CardDescription>Complete exterior cleaning with premium soap and wax</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-blue-600 animate-pulse-custom">$20</span>
                  <Badge variant="secondary" className="animate-slide-in-right">
                    <Clock className="h-3 w-3 mr-1" />
                    60 min
                  </Badge>
                </div>
                <Button className="w-full btn-animate hover-glow" asChild>
                  <Link href="/services">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift card-hover group overflow-hidden border-2 border-blue-200 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 animate-heartbeat">
                Most Popular
              </Badge>
              <CardHeader className="pt-8">
                <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="h-16 w-16 text-white animate-rotate-in" />
                </div>
                <CardTitle className="group-hover:text-purple-600 transition-colors">Full Service Wash</CardTitle>
                <CardDescription>Interior and exterior cleaning with detailing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-purple-600 animate-pulse-custom">$80</span>
                  <Badge variant="secondary" className="animate-slide-in-right">
                    <Clock className="h-3 w-3 mr-1" />
                    90 min
                  </Badge>
                </div>
                <Button className="w-full btn-animate hover-glow bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/services">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift card-hover group overflow-hidden">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Award className="h-16 w-16 text-white animate-zoom-in" />
                </div>
                <CardTitle className="group-hover:text-green-600 transition-colors">Premium Detailing</CardTitle>
                <CardDescription>Complete car restoration and protection package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-green-600 animate-pulse-custom">$150</span>
                  <Badge variant="secondary" className="animate-slide-in-right">
                    <Clock className="h-3 w-3 mr-1" />3 hours
                  </Badge>
                </div>
                <Button className="w-full btn-animate hover-glow bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/services">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12 animate-fade-in-scale">
            <Button variant="outline" size="lg" className="btn-animate hover-glow" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-animate" id="process-title">
            <h2 className="text-4xl font-bold text-white mb-4 animate-slide-in-up">Our Process</h2>
            <p className="text-xl text-white/90 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              Simple steps to get your car looking brand new
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 stagger-animation">
            {[
              { step: 1, title: "Book Online", desc: "Choose your service and schedule a convenient time" },
              { step: 2, title: "Drop Off", desc: "Bring your car to our facility or use our pickup service" },
              { step: 3, title: "Professional Care", desc: "Our experts work their magic on your vehicle" },
              { step: 4, title: "Pick Up", desc: "Collect your sparkling clean car" },
            ].map((item, index) => (
              <div key={item.step} className="text-center glass-effect p-8 rounded-2xl hover-lift">
                <div
                  className="bg-white text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold animate-bounce-custom"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-animate" id="testimonials-title">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text animate-slide-in-up">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              Don't just take our word for it
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
            {[
              {
                name: "Sarah Johnson",
                role: "Regular Customer",
                rating: 5,
                text: "Exceptional service! My car looks brand new. The team is professional and the results are outstanding.",
              },
              {
                name: "Mike Chen",
                role: "Business Owner",
                rating: 5,
                text: "Best car wash in town! Quick, efficient, and my car has never looked better. Highly recommend!",
              },
              {
                name: "Emily Davis",
                role: "Happy Customer",
                rating: 5,
                text: "Amazing attention to detail. The interior cleaning was thorough and the exterior shine is incredible.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover-lift card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current animate-rotate-in"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-4 animate-pulse-custom"></div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white animate-slide-in-up">
            Ready to Give Your Car the Care It Deserves?
          </h2>
          <p className="text-xl mb-10 text-white/90 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            Book your appointment today and experience the AutoShine difference
          </p>
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-scale"
            style={{ animationDelay: "0.4s" }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 btn-animate hover-glow" asChild>
              <Link href="/services">Book Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-effect text-white border-white hover:bg-white hover:text-blue-600 btn-animate"
            >
              <Phone className="mr-2 h-4 w-4" />
              (555) 123-4567
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 stagger-animation">
            <div>
              <div className="flex items-center mb-6">
                <Car className="h-8 w-8 text-blue-400 animate-pulse-custom" />
                <span className="ml-2 text-xl font-bold gradient-text">AutoShine</span>
              </div>
              <p className="text-gray-400 mb-6">
                Professional car wash and detailing services that make your vehicle shine like new.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "youtube"].map((social, index) => (
                  <div
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer animate-float"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3 text-gray-400">
                {["Car Wash", "Detailing", "Waxing", "Interior Cleaning"].map((service, index) => (
                  <li
                    key={service}
                    className="hover:text-white transition-colors animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link href="/services">{service}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                {["About Us", "Contact", "Careers", "Blog"].map((item, index) => (
                  <li
                    key={item}
                    className="hover:text-white transition-colors animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link href={`/${item.toLowerCase().replace(" ", "")}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center animate-slide-in-right">
                  <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                  <span>123 Main St, City, State 12345</span>
                </div>
                <div className="flex items-center animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
                  <Phone className="h-4 w-4 mr-3 text-blue-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                  <Mail className="h-4 w-4 mr-3 text-blue-400" />
                  <span>info@autoshine.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 animate-fade-in-scale">
            <p>&copy; 2024 AutoShine. All rights reserved. Made with ❤️ for car enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
