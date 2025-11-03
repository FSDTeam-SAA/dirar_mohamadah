"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Check, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface BookingModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit?: (data: BookingFormData) => void
  isLoading?: boolean
}

export interface BookingFormData {
  fullName: string
  email: string
  phone: string
  company: string
  date: Date | undefined
  notes: string
  preferredTime: string
}

export default function BookingModal({ isOpen, onClose, onSubmit, isLoading = false }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    date: undefined,
    notes: "",
    preferredTime: "09:00",
  })
  const { t } = useLanguage()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setFormData((prev) => ({
      ...prev,
      date,
    }))
    if (errors.date) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.date
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = `${t("modal.fullName")} ${t("modal.required")}`
    if (!formData.email.trim()) {
      newErrors.email = `${t("modal.email")} ${t("modal.required")}`
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح"
    }
    if (!selectedDate) newErrors.date = `${t("modal.date")} ${t("modal.required")}`

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      console.log("[v0] Validation errors:", errors)
      return
    }

  

    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-2 border-primary/20">
        <DialogHeader className="sticky top-0 z-50 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/95 border-b border-primary/30 px-6 py-5 flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-2xl font-bold text-primary-foreground">{t("modal.title")}</DialogTitle>
            <DialogDescription className="text-primary-foreground/80">{t("modal.subtitle")}</DialogDescription>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors text-primary-foreground"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                1
              </div>
              {t("modal.step1")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold">
                  {t("modal.fullName")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder={t("modal.fullName")}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`focus:ring-2 focus:ring-primary transition-all ${errors.fullName ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  {t("modal.email")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("modal.email")}
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`focus:ring-2 focus:ring-primary transition-all ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">
                  {t("modal.phone")}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("modal.phone")}
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-semibold">
                  {t("modal.company")}
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder={t("modal.company")}
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                2
              </div>
              {t("modal.step2")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">
                  {t("modal.date")} <span className="text-red-500">*</span>
                </Label>
                <div
                  className={`border-2 rounded-xl p-4 bg-card/50 transition-all ${errors.date ? "border-red-500 bg-red-50/20" : "border-primary/20 hover:border-primary/40"}`}
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      const maxDate = new Date(today)
                      maxDate.setDate(maxDate.getDate() + 60)
                      return date < today || date > maxDate
                    }}
                    className="w-full [&_button]:rounded-lg [&_button:hover]:bg-primary/10 [&_button[aria-selected=true]]:bg-primary [&_button[aria-selected=true]]:text-primary-foreground"
                  />
                </div>
                {errors.date && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="text-sm font-semibold">
                    {t("modal.time")} <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg bg-card text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/40"
                  >
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>
                {selectedDate && (
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-lg animate-fadeInUp">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t("modal.slotSelected")}</p>
                        <p className="text-sm text-foreground/70 mt-1">
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          at{" "}
                          <span className="font-semibold text-primary">
                            {formData.preferredTime === "12:00"
                              ? "12:00 PM"
                              : formData.preferredTime === "13:00"
                                ? "1:00 PM"
                                : formData.preferredTime === "14:00"
                                  ? "2:00 PM"
                                  : formData.preferredTime === "15:00"
                                    ? "3:00 PM"
                                    : formData.preferredTime === "16:00"
                                      ? "4:00 PM"
                                      : formData.preferredTime === "17:00"
                                        ? "5:00 PM"
                                        : `${Number.parseInt(formData.preferredTime)}:00 AM`}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                3
              </div>
              {t("modal.step3")}
            </h3>
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-semibold">
                {t("modal.notes")}
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder={t("modal.notesPlaceholder")}
                value={formData.notes}
                onChange={handleInputChange}
                disabled={isLoading}
                rows={4}
                className="resize-none focus:ring-2 focus:ring-primary border-2 border-primary/20 transition-all hover:border-primary/40 rounded-lg"
              />
              <p className="text-xs text-foreground/50">
                {formData.notes.length}/500 {t("modal.characters")}
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t-2 border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              size="lg"
              className="font-semibold transition-all hover:bg-muted bg-transparent"
            >
              {t("modal.cancel")}
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block animate-spin">⏳</span>
                  {t("modal.booking")}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  {t("modal.confirm")}
                </span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
