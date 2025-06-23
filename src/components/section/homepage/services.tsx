import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useGetAllServicesQuery } from '@/redux/features/service/serviceApi';
import { Badge, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Services = () => {
    const { data } = useGetAllServicesQuery(undefined)


    return (
        <div>
            <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              OUR SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Premium Car Care Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic washes to complete detailing packages, we offer comprehensive automotive care solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.data?.map((service:any) => (
              <Card
                key={service._id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={service.images[0] || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    {/* <span className="text-sm font-semibold">{service.rating}</span> */}
                  </div>
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">{service.name}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">{service.description}</CardDescription>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-orange-600">${service.price}</span>
                    <Badge  className="bg-gray-100 text-gray-700">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duration}m
                    </Badge>
                  </div>
                 <Link href={`/services/${service?._id}`}>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                    Service Details
                  </Button>
                 </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default Services;