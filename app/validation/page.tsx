import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ValidationForm } from "@/components/validation-form"
import { Shield, CheckCircle, Clock, Lock } from "lucide-react"

export default function ValidationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container px-4 mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full dark:text-blue-300 dark:bg-blue-900/30">
              <Shield className="w-4 h-4 mr-2" />
              Validation Sécurisée
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Validation de Ticket de Recharge</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vérifiez la validité et l'authenticité de votre ticket de recharge en quelques clics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <ValidationForm />
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Process Info */}
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  Processus de Validation
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Vérification automatique du code
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Contrôle de l'authenticité
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Confirmation par email
                  </li>
                </ul>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Lock className="w-5 h-5 text-green-600 mr-2" />
                  Sécurité Garantie
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Données chiffrées SSL
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Aucune conservation des codes
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Conformité RGPD
                  </li>
                </ul>
              </div>

              {/* Timing Info */}
              <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-purple-600 mr-2" />
                  Délais de Traitement
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Validation immédiate : 2-5 minutes
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Vérification manuelle : 2-24h
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Notification par email
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
