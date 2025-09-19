"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, Clock, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { TicketSubmission } from "@/lib/types"

const statusConfig = {
  pending: {
    label: "En attente",
    icon: Clock,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  processing: {
    label: "En cours",
    icon: RefreshCw,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  approved: {
    label: "Approuvée",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  rejected: {
    label: "Rejetée",
    icon: AlertCircle,
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
}

export function TrackingForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submissions, setSubmissions] = useState<TicketSubmission[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSubmissions([])
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Votre demande de suivi est en cours de traitement",
          html: `<p>Votre demande est en cours de traitement, veuillez patienter quelques instants.</p>`
        }),
      })
      setSearched(true)
    } catch (err) {
      setError("Erreur lors de l'envoi du mail.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Rechercher mes Demandes</CardTitle>
          <CardDescription>Entrez votre adresse email pour voir toutes vos demandes</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Recherche en cours...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Rechercher mes Demandes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {searched && (
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Aucune demande trouvée</h3>
                <p className="text-muted-foreground">
                  Aucune demande n'a été trouvée pour cette adresse email. Vérifiez l'orthographe ou utilisez l'adresse
                  email utilisée lors de la soumission.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-foreground">
                {submissions.length} demande{submissions.length > 1 ? "s" : ""} trouvée
                {submissions.length > 1 ? "s" : ""}
              </h2>
              {submissions.map((submission) => {
                const status = statusConfig[submission.status]
                const StatusIcon = status.icon
                return (
                  <Card key={submission.id} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {submission.submission_type === "validation" ? "Validation" : "Remboursement"} -{" "}
                          {submission.ticket_type.toUpperCase()}
                        </CardTitle>
                        <Badge className={status.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <CardDescription>Demande #{submission.id.slice(0, 8)}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Montant</p>
                          <p className="font-medium">{submission.ticket_amount}€</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date de soumission</p>
                          <p className="font-medium">{formatDate(submission.created_at)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Code du ticket</p>
                          <p className="font-mono text-xs bg-muted px-2 py-1 rounded">
                            {submission.ticket_code.slice(0, 4)}****{submission.ticket_code.slice(-4)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Dernière mise à jour</p>
                          <p className="font-medium">{formatDate(submission.updated_at)}</p>
                        </div>
                      </div>

                      {submission.status === "rejected" && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Cette demande a été rejetée. Contactez notre support pour plus d'informations.
                          </AlertDescription>
                        </Alert>
                      )}

                      {submission.status === "approved" && submission.submission_type === "reimbursement" && (
                        <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800 dark:text-green-200">
                            Votre remboursement a été approuvé et sera traité sous 3-7 jours ouvrés.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </>
          )}
        </div>
      )}
    </div>
  )
}
