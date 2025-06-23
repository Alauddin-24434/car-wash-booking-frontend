import { Card } from '@/components/ui/card';
import { Quote, StarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Business Owner",
        content:
            "Absolutely amazing service! My car looks better than when I first bought it. The attention to detail is incredible.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: 2,
        name: "Mike Chen",
        role: "Car Enthusiast",
        content:
            "I've tried many detailing services, but this is by far the best. Professional, reliable, and exceptional results.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Daily Commuter",
        content: "Great value for money and convenient location. My car always looks pristine after their service.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
]

const Testimonials = () => {
    // Auto-advance testimonial
    // 
    const [currentTestimonial, setCurrentTestimonial] = useState(0)


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])


    return (
        <div>
            <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            TESTIMONIALS
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Don't just take our word for it - hear from satisfied customers who trust us with their vehicles
                        </p>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                            >
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                        <Card className="bg-white shadow-xl border-0 p-8 text-center">
                                            <div className="mb-6">
                                                <Quote className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                                                <p className="text-xl text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                                            </div>
                                            <div className="flex justify-center mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <StarIcon key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-center space-x-4">
                                                <img
                                                    src={testimonial.image || "/placeholder.svg"}
                                                    alt={testimonial.name}
                                                    className="w-16 h-16 rounded-full object-cover"
                                                />
                                                <div>
                                                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                                                    <div className="text-gray-600">{testimonial.role}</div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? "bg-orange-600" : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;