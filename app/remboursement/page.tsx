import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ReimbursementForm from "@/components/reimbursement-form"
import { RefreshCw, AlertTriangle, Clock, CreditCard } from "lucide-react"

export default function ReimbursementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container px-4 mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-green-700 bg-green-100 rounded-full dark:text-green-300 dark:bg-green-900/30">
              <RefreshCw className="w-4 h-4 mr-2" />
              Remboursement Sécurisé
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Demande de Remboursement</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Obtenez le remboursement de vos tickets de recharge non utilisés ou défectueux
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <ReimbursementForm />
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Eligibility Info */}
              <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <RefreshCw className="w-5 h-5 text-green-600 mr-2" />
                  Conditions de Remboursement
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Ticket non utilisé ou partiellement utilisé
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Ticket défectueux ou invalide
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Demande dans les 30 jours suivant l'achat
                  </li>
                </ul>
              </div>

              {/* Process Info */}
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  Délais de Traitement
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Vérification : 1-3 jours ouvrés
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Approbation : 2-5 jours ouvrés
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Remboursement : 3-7 jours ouvrés
                  </li>
                </ul>
              </div>

              {/* Payment Methods */}
              <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
                  Méthodes de Remboursement
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Virement bancaire (SEPA)
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    PayPal
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Nouveau ticket de recharge
                  </li>
                </ul>
              </div>

              {/* Important Notice */}
              <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                  Important
                </h3>
                <p className="text-sm text-muted-foreground">
                  Les frais de traitement peuvent s'appliquer selon le type de ticket et la méthode de remboursement
                  choisie. Consultez nos conditions générales pour plus de détails.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
