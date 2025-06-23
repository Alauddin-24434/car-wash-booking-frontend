import { Button } from '@/components/ui/button';
import { AwardIcon, CheckCircle, PhoneCall } from 'lucide-react';
import React from 'react';

const features = [
  "Over 150,000 Cars Serviced",
  "State-of-the-Art Equipment",
  "Eco-Friendly Products",
  "Certified Technicians",
  "Competitive Pricing",
  "Convenient Locations",
]
const AboutUs = () => {
    return (
        <div>
             <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                alt="Professional Car Detailing"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <AwardIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">25+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                WHO WE ARE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Professional Car Care
                <span className="block text-orange-600">& Detailing Experts</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We are passionate automotive care specialists dedicated to making your vehicle look and feel like new.
                Our team combines years of experience with cutting-edge techniques and premium products.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8">
                  Learn More About Us
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <PhoneCall className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Call Us Anytime</div>
                    <div className="font-bold text-gray-800">(555) 123-4567</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default AboutUs;