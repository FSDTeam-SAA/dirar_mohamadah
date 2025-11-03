"use client"

import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 sm:p-8 border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] group">
      <div className="space-y-4">
        <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-foreground/60 leading-relaxed">{description}</p>
      </div>
    </Card>
  )
}
