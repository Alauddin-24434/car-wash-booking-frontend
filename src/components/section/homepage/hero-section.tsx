import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const heroSlides = [
    {
        id: 1,
        image: "/hero3.png",
        title: "Premium Car Detailing",
        subtitle: "Transform your vehicle with professional care and attention to detail",
        cta: "Book Service",
        ctaSecondary: "View Gallery",
    },
    {
        id: 2,
        image: "/hero2.jpg",
        title: "Shine Like Never Before",
        subtitle: "Experience the ultimate in automotive care and protection",
        cta: "Get Started",
        ctaSecondary: "Learn More",
    },
    {
        id: 3,
        image: "/hero1.png",
        title: "Your Car Deserves Excellence",
        subtitle: "Professional service with eco-friendly products and expert technicians",
        cta: "Book Now",
        ctaSecondary: "Call Today",
    },
]

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }



    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }
    return (
        <div>
            < section className="relative h-screen overflow-hidden" >
                {
                    heroSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 flex items-center justify-center h-full">
                                <div className="text-center text-white max-w-4xl mx-auto px-4">
                                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{slide.title}</h1>
                                    <p className="text-xl md:text-2xl mb-8 opacity-90">{slide.subtitle}</p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-3"
                                        >
                                            {slide.cta}
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3"
                                        >
                                            <Play className="mr-2 h-5 w-5" />
                                            {slide.ctaSecondary}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </section >
        </div>

    );
};

export default HeroSection;