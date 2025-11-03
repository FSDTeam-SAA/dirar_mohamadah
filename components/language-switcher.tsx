"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={`font-semibold transition-all ${language === "en" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}
      >
        EN
      </Button>
      <Button
        variant={language === "ar" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("ar")}
        className={`font-semibold transition-all ${language === "ar" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}
      >
        AR
      </Button>
    </div>
  )
}
