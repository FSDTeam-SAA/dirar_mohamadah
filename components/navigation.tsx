"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BookingModal from "@/components/booking-modal"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-semibold text-xl text-primary hover:text-primary/80 transition-colors">
              {t("nav.brand")}
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#why" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                {t("nav.why")}
              </Link>
              <Link href="#included" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                {t("nav.included")}
              </Link>
              <Link href="#who" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                {t("nav.who")}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button
                onClick={() => setIsBookingOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {t("nav.bookNow")}
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
    </>
  )
}
