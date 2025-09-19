import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle, Mail, CreditCard } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "1. Soumettez votre ticket",
    description: "Remplissez le formulaire avec les informations de votre ticket de recharge",
    color: "text-blue-600",
  },
  {
    icon: CheckCircle,
    title: "2. Vérification automatique",
    description: "Notre système vérifie automatiquement la validité et l'authenticité de votre ticket",
    color: "text-green-600",
  },
  {
    icon: Mail,
    title: "3. Confirmation par email",
    description: "Vous recevez une confirmation par email avec les détails de votre demande",
    color: "text-purple-600",
  },
  {
    icon: CreditCard,
    title: "4. Traitement final",
    description: "Validation confirmée ou remboursement effectué selon votre demande",
    color: "text-orange-600",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Un processus simple et sécurisé en 4 étapes</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{step.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-blue-50 dark:bg-blue-950/30 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-foreground">Traitement généralement effectué sous 24h</span>
          </div>
        </div>
      </div>
    </section>
  )
}
