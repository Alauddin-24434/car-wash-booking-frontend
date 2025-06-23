import { Car, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

const Footer = () => {
    return (
        <div>
             <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">AutoShine Pro</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Professional automotive care services that make your vehicle shine like new. Quality, reliability, and
                customer satisfaction guaranteed.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "YouTube"].map((social) => (
                  <div
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3 text-gray-400">
                {[
                  "Car Wash",
                  "Interior Detailing",
                  "Paint Correction",
                  "Ceramic Coating",
                  "Waxing",
                  "Engine Cleaning",
                ].map((service) => (
                  <li key={service} className="hover:text-orange-600 transition-colors cursor-pointer">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                {["About Us", "Our Team", "Careers", "Blog", "Reviews", "Gallery"].map((item) => (
                  <li key={item} className="hover:text-orange-600 transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Contact</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-orange-600" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-orange-600" />
                  <span>info@autoshinepro.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span>123 Auto Care Drive</span>
                </div>
              </div>
              <Button className="mt-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white w-full">
                Book Appointment
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutoShine Pro. All rights reserved. Crafted with passion for automotive excellence.</p>
          </div>
        </div>
      </footer>
        </div>
    );
};

export default Footer;