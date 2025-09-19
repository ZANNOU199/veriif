import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TicketType } from "@/lib/types"

type CommonFieldsProps = {
  formData: {
    ticket_type: TicketType
    ticket_code: string
    ticket_amount: number | string
    user_email: string
    user_phone?: string
    user_name: string
  }
  onFieldChange: (field: string, value: any) => void
  t: (key: string) => string
}

export const CommonFormFields = ({ formData, onFieldChange, t }: CommonFieldsProps) => {
  const ticketTypes = [
    { value: 'transcash', label: 'Transcash' },
    { value: 'pcs', label: 'PCS' },
    { value: 'neosurf', label: 'Neosurf' },
    { value: 'paysafecard', label: 'Paysafecard' },
    { value: 'teneo', label: 'Teneo' },
    { value: 'cashlib', label: 'Cashlib' },
    { value: 'google_play', label: 'Google Play' },
    { value: 'apple_store', label: 'Apple Store' },
    { value: 'steam', label: 'Steam' },
    { value: 'amazon', label: 'Amazon' },
  ]

  return (
    <>
      {/* Ticket Type */}
      <div className="space-y-2">
        <Label htmlFor="ticket-type">{t('ticketType')} *</Label>
        <Select
          value={formData.ticket_type}
          onValueChange={(value) => onFieldChange('ticket_type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('selectTicketType')} />
          </SelectTrigger>
          <SelectContent>
            {ticketTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ticket Code */}
      <div className="space-y-2">
        <Label htmlFor="ticket-code">{t('ticketCode')} *</Label>
        <Input
          id="ticket-code"
          type="text"
          placeholder={t('enterTicketCode')}
          value={formData.ticket_code}
          onChange={(e) => onFieldChange('ticket_code', e.target.value)}
          required
          className="font-mono"
        />
        <p className="text-sm text-muted-foreground">
          {t('ticketCodeHelp')}
        </p>
      </div>

      {/* Ticket Amount */}
      <div className="space-y-2">
        <Label htmlFor="ticket-amount">{t('ticketAmount')} *</Label>
        <Input
          id="ticket-amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.ticket_amount || ""}
          onChange={(e) => onFieldChange('ticket_amount', e.target.value ? Number.parseFloat(e.target.value) : '')}
          required
        />
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="user-name">{t('fullName')} *</Label>
          <Input
            id="user-name"
            type="text"
            placeholder={t('enterYourName')}
            value={formData.user_name}
            onChange={(e) => onFieldChange('user_name', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="user-email">{t('email')} *</Label>
          <Input
            id="user-email"
            type="email"
            placeholder={t('enterYourEmail')}
            value={formData.user_email}
            onChange={(e) => onFieldChange('user_email', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Phone (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="user-phone">{t('phone')}</Label>
        <Input
          id="user-phone"
          type="tel"
          placeholder={t('enterYourPhone')}
          value={formData.user_phone || ''}
          onChange={(e) => onFieldChange('user_phone', e.target.value)}
        />
      </div>
    </>
  )
}
