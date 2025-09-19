import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrackingForm } from "@/components/tracking-form"
import { Search, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container px-4 mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-purple-700 bg-purple-100 rounded-full dark:text-purple-300 dark:bg-purple-900/30">
              <Search className="w-4 h-4 mr-2" />
              Suivi de Demande
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Suivre ma Demande</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vérifiez l'état de votre demande de validation ou de remboursement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <TrackingForm />
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Status Legend */}
              <div className="bg-gray-50 dark:bg-gray-950/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Search className="w-5 h-5 text-gray-600 mr-2" />
                  États des Demandes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">En attente</p>
                      <p className="text-xs text-muted-foreground">Demande reçue, en cours de traitement</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Search className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">En cours</p>
                      <p className="text-xs text-muted-foreground">Vérification en cours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Approuvée</p>
                      <p className="text-xs text-muted-foreground">Demande validée avec succès</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Rejetée</p>
                      <p className="text-xs text-muted-foreground">Demande non conforme</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Besoin d'aide ?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Si vous ne trouvez pas votre demande ou si vous avez des questions, n'hésitez pas à nous contacter.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <strong>Email :</strong> support@rechargesecure.com
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Téléphone :</strong> +48 22 123 45 67 (Pologne)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
