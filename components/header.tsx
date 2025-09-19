"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Menu, Shield, Globe, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

// Définition des langues supportées
const supportedLanguages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
] as const;

type LanguageCode = typeof supportedLanguages[number]['code'];

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const currentLanguage = supportedLanguages.find((lang: LanguageOption) => lang.code === language) || supportedLanguages[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-foreground">RechargeSecure</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t("home")}
          </Link>
          <Link
            href="/validation"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("validation")}
          </Link>
          <Link
            href="/remboursement"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("reimbursement")}
          </Link>
          <Link
            href="/suivi"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("tracking")}
          </Link>
        </nav>

        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <Select
            value={language}
            onValueChange={(value: LanguageCode) => setLanguage(value)}
          >
            <SelectTrigger className="w-[120px] border-0 shadow-none">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {supportedLanguages.map((lang: LanguageOption) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white/80 dark:bg-blue-950/90 backdrop-blur-xl shadow-2xl border-l border-blue-100 dark:border-blue-900 animate-slide-in">
            <div className="flex flex-col space-y-2 mt-8">
              <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold text-blue-900 dark:text-blue-100 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-all" onClick={() => setIsOpen(false)}>
                <Shield className="h-5 w-5 text-blue-600" /> {t("home")}
              </Link>
              <Link href="/validation" className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold text-blue-900 dark:text-blue-100 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-all" onClick={() => setIsOpen(false)}>
                <CheckCircle className="h-5 w-5 text-green-600" /> {t("validation")}
              </Link>
              <Link href="/remboursement" className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold text-blue-900 dark:text-blue-100 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-all" onClick={() => setIsOpen(false)}>
                <Clock className="h-5 w-5 text-purple-600" /> {t("reimbursement")}
              </Link>
              <Link href="/suivi" className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold text-blue-900 dark:text-blue-100 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-all" onClick={() => setIsOpen(false)}>
                <Menu className="h-5 w-5 text-orange-600" /> {t("tracking")}
              </Link>
              <div className="my-4 border-t border-blue-100 dark:border-blue-900" />
              <div className="pt-2 px-4">
                <Select 
                value={language} 
                onValueChange={(value: LanguageCode) => setLanguage(value)}
              >
                <SelectTrigger className="w-full rounded-lg border border-blue-200 dark:border-blue-800">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {supportedLanguages.map((lang: LanguageOption) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
