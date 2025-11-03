"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations = {
  en: {
    // Navigation
    "nav.brand": "TallyPrime",
    "nav.why": "Why Review",
    "nav.included": "What's Included",
    "nav.who": "Who It's For",
    "nav.bookNow": "Book Now",

    // Hero Section
    "hero.badge": "Free Product Review",
    "hero.title": "Transform the Way You Use Tally",
    "hero.description":
      "Schedule your free product review session to unlock the full power of TallyPrime. Identify errors, streamline processes, and maximize your setup.",
    "hero.cta": "Book a Review Call",
    "hero.learnMore": "Learn More",

    // Why Review Section
    "why.title": "Why Get Your Tally Setup Reviewed?",
    "why.subtitle":
      "Professional experts analyze your configuration to unlock hidden potential and eliminate costly inefficiencies.",
    "why.feature1.title": "Identify Hidden Inefficiencies",
    "why.feature1.desc":
      "Discover processes that are slowing you down and learn how to optimize them for maximum productivity.",
    "why.feature2.title": "Ensure Compliance",
    "why.feature2.desc":
      "Verify that your Tally setup meets all accounting and regulatory standards for your industry.",
    "why.feature3.title": "Maximize ROI",
    "why.feature3.desc":
      "Get the most value from your Tally investment with best practices and advanced configurations.",
    "why.feature4.title": "Boost Team Productivity",
    "why.feature4.desc": "Streamline workflows so your team can focus on strategic work instead of manual processes.",

    // What's Included Section
    "included.title": "What's Included in Your Free Review",
    "included.subtitle": "A comprehensive 30-minute session covering all aspects of your Tally setup.",
    "included.item1": "Current configuration analysis",
    "included.item2": "Compliance verification",
    "included.item3": "Efficiency recommendations",
    "included.item4": "Process optimization plan",
    "included.item5": "Team training recommendations",
    "included.item6": "Personalized report & follow-up",

    // Who It's For Section
    "who.title": "Who Should Get a Review?",
    "who.subtitle": "Perfect for businesses at any stage of their Tally journey.",
    "who.segment1.title": "Growing Businesses",
    "who.segment1.desc": "Scaling operations but worried about system bottlenecks.",
    "who.segment2.title": "New Tally Users",
    "who.segment2.desc": "Recently switched to Tally and want to maximize implementation.",
    "who.segment3.title": "Existing Users",
    "who.segment3.desc": "Using Tally for years but unsure if configuration is optimal.",

    // Why Choose Us Section
    "choose.title": "Why Choose TallyPrime?",
    "choose.subtitle": "Industry leaders who have helped 1000+ businesses optimize their Tally setup.",
    "choose.feature1.title": "Expert Consultants",
    "choose.feature1.desc": "Our team has 15+ years of Tally implementation experience.",
    "choose.feature2.title": "Quick & Easy",
    "choose.feature2.desc": "30-minute sessions fit perfectly into your busy schedule.",
    "choose.feature3.title": "Proven Results",
    "choose.feature3.desc": "Average clients see 25% efficiency improvement within 3 months.",
    "choose.feature4.title": "Ongoing Support",
    "choose.feature4.desc": "We don't just review—we support your implementation journey.",

    // Booking Section
    "booking.title": "Ready to Transform Your Tally Setup?",
    "booking.subtitle":
      "Book your free 30-minute product review session today. Our experts will analyze your current setup and provide personalized recommendations.",
    "booking.cta": "Book a Review Call",
    "booking.contact": "Contact Support",
    "booking.tip":
      "Open your browser's developer console (F12 or Cmd+Shift+J) to see all booking data logged in real-time.",
    "booking.confirmed": "Booking Confirmed!",
    "booking.confirmedMsg":
      "Check the browser console to see your booking details. We'll send you a confirmation email shortly.",

    // Booking Modal
    "modal.title": "Book Your Free Review",
    "modal.subtitle": "Schedule your 30-minute personalized Tally product review session",
    "modal.step1": "Your Information",
    "modal.step2": "Select Your Preferred Time",
    "modal.step3": "Additional Information",
    "modal.fullName": "Full Name",
    "modal.email": "Email",
    "modal.phone": "Phone Number",
    "modal.company": "Company Name",
    "modal.date": "Date",
    "modal.time": "Preferred Time",
    "modal.notes": "Questions or Specific Challenges (Optional)",
    "modal.notesPlaceholder":
      "Tell us about your Tally setup, specific challenges, or questions you'd like to discuss...",
    "modal.cancel": "Cancel",
    "modal.confirm": "Confirm Booking",
    "modal.slotSelected": "Slot Selected",
    "modal.required": "required",
    "modal.booking": "Booking...",
    "modal.characters": "characters",

    // Footer
    "footer.copyright": "TallyPrime. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact",
  },
  ar: {
    // Navigation
    "nav.brand": "تالي برايم",
    "nav.why": "لماذا المراجعة",
    "nav.included": "ما المدرج",
    "nav.who": "من أجله",
    "nav.bookNow": "احجز الآن",

    // Hero Section
    "hero.badge": "مراجعة منتج مجانية",
    "hero.title": "غيّر طريقة استخدامك لبرنامج تالي",
    "hero.description":
      "جدول جلسة مراجعة المنتج المجانية الخاصة بك لفتح القوة الكاملة لبرنامج تالي برايم. حدد الأخطاء وسهل العمليات واستفد من إعدادك.",
    "hero.cta": "احجز مكالمة مراجعة",
    "hero.learnMore": "تعرف على المزيد",

    // Why Review Section
    "why.title": "لماذا يجب أن تحصل على مراجعة إعداد تالي الخاص بك؟",
    "why.subtitle": "يقوم الخبراء المحترفون بتحليل تكوينك لفتح الإمكانات المخفية والقضاء على عدم الكفاءة المكلفة.",
    "why.feature1.title": "حدد أوجه القصور المخفية",
    "why.feature1.desc": "اكتشف العمليات التي تبطئك وتعلم كيفية تحسينها لزيادة الإنتاجية.",
    "why.feature2.title": "ضمان الامتثال",
    "why.feature2.desc": "تحقق من أن إعداد تالي الخاص بك يفي بجميع معايير المحاسبة والتنظيمية لصناعتك.",
    "why.feature3.title": "زيادة العائد على الاستثمار",
    "why.feature3.desc": "احصل على أقصى قيمة من استثمار تالي الخاص بك من خلال أفضل الممارسات والتكوينات المتقدمة.",
    "why.feature4.title": "تعزيز إنتاجية الفريق",
    "why.feature4.desc": "تبسيط سير العمل حتى يتمكن فريقك من التركيز على العمل الاستراتيجي بدلاً من العمليات اليدوية.",

    // What's Included Section
    "included.title": "ما المدرج في مراجعتك المجانية",
    "included.subtitle": "جلسة شاملة مدتها 30 دقيقة تغطي جميع جوانب إعداد تالي الخاص بك.",
    "included.item1": "تحليل التكوين الحالي",
    "included.item2": "التحقق من الامتثال",
    "included.item3": "توصيات الكفاءة",
    "included.item4": "خطة تحسين العملية",
    "included.item5": "توصيات تدريب الفريق",
    "included.item6": "تقرير مخصص ومتابعة",

    // Who It's For Section
    "who.title": "من الذي يجب أن يحصل على مراجعة؟",
    "who.subtitle": "مثالي للشركات في أي مرحلة من مراحل رحلة تالي الخاصة بها.",
    "who.segment1.title": "الشركات المتنامية",
    "who.segment1.desc": "توسيع العمليات لكن قلق بشأن اختناقات النظام.",
    "who.segment2.title": "مستخدمو تالي الجدد",
    "who.segment2.desc": "انتقلنا مؤخراً إلى تالي وتريد تعظيم التنفيذ.",
    "who.segment3.title": "المستخدمون الموجودون",
    "who.segment3.desc": "استخدام تالي لسنوات لكن غير متأكد مما إذا كان التكوين مثالياً.",

    // Why Choose Us Section
    "choose.title": "لماذا تختار تالي برايم؟",
    "choose.subtitle": "قادة الصناعة الذين ساعدوا أكثر من 1000 شركة في تحسين إعداد تالي الخاص بهم.",
    "choose.feature1.title": "استشاريون خبراء",
    "choose.feature1.desc": "لدى فريقنا 15+ سنة من خبرة تطبيق تالي.",
    "choose.feature2.title": "سريع وسهل",
    "choose.feature2.desc": "تناسب الجلسات مدتها 30 دقيقة بشكل مثالي في جدولك المزدحم.",
    "choose.feature3.title": "نتائج مثبتة",
    "choose.feature3.desc": "يشهد متوسط العملاء تحسناً بنسبة 25% في الكفاءة خلال 3 أشهر.",
    "choose.feature4.title": "دعم مستمر",
    "choose.feature4.desc": "نحن لا نراجع فقط - نحن ندعم رحلة التنفيذ الخاصة بك.",

    // Booking Section
    "booking.title": "هل أنت مستعد لتغيير إعداد تالي الخاص بك؟",
    "booking.subtitle":
      "احجز جلسة مراجعة منتج مجانية مدتها 30 دقيقة اليوم. سيقوم خبراؤنا بتحليل الإعداد الحالي الخاص بك وتقديم توصيات مخصصة.",
    "booking.cta": "احجز مكالمة مراجعة",
    "booking.contact": "التواصل مع الدعم",
    "booking.tip":
      "افتح وحدة تحكم المتصفح الخاصة بك (F12 أو Cmd+Shift+J) لرؤية جميع بيانات الحجز المسجلة في الوقت الفعلي.",
    "booking.confirmed": "تم تأكيد الحجز!",
    "booking.confirmedMsg":
      "تحقق من وحدة تحكم المتصفح الخاصة بك لرؤية تفاصيل الحجز الخاص بك. سنرسل لك رسالة بريد إلكتروني للتأكيد قريباً.",

    // Booking Modal
    "modal.title": "احجز مراجعتك المجانية",
    "modal.subtitle": "حدد جلسة مراجعة منتج تالي الشخصية مدتها 30 دقيقة",
    "modal.step1": "معلوماتك",
    "modal.step2": "اختر الوقت المفضل لديك",
    "modal.step3": "معلومات إضافية",
    "modal.fullName": "الاسم الكامل",
    "modal.email": "البريد الإلكتروني",
    "modal.phone": "رقم الهاتف",
    "modal.company": "اسم الشركة",
    "modal.date": "التاريخ",
    "modal.time": "الوقت المفضل",
    "modal.notes": "أسئلة أو تحديات محددة (اختياري)",
    "modal.notesPlaceholder": "أخبرنا عن إعداد تالي الخاص بك والتحديات المحددة والأسئلة التي تود مناقشتها...",
    "modal.cancel": "إلغاء",
    "modal.confirm": "تأكيد الحجز",
    "modal.slotSelected": "تم اختيار الفتحة",
    "modal.required": "مطلوب",
    "modal.booking": "جاري الحجز...",
    "modal.characters": "أحرف",

    // Footer
    "footer.copyright": "تالي برايم. جميع الحقوق محفوظة.",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.contact": "اتصل",
  },
}


export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // ✅ Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language | null
      if (saved === "ar" || saved === "en") {
        setLanguage(saved)
      }
      setMounted(true)
    }
  }, [])

  // ✅ Update <html> attributes & localStorage
  useEffect(() => {
    if (!mounted) return
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    localStorage.setItem("language", language)
  }, [language, mounted])

  const t = (key: string): string => {
    const translation = (translations[language] as Record<string, string>)[key]
    return translation || key // fallback
  }

  if (!mounted) {
    // prevent hydration mismatch
    return null
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir: language === "ar" ? "rtl" : "ltr",
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}