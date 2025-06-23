import { Button } from '@/components/ui/button';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import React from 'react';

const ContactLocation = () => {
    return (
        <div>
             <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                GET IN TOUCH
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Visit Our Location</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Conveniently located in the heart of the city with easy access and ample parking
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-gray-300">123 Auto Care Drive, Downtown, City 12345</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">(555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">info@autoshinepro.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Hours</div>
                    <div className="text-gray-300">Mon-Sat: 8AM-6PM, Sun: 9AM-4PM</div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-3">
                  Get Directions
                  <Navigation className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="bg-gray-700 rounded-2xl p-2">
              <div className="bg-gray-600 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                  <div className="text-xl font-semibold">Interactive Map</div>
                  <div className="text-gray-300">Click to view full map</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default ContactLocation;