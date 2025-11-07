"use client"

import { useLanguage } from "@/contexts/language-context"
import clsx from "clsx"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t, language } = useLanguage()

  const isArabic = language === "ar"

  return (
    <footer
      className={clsx(
        "bg-[#006EA6] border-t border-border py-12 sm:py-16",
        isArabic && "text-right"
      )}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* === Top Footer Links === */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t("nav.brand") || "TallyPrime"}
            </h3>
            <p className="text-white/60 text-sm">
              {t("footer.description") || "Maximize your Tally potential with expert guidance."}
            </p>
          </div>

          {/* Product Section */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">
              {t("footer.productTitle") || "Product"}
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.features") || "Features"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.pricing") || "Pricing"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.security") || "Security"}
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">
              {t("footer.companyTitle") || "Company"}
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.about") || "About"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.blog") || "Blog"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.contact") || "Contact"}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">
              {t("footer.legalTitle") || "Legal"}
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.privacy") || "Privacy Policy"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.terms") || "Terms of Service"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("footer.cookies") || "Cookies"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* === Copyright === */}
        <div className="border-t border-border pt-8">
          <p
            className={clsx(
              "text-center text-sm text-white/60",
              isArabic && "text-right"
            )}
          >
            &copy; {currentYear} {t("footer.copyright") || "TallyPrime. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
