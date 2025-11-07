"use client"

import ScrollTrigger from "@/components/scroll-trigger"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ShieldCheck } from "lucide-react"

export default function TrustSupport() {
  const { t } = useLanguage()

  const points = [
    t("trust.point1"),
    t("trust.point2"),
    t("trust.point3"),
    t("trust.point4"),
  ]

  return (
    <section id="trust" className="py-20 sm:py-28 lg:py-32 bg-[#F7FBFF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollTrigger className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("trust.title")}
          </h2>
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto">
            {t("trust.subtitle")}
          </p>
        </ScrollTrigger>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {points.map((text, i) => (
            <ScrollTrigger key={i} animation="fade-in-up" delay={i * 120}>
              <Card className="p-6 border border-border bg-card hover:border-primary/60 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex gap-4 items-start">
                  <ShieldCheck className="w-6 h-6 text-primary " />
                  <p className="text-foreground/80 leading-relaxed">{text}</p>
                </div>
              </Card>
            </ScrollTrigger>
          ))}
        </div>

        <ScrollTrigger animation="fade-in-up" className="mt-10 text-center">
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            {t("trust.note")}
          </p>
        </ScrollTrigger>

      </div>
    </section>
  )
}
