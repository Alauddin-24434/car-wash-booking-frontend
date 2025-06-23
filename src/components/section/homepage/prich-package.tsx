import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import React from 'react';
const packages = [
  {
    name: "Basic Clean",
    price: 29,
    duration: "45 min",
    features: ["Exterior Wash", "Tire Cleaning", "Window Cleaning", "Basic Vacuum"],
    popular: false,
    color: "from-gray-600 to-gray-800",
  },
  {
    name: "Premium Detail",
    price: 79,
    duration: "2 hours",
    features: ["Everything in Basic", "Interior Deep Clean", "Wax Application", "Tire Shine", "Dashboard Treatment"],
    popular: true,
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Ultimate Protection",
    price: 149,
    duration: "3 hours",
    features: ["Everything in Premium", "Paint Correction", "Ceramic Coating", "Leather Treatment", "Engine Bay Clean"],
    popular: false,
    color: "from-green-600 to-emerald-700",
  },
]
const PricingPackage = () => {
    return (
        <div>
            {/* Section 7: Pricing Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              PRICING PACKAGES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Choose Your Package</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options designed to meet every need and budget
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden border-0 shadow-xl ${pkg.popular ? "transform scale-105 z-10" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <div
                  className={`bg-gradient-to-r ${pkg.color} p-8 text-white text-center ${pkg.popular ? "pt-12" : ""}`}
                >
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold mb-2">${pkg.price}</div>
                  <div className="text-sm opacity-90">{pkg.duration}</div>
                </div>
                <CardContent className="p-8">
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${pkg.popular ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white" : "bg-gray-800 hover:bg-gray-900 text-white"}`}
                  >
                    Choose Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default PricingPackage;