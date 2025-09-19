"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Banknote, CheckCircle, Loader2, User, Mail, Smartphone, CreditCard } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useEmailSubmission } from "@/hooks/useEmailSubmission"
import { CommonFormFields } from "./forms/common-fields"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { TicketType, SubmissionType } from "@/lib/types"

interface FormData {
  ticket_type: TicketType
  ticket_code: string
  ticket_amount: string | number
  user_email: string
  user_phone: string
  user_name: string
  reimbursement_method: string
  reimbursement_reason: string
  reimbursement_details: string
  bank_iban: string
  paypal_email: string
  card_number: string
  card_expiry: string
  card_cvv: string
  card_name: string
  submission_type: SubmissionType
}



const initialFormData: FormData = {
  ticket_type: "transcash",
  ticket_code: "",
  ticket_amount: "",
  user_email: "",
  user_phone: "",
  user_name: "",
  reimbursement_method: "credit_card",
  reimbursement_reason: "unused",
  reimbursement_details: "",
  bank_iban: "",
  paypal_email: "",
  card_number: "",
  card_expiry: "",
  card_cvv: "",
  card_name: "",
}

const ticketTypes = [
  { value: 'transcash', label: 'Transcash' },
  { value: 'paysafecard', label: 'Paysafecard' },
  { value: 'teneo', label: 'Teneo' },
  { value: 'cashlib', label: 'Cashlib' },
  { value: 'neosurf', label: 'Neosurf' },
  { value: 'paysafecash', label: 'Paysafecash' },
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'litecoin', label: 'Litecoin' },
  { value: 'perfect_money', label: 'Perfect Money' },
  { value: 'skrill', label: 'Skrill' },
  { value: 'neteller', label: 'Neteller' },
  { value: 'webmoney', label: 'WebMoney' },
  { value: 'amazon', label: 'Amazon Gift Card' },
  { value: 'itunes', label: 'iTunes Gift Card' },
  { value: 'google_play', label: 'Google Play Gift Card' },
  { value: 'steam', label: 'Steam Wallet' },
  { value: 'payoneer', label: 'Payoneer' },
  { value: 'western_union', label: 'Western Union' },
  { value: 'moneygram', label: 'MoneyGram' },
];

const ReimbursementForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const { submitForm, isLoading, error } = useEmailSubmission({
    submissionType: "reimbursement",
    onSuccess: () => {
      setSuccess(true);
      setFormData(initialFormData);
    },
    onError: (error) => {
      toast({
        title: t('error'),
        description: error.message || t('submitErrorMessage'),
        variant: "destructive"
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof formData.ticket_amount === 'string') {
      formData.ticket_amount = Number(formData.ticket_amount) || 0;
    }
    await submitForm(formData);
  }

  if (loading) {
    return (
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 max-w-2xl mx-auto mt-8 animate-pulse">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
           <CardTitle className="text-2xl text-blue-800 dark:text-blue-200">
             Votre ticket est en cours de validation
           </CardTitle>
           <CardDescription className="text-blue-700 dark:text-blue-300 mt-2">
             <span className="block mb-2 text-base font-medium">Veuillez patienter quelques instants pendant que notre équipe procède à la validation de votre demande.</span>
             <span className="block mb-2">Un message vous sera envoyé à l’adresse email que vous avez fournie dès que la validation sera terminée.</span>
             <span className="block text-sm text-blue-900 dark:text-blue-200">Merci de contrôler votre boîte de réception et vos spams.</span>
           </CardDescription>
        </CardHeader>
      </Card>
    )
  }
  if (success) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 max-w-2xl mx-auto mt-8">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800 dark:text-green-200 font-bold">
            Votre demande a bien été reçue !
          </CardTitle>
          <CardDescription className="text-green-700 dark:text-green-300 mt-2">
            <span className="block mb-2 text-base font-medium">Merci d’avoir soumis votre demande de remboursement.</span>
            <span className="block mb-2">Notre équipe va l’examiner avec la plus grande attention et vous tiendra informé(e) par email dès qu’une décision sera prise.</span>
            <span className="block mb-2">Nous mettons tout en œuvre pour traiter votre dossier dans les meilleurs délais.</span>
            <span className="block text-sm text-green-900 dark:text-green-200">Pour toute question, n’hésitez pas à nous contacter.<br/>Merci pour votre confiance.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button
            onClick={() => {
              setSuccess(false)
              setFormData(initialFormData)
            }}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100 font-semibold"
          >
            Faire une nouvelle demande
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-2 sm:mx-auto mt-2 sm:mt-4 md:mt-8 mb-4 sm:mb-8 md:mb-12 shadow-lg overflow-hidden">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl md:text-2xl">{t('reimbursementRequest')}</CardTitle>
        <CardDescription className="text-sm md:text-base">
          {t('fillFormForReimbursement')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-semibold flex items-center">
              <Banknote className="w-4 h-4 mr-2" />
              {t('ticketInformation')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticket_type" className="text-sm">
                  {t('ticketType')} *
                </Label>
                <div className="relative w-full">
                  <Select
                    value={formData.ticket_type}
                    onValueChange={(value) => handleSelectChange("ticket_type", value as TicketType)}
                  >
                    <SelectTrigger className="w-full text-left">
                      <SelectValue placeholder={t('selectTicketType')} />
                    </SelectTrigger>
                    <SelectContent className="w-[var(--radix-select-trigger-width)] max-h-[300px] overflow-y-auto z-[100]">
                      <div className="sticky top-0 bg-background p-2 text-xs text-muted-foreground border-b">
                        {t('selectTicketType')}
                      </div>
                      <div className="p-1">
                        {ticketTypes.map((type) => (
                          <SelectItem 
                            key={type.value} 
                            value={type.value}
                            className="text-sm cursor-pointer rounded px-2 py-1.5 hover:bg-accent"
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ticket_code" className="text-sm">
                  {t('ticketCode')} *
                </Label>
                <Input
                  id="ticket_code"
                  name="ticket_code"
                  value={formData.ticket_code}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="XXXX-XXXX-XXXX"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ticket_amount" className="text-sm">
                  {t('amount')} (€) *
                </Label>
                <Input
                  id="ticket_amount"
                  name="ticket_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.ticket_amount}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
            <h3 className="text-base font-semibold flex items-center">
              <User className="w-4 h-4 mr-2" />
              {t('personalInformation')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user_email" className="text-sm">
                  {t('email')} *
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="user_email"
                    name="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className="w-full pl-10"
                    placeholder={t('enterEmail')}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user_name" className="text-sm">
                  {t('name')} *
                </Label>
                <Input
                  id="user_name"
                  name="user_name"
                  type="text"
                  value={formData.user_name}
                  onChange={handleChange}
                  className="w-full"
                  placeholder={t('enterName') || "Votre nom"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user_phone" className="text-sm">
                  {t('phone')}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="user_phone"
                    name="user_phone"
                    type="tel"
                    value={formData.user_phone}
                    onChange={handleChange}
                    className="w-full pl-10"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reimbursement Method */}
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
            <h3 className="text-base font-semibold flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              {t('reimbursementMethod')}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">
                  {t('reimbursementMethod')} *
                </Label>
                <Select
                  value={formData.reimbursement_method}
                  onValueChange={(value) => handleSelectChange("reimbursement_method", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('selectReimbursementMethod')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">{t('creditCard')}</SelectItem>
                    <SelectItem value="bank_transfer">{t('bankTransfer')}</SelectItem>
                    <SelectItem value="paypal">{t('paypal')}</SelectItem>
                    <SelectItem value="new_ticket">{t('newTicket')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.reimbursement_method === 'bank_transfer' && (
                <div className="space-y-2 p-4 bg-muted/10 rounded-md border border-muted">
                  <h4 className="text-sm font-medium mb-2">{t('bankDetails')}</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="bank_iban" className="text-xs">
                        {t('iban')} *
                      </Label>
                      <Input
                        id="bank_iban"
                        name="bank_iban"
                        value={formData.bank_iban}
                        onChange={handleChange}
                        placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                        className="w-full text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.reimbursement_method === 'paypal' && (
                <div className="space-y-2 p-4 bg-muted/10 rounded-md border border-muted">
                  <h4 className="text-sm font-medium mb-2">{t('paypalDetails')}</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="paypal_email" className="text-xs">
                        {t('paypalEmail')} *
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="paypal_email"
                          name="paypal_email"
                          type="email"
                          value={formData.paypal_email}
                          onChange={handleChange}
                          className="w-full pl-10 text-sm"
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {formData.reimbursement_method === 'credit_card' && (
                <div className="space-y-3 p-4 bg-muted/10 rounded-md border border-muted">
                  <h4 className="text-sm font-medium">{t('cardInformation')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="card_number" className="text-xs">
                        {t('cardNumber')} *
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="card_number"
                          name="card_number"
                          type="text"
                          value={formData.card_number}
                          onChange={handleChange}
                          className="w-full pl-10 text-sm"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="card_name" className="text-xs">
                        {t('cardName')} *
                      </Label>
                      <Input
                        id="card_name"
                        name="card_name"
                        type="text"
                        value={formData.card_name}
                        onChange={handleChange}
                        className="w-full text-sm"
                        placeholder={t('nameOnCardPlaceholder')}
                        required
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="card_expiry" className="text-xs">
                        {t('expiryDate')} *
                      </Label>
                      <Input
                        id="card_expiry"
                        name="card_expiry"
                        type="text"
                        value={formData.card_expiry}
                        onChange={handleChange}
                        className="w-full text-sm"
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="card_cvv" className="text-xs">
                        {t('cvv')} *
                      </Label>
                      <div className="relative">
                        <Input
                          id="card_cvv"
                          name="card_cvv"
                          type="text"
                          value={formData.card_cvv}
                          onChange={handleChange}
                          className="w-full text-sm"
                          placeholder="123"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-xs text-muted-foreground">CVV</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2 p-4 bg-muted/20 rounded-lg">
            <h3 className="text-base font-semibold">{t('additionalInformation')}</h3>
            <div className="space-y-2">
              <Label htmlFor="reimbursement_details" className="text-sm">
                {t('additionalDetails')}
              </Label>
              <Textarea
                id="reimbursement_details"
                name="reimbursement_details"
                value={formData.reimbursement_details}
                onChange={handleChange}
                rows={3}
                className="w-full text-sm"
                placeholder={t('additionalDetailsPlaceholder')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button 
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors duration-150 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-200" />
                    {t('submitting')}
                  </>
                ) : (
                  t('submitRequest')
                )}
              </Button>
            </div>
            
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReimbursementForm;
