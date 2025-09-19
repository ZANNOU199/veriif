'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, CheckCircle, Clock, ArrowRight, Smartphone, CreditCard, Headphones, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

function HeroSection() {
  const { t } = useLanguage()
  
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/90 dark:to-blue-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900/50 dark:text-blue-300">
            <ShieldCheck className="w-5 h-5 mr-2" />
            {t('secureService')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="px-8 py-6 text-lg font-semibold">
              <Link href="/validation">
                {t('validateTicket')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <div className="flex flex-col items-center">
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold">
                <Link href="/remboursement">
                  {t('requestReimbursement')}
                </Link>
              </Button>
              {/* Alerte de vigilance personnalisée */}
              <div className="mt-2 w-full max-w-xs p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 rounded-r text-left">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <h3 className="text-xs font-medium text-yellow-800 dark:text-yellow-200">
                      Soyez Vigilant !
                    </h3>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      Nous vous proposons un service de validation et de remboursement plus sûr et fiable pour plus de sécurité et pour éviter les nombreuses arnaques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const { t } = useLanguage()
  
  const features = [
    {
      name: t('secure100'),
      description: t('secure100Desc'),
      icon: Shield,
    },
    {
      name: t('fastProcessing'),
      description: t('fastProcessingDesc'),
      icon: Clock,
    },
    {
      name: t('officialService'),
      description: t('officialServiceDesc'),
      icon: CheckCircle,
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900 sm:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.name} className="h-full transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePageContent() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default function HomePage() {
  return <HomePageContent />;
}
