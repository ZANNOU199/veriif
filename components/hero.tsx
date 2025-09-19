
"use client";
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Clock, Lock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative py-24 lg:py-40 bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-blue-950/80 dark:via-background dark:to-blue-900 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/30 via-blue-200/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/20 via-blue-100/10 to-transparent rounded-full blur-2xl animate-pulse-slower" />
      </div>
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/70 dark:bg-blue-950/60 rounded-3xl shadow-2xl border border-blue-100/60 dark:border-blue-900/40 p-10 md:p-16">
          {/* Badge */}
          <div className="inline-flex items-center px-5 py-2 mb-8 text-base font-semibold text-blue-800 bg-blue-100/80 rounded-full shadow-sm dark:text-blue-200 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 animate-fade-in">
            <Shield className="w-5 h-5 mr-2" />
            {t("officialSecureService")}
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-blue-950 dark:text-white mb-6 text-balance drop-shadow-xl animate-fade-in-up">
            {t("heroTitle")} <span className="text-blue-600 bg-blue-100/60 px-2 rounded-lg shadow-sm">{t("heroTitleHighlight")}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-blue-900/80 dark:text-blue-100/80 mb-10 max-w-2xl mx-auto text-pretty font-medium animate-fade-in-up delay-100">
            {t("heroSubtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-14 animate-fade-in-up delay-200">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-lg px-10 py-5 rounded-xl shadow-lg transition-all duration-200 ease-out scale-100 hover:scale-105">
              <Link href="/validation">
                <CheckCircle className="w-6 h-6 mr-2" />
                {t("validateTicket")}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-10 py-5 rounded-xl border-2 border-blue-400/60 bg-white/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-200 shadow-lg hover:bg-blue-50/80 dark:hover:bg-blue-900/60 transition-all duration-200 ease-out scale-100 hover:scale-105">
              <Link href="/remboursement">
                <Clock className="w-6 h-6 mr-2" />
                {t("requestReimbursement")}
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-6 animate-fade-in-up delay-300">
            <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-900/40 shadow-md border border-blue-100 dark:border-blue-800">
              <Lock className="w-7 h-7 text-green-500 mb-1" />
              <span className="text-base font-semibold text-blue-900 dark:text-blue-100">{t("secure100")}</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-900/40 shadow-md border border-blue-100 dark:border-blue-800">
              <CheckCircle className="w-7 h-7 text-green-500 mb-1" />
              <span className="text-base font-semibold text-blue-900 dark:text-blue-100">{t("fastProcessing")}</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-900/40 shadow-md border border-blue-100 dark:border-blue-800">
              <Shield className="w-7 h-7 text-green-500 mb-1" />
              <span className="text-base font-semibold text-blue-900 dark:text-blue-100">{t("officialService")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
