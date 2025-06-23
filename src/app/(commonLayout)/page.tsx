"use client"
import HeroSection from "@/components/section/homepage/hero-section"
import AboutUs from "@/components/section/homepage/about-us"
import Services from "@/components/section/homepage/services"
import PricingPackage from "@/components/section/homepage/prich-package"

import Testimonials from "@/components/section/homepage/testimonials"
import ContactLocation from "@/components/section/homepage/contact-location"
import OurProcess from "@/components/section/homepage/our-process"


export default function HomePage() {



  return (
    <div className="min-h-screen bg-white">

      <HeroSection />

      <AboutUs />

      <Services />

      <PricingPackage />

      <OurProcess />

      <Testimonials />

      <ContactLocation />


    </div>
  )
}
