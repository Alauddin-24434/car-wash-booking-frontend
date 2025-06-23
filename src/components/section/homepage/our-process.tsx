import { ArrowRight, Calendar, CheckCircle, Navigation, Wrench } from 'lucide-react';
import React from 'react';
const processSteps = [
  {
    step: 1,
    title: "Book Online",
    description: "Schedule your appointment through our easy online booking system",
    icon: Calendar,
  },
  {
    step: 2,
    title: "Drop Off",
    description: "Bring your vehicle to our facility at your scheduled time",
    icon: Navigation,
  },
  {
    step: 3,
    title: "Professional Service",
    description: "Our experts provide top-quality care using premium products",
    icon: Wrench,
  },
  {
    step: 4,
    title: "Quality Check",
    description: "Thorough inspection ensures every detail meets our standards",
    icon: CheckCircle,
  },
]

const OurProcess = () => {
    return (
        <div>
              <section className="py-20  bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              OUR PROCESS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, efficient, and designed around your convenience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  {step.step}
                </div>
                <div className="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-orange-600 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default OurProcess;