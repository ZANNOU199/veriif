"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type Language = 'fr' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traductions
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Header
    'home': 'Accueil',
    'reimbursement': 'Remboursement',
    'tracking': 'Suivi',
    'validation': 'Validation',
    'language': 'Langue',
    
    // Reimbursement Form
    'ticketType': 'Type de ticket',
    'ticketCode': 'Code du ticket',
    'amount': 'Montant',
    'fullName': 'Nom complet',
    'email': 'Email',
    'phone': 'Téléphone',
    'reimbursementMethod': 'Méthode de remboursement',
    'creditCard': 'Carte de crédit',
    'bankTransfer': 'Virement bancaire',
    'paypal': 'PayPal',
    'newTicket': 'Nouveau ticket',
    'cardNumber': 'Numéro de carte',
    'cardName': 'Nom sur la carte',
    'expiryDate': 'Date d\'expiration',
    'cvv': 'CVV',
    'additionalDetails': 'Détails supplémentaires',
    'submit': 'Soumettre',
    'submitting': 'Envoi en cours...',
    
    // Validation messages
    'requiredField': 'Ce champ est requis',
    'invalidEmail': 'Email invalide',
    'invalidPhone': 'Numéro de téléphone invalide',
    'invalidCardNumber': 'Numéro de carte invalide',
    'invalidExpiryDate': 'Date d\'expiration invalide',
    'invalidCVV': 'CVV invalide',
    
    // Home Page
    'secureService': 'Service 100% Sécurisé',
    'heroTitle': 'Validation et Remboursement de Tickets de Recharge',
    'heroSubtitle': 'Service professionnel pour la validation et le remboursement de vos tickets Transcash, PCS, Neosurf et plus encore.',
    'validateTicket': 'Valider un ticket',
    'requestReimbursement': 'Demander un remboursement',
    'beVigilant': 'Soyez Vigilant !',
    'vigilanceMessage1': 'Nous vous proposons un service de validation et de remboursement plus sûr et fiable pour plus de sécurité et pour éviter les nombreuses arnaques.',
    'vigilanceMessage2': 'En effet, nous avons reçu plusieurs plaintes concernant les recharges invalides ou non confirmés. Ainsi pour éviter tous ces problèmes nous vous conseillons d\'activer vos recharges dès leurs achats.',
    'secure100': '100% Sécurisé',
    'secure100Desc': 'Vos informations et transactions sont protégées par un chiffrement avancé.',
    'fastProcessing': 'Traitement Rapide',
    'fastProcessingDesc': 'Validation et remboursement traités en moins de 24h ouvrées.',
    'officialService': 'Service Officiel',
    'officialServiceDesc': 'Service agréé et partenaire officiel des principaux émetteurs de cartes.'
  },
  en: {
    // Header
    'home': 'Home',
    'reimbursement': 'Reimbursement',
    'tracking': 'Tracking',
    'validation': 'Validation',
    'language': 'Language',
    
    // Reimbursement Form
    'ticketType': 'Ticket Type',
    'ticketCode': 'Ticket Code',
    'amount': 'Amount',
    'fullName': 'Full Name',
    'email': 'Email',
    'phone': 'Phone',
    'reimbursementMethod': 'Reimbursement Method',
    'creditCard': 'Credit Card',
    'bankTransfer': 'Bank Transfer',
    'paypal': 'PayPal',
    'newTicket': 'New Ticket',
    'cardNumber': 'Card Number',
    'cardName': 'Name on Card',
    'expiryDate': 'Expiry Date',
    'cvv': 'CVV',
    'additionalDetails': 'Additional Details',
    'submit': 'Submit',
    'submitting': 'Submitting...',
    
    // Validation messages
    'requiredField': 'This field is required',
    'invalidEmail': 'Invalid email',
    'invalidPhone': 'Invalid phone number',
    'invalidCardNumber': 'Invalid card number',
    'invalidExpiryDate': 'Invalid expiry date',
    'invalidCVV': 'Invalid CVV',
    
    // Home Page
    'secureService': '100% Secure Service',
    'heroTitle': 'Voucher Validation and Reimbursement',
    'heroSubtitle': 'Professional service for validating and reimbursing your Transcash, PCS, Neosurf vouchers and more.',
    'validateTicket': 'Validate a Ticket',
    'requestReimbursement': 'Request Reimbursement',
    'beVigilant': 'Be Vigilant!',
    'vigilanceMessage1': 'We offer a safer and more reliable validation and reimbursement service for enhanced security and to prevent fraud.',
    'vigilanceMessage2': 'Indeed, we have received several complaints about invalid or unconfirmed top-ups. To avoid these issues, we recommend activating your top-ups immediately after purchase.',
    'secure100': '100% Secure',
    'secure100Desc': 'Your information and transactions are protected by advanced encryption.',
    'fastProcessing': 'Fast Processing',
    'fastProcessingDesc': 'Validation and reimbursement processed in less than 24 business hours.',
    'officialService': 'Official Service',
    'officialServiceDesc': 'Licensed service and official partner of major card issuers.'
  },
  es: {
    // Header
    'home': 'Inicio',
    'reimbursement': 'Reembolso',
    'tracking': 'Seguimiento',
    'validation': 'Validación',
    'language': 'Idioma',
    
    // Reimbursement Form
    'ticketType': 'Tipo de ticket',
    'ticketCode': 'Código del ticket',
    'amount': 'Cantidad',
    'fullName': 'Nombre completo',
    'email': 'Correo electrónico',
    'phone': 'Teléfono',
    'reimbursementMethod': 'Método de reembolso',
    'creditCard': 'Tarjeta de crédito',
    'bankTransfer': 'Transferencia bancaria',
    'paypal': 'PayPal',
    'newTicket': 'Nuevo ticket',
    'cardNumber': 'Número de tarjeta',
    'cardName': 'Nombre en la tarjeta',
    'expiryDate': 'Fecha de vencimiento',
    'cvv': 'CVV',
    'additionalDetails': 'Detalles adicionales',
    'submit': 'Enviar',
    'submitting': 'Enviando...',
    
    // Validation messages
    'requiredField': 'Este campo es obligatorio',
    'invalidEmail': 'Correo electrónico inválido',
    'invalidPhone': 'Número de teléfono inválido',
    'invalidCardNumber': 'Número de tarjeta inválido',
    'invalidExpiryDate': 'Fecha de vencimiento inválida',
    'invalidCVV': 'CVV inválido',
    
    // Home Page
    'secureService': 'Servicio 100% Seguro',
    'heroTitle': 'Validación y Reembolso de Vales de Recarga',
    'heroSubtitle': 'Servicio profesional para la validación y reembolso de sus vales Transcash, PCS, Neosurf y más.',
    'validateTicket': 'Validar un vale',
    'requestReimbursement': 'Solicitar reembolso',
    'beVigilant': '¡Esté atento!',
    'vigilanceMessage1': 'Le ofrecemos un servicio de validación y reembolso más seguro y confiable para mayor seguridad y para evitar estafas.',
    'vigilanceMessage2': 'De hecho, hemos recibido varias quejas sobre recargas inválidas o no confirmadas. Para evitar estos problemas, le recomendamos activar sus recargas inmediatamente después de la compra.',
    'secure100': '100% Seguro',
    'secure100Desc': 'Su información y transacciones están protegidas por cifrado avanzado.',
    'fastProcessing': 'Procesamiento Rápido',
    'fastProcessingDesc': 'Validación y reembolso procesados en menos de 24 horas hábiles.',
    'officialService': 'Servicio Oficial',
    'officialServiceDesc': 'Servicio autorizado y socio oficial de los principales emisores de tarjetas.'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  
  // Fonction de traduction
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
