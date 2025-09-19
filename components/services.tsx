"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Search, Shield } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

const ticketTypes = [
  { name: "Transcash", icon: "💳", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  { name: "PCS", icon: "🎫", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  { name: "Neosurf", icon: "🌊", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300" },
  { name: "Google Play", icon: "🎮", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  { name: "Apple Store", icon: "🍎", color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300" },
  { name: "Steam", icon: "🎯", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
  { name: "Amazon", icon: "📦", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
]

export function Services() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("ourServices")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("servicesSubtitle")}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Validation Service */}
          <Card className="relative overflow-hidden border-2 hover:border-blue-200 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">{t("ticketValidation")}</CardTitle>
              <CardDescription className="text-base">{t("ticketValidationDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/validation">{t("validateTicket")}</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Reimbursement Service */}
          <Card className="relative overflow-hidden border-2 hover:border-green-200 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">{t("reimbursementService")}</CardTitle>
              <CardDescription className="text-base">{t("reimbursementDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/remboursement">{t("requestReimbursement")}</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tracking Service */}
          <Card className="relative overflow-hidden border-2 hover:border-purple-200 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">{t("trackingService")}</CardTitle>
              <CardDescription className="text-base">{t("trackingDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/suivi">{t("trackRequest")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Supported Ticket Types */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">{t("supportedTickets")}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {ticketTypes.map((ticket) => (
              <div
                key={ticket.name}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${ticket.color}`}
              >
                <span className="mr-2 text-lg">{ticket.icon}</span>
                {ticket.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
