import Hero from "@/components/sections/hero"
import WhyReview from "@/components/sections/why-review"
import WhatIncluded from "@/components/sections/what-included"
import WhoItFor from "@/components/sections/who-it-for"
import WhyChooseUs from "@/components/sections/why-choose-us"
import Booking from "@/components/sections/booking"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WhyReview />
      <WhatIncluded />
      <WhoItFor />
      <WhyChooseUs />
      <Booking />
      <Footer />
    </main>
  )
}
