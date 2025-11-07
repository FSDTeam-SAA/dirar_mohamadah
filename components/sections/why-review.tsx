"use client"

import ScrollTrigger from "@/components/scroll-trigger"
import FeatureCard from "@/components/feature-card"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function KeyValueSection() {
  const { t } = useLanguage()

  const features = [
    t("key.point1"),
    t("key.point2"),
    t("key.point3"),
    t("key.point4"),
    t("key.point5"),
    t("key.point6"),
    t("key.point7"),
  ]

  return (
    <section id="key" className="py-20 sm:py-28 lg:py-32 relative bg-[#DCF2FB]">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollTrigger className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("key.title")}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("key.subtitle")}
          </p>
        </ScrollTrigger>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((text, index) => (
            <ScrollTrigger key={index} animation="fade-in-up" delay={index * 120}>
              <FeatureCard
                icon={CheckCircle2}
                title={text}
                description=""
              />
            </ScrollTrigger>
          ))}
        </div>
      </div>
    </section>
  )
}
