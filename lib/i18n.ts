export type Language = "fr" | "en" | "es" | "pt" | "de"

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
]

export const translations = {
  fr: {
    // Navigation
    home: "Accueil",
    validation: "Validation",
    reimbursement: "Remboursement",
    tracking: "Suivi",
    start: "Commencer",

    // Homepage
    officialSecureService: "Service Officiel et Sécurisé",
    heroTitle: "Validation et Remboursement de",
    heroTitleHighlight: "Tickets de Recharge",
    heroSubtitle:
      "Service professionnel pour la validation et le remboursement de vos tickets Transcash, PCS, Neosurf, Google Play et plus encore.",
    validateTicket: "Valider un Ticket",
    requestReimbursement: "Demander un Remboursement",
    trackRequest: "Suivre ma Demande",
    secure100: "100% Sécurisé",
    fastProcessing: "Traitement Rapide",
    officialService: "Service Officiel",

    // Services
    ourServices: "Nos Services",
    servicesSubtitle: "Nous prenons en charge tous les types de tickets de recharge populaires",
    ticketValidation: "Validation de Tickets",
    ticketValidationDesc: "Vérifiez la validité et l'authenticité de vos tickets de recharge",
    reimbursementService: "Remboursement",
    reimbursementDesc: "Demandez le remboursement de vos tickets non utilisés ou défectueux",
    trackingService: "Suivi de Demande",
    trackingDesc: "Suivez l'état de vos demandes de validation ou de remboursement",
    supportedTickets: "Types de Tickets Supportés",

    // How it works
    howItWorks: "Comment ça marche ?",
    howItWorksSubtitle: "Un processus simple et sécurisé en 4 étapes",
    step1Title: "1. Soumettez votre ticket",
    step1Desc: "Remplissez le formulaire avec les informations de votre ticket de recharge",
    step2Title: "2. Vérification automatique",
    step2Desc: "Notre système vérifie automatiquement la validité et l'authenticité de votre ticket",
    step3Title: "3. Confirmation par email",
    step3Desc: "Vous recevez une confirmation par email avec les détails de votre demande",
    step4Title: "4. Traitement final",
    step4Desc: "Validation confirmée ou remboursement effectué selon votre demande",
    processingTime: "Traitement généralement effectué sous 24h",

    // Vigilance
    beVigilant: "Soyez Vigilant !",
    vigilanceMessage1: "Nous vous proposons un service de validation et de remboursement plus sûr et fiable pour plus de sécurité et pour éviter les nombreuses arnaques.",
    vigilanceMessage2: "En effet, nous avons reçu plusieurs plaintes concernant les recharges invalides ou non confirmées. Ainsi pour éviter tous ces problèmes nous vous conseillons d'activer vos recharges dès leurs achats.",

    // Forms
    ticketType: "Type de Ticket",
    ticketCode: "Code du Ticket",
    ticketAmount: "Montant du Ticket (€)",
    fullName: "Nom Complet",
    email: "Email",
    phone: "Téléphone (Optionnel)",
    required: "*",
    submit: "Soumettre",
    submitting: "Soumission en cours...",

    // Footer
    footerDescription:
      "Service professionnel et sécurisé pour la validation et le remboursement de tous vos tickets de recharge. Traitement rapide et fiable.",
    services: "Services",
    support: "Support",
    helpCenter: "Centre d'Aide",
    contactUs: "Nous Contacter",
    faq: "FAQ",
    allRightsReserved: "Tous droits réservés.",
    legalNotices: "Mentions Légales",
    privacy: "Confidentialité",
    terms: "CGU",
  },
  en: {
    // Navigation
    home: "Home",
    validation: "Validation",
    reimbursement: "Reimbursement",
    tracking: "Tracking",
    start: "Get Started",

    // Homepage
    officialSecureService: "Official and Secure Service",
    heroTitle: "Validation and Reimbursement of",
    heroTitleHighlight: "Recharge Tickets",
    heroSubtitle:
      "Professional service for validation and reimbursement of your Transcash, PCS, Neosurf, Google Play tickets and more.",
    validateTicket: "Validate a Ticket",
    requestReimbursement: "Request Reimbursement",
    trackRequest: "Track My Request",
    secure100: "100% Secure",
    fastProcessing: "Fast Processing",
    officialService: "Official Service",

    // Services
    ourServices: "Our Services",
    servicesSubtitle: "We support all popular types of recharge tickets",
    ticketValidation: "Ticket Validation",
    ticketValidationDesc: "Verify the validity and authenticity of your recharge tickets",
    reimbursementService: "Reimbursement",
    reimbursementDesc: "Request reimbursement for your unused or defective tickets",
    trackingService: "Request Tracking",
    trackingDesc: "Track the status of your validation or reimbursement requests",
    supportedTickets: "Supported Ticket Types",

    // How it works
    howItWorks: "How it works?",
    howItWorksSubtitle: "A simple and secure 4-step process",
    step1Title: "1. Submit your ticket",
    step1Desc: "Fill out the form with your recharge ticket information",
    step2Title: "2. Automatic verification",
    step2Desc: "Our system automatically verifies the validity and authenticity of your ticket",
    step3Title: "3. Email confirmation",
    step3Desc: "You receive an email confirmation with the details of your request",
    step4Title: "4. Final processing",
    step4Desc: "Validation confirmed or reimbursement processed according to your request",
    processingTime: "Processing usually completed within 24h",

    // Vigilance
    beVigilant: "Be Vigilant!",
    vigilanceMessage1: "We offer a safer and more reliable validation and reimbursement service to enhance security and prevent fraud.",
    vigilanceMessage2: "We have received several complaints about invalid or unconfirmed recharges. To avoid these issues, we recommend activating your recharges immediately upon purchase.",

    // Forms
    ticketType: "Ticket Type",
    ticketCode: "Ticket Code",
    ticketAmount: "Ticket Amount (€)",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone (Optional)",
    required: "*",
    submit: "Submit",
    submitting: "Submitting...",

    // Footer
    footerDescription:
      "Professional and secure service for validation and reimbursement of all your recharge tickets. Fast and reliable processing.",
    services: "Services",
    support: "Support",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    faq: "FAQ",
    allRightsReserved: "All rights reserved.",
    legalNotices: "Legal Notices",
    privacy: "Privacy",
    terms: "Terms",
  },
  es: {
    // Navigation
    home: "Inicio",
    validation: "Validación",
    reimbursement: "Reembolso",
    tracking: "Seguimiento",
    start: "Comenzar",

    // Homepage
    officialSecureService: "Servicio Oficial y Seguro",
    heroTitle: "Validación y Reembolso de",
    heroTitleHighlight: "Tickets de Recarga",
    heroSubtitle:
      "Servicio profesional para la validación y reembolso de sus tickets Transcash, PCS, Neosurf, Google Play y más.",
    validateTicket: "Validar un Ticket",
    requestReimbursement: "Solicitar Reembolso",
    trackRequest: "Seguir mi Solicitud",
    secure100: "100% Seguro",
    fastProcessing: "Procesamiento Rápido",
    officialService: "Servicio Oficial",

    // Services
    ourServices: "Nuestros Servicios",
    servicesSubtitle: "Admitimos todos los tipos populares de tickets de recarga",
    ticketValidation: "Validación de Tickets",
    ticketValidationDesc: "Verifique la validez y autenticidad de sus tickets de recarga",
    reimbursementService: "Reembolso",
    reimbursementDesc: "Solicite el reembolso de sus tickets no utilizados o defectuosos",
    trackingService: "Seguimiento de Solicitud",
    trackingDesc: "Siga el estado de sus solicitudes de validación o reembolso",
    supportedTickets: "Tipos de Tickets Admitidos",

    // How it works
    howItWorks: "¿Cómo funciona?",
    howItWorksSubtitle: "Un proceso simple y seguro en 4 pasos",
    step1Title: "1. Envíe su ticket",
    step1Desc: "Complete el formulario con la información de su ticket de recarga",
    step2Title: "2. Verificación automática",
    step2Desc: "Nuestro sistema verifica automáticamente la validez y autenticidad de su ticket",
    step3Title: "3. Confirmación por email",
    step3Desc: "Recibe una confirmación por email con los detalles de su solicitud",
    step4Title: "4. Procesamiento final",
    step4Desc: "Validación confirmada o reembolso procesado según su solicitud",
    processingTime: "Procesamiento generalmente completado en 24h",

    // Forms
    ticketType: "Tipo de Ticket",
    ticketCode: "Código del Ticket",
    ticketAmount: "Monto del Ticket (€)",
    fullName: "Nombre Completo",
    email: "Email",
    phone: "Teléfono (Opcional)",
    required: "*",
    submit: "Enviar",
    submitting: "Enviando...",

    // Footer
    footerDescription:
      "Servicio profesional y seguro para la validación y reembolso de todos sus tickets de recarga. Procesamiento rápido y confiable.",
    services: "Servicios",
    support: "Soporte",
    helpCenter: "Centro de Ayuda",
    contactUs: "Contáctanos",
    faq: "FAQ",
    allRightsReserved: "Todos los derechos reservados.",
    legalNotices: "Avisos Legales",
    privacy: "Privacidad",
    terms: "Términos",
  },
  pt: {
    // Navigation
    home: "Início",
    validation: "Validação",
    reimbursement: "Reembolso",
    tracking: "Rastreamento",
    start: "Começar",

    // Homepage
    officialSecureService: "Serviço Oficial e Seguro",
    heroTitle: "Validação e Reembolso de",
    heroTitleHighlight: "Tickets de Recarga",
    heroSubtitle:
      "Serviço profissional para validação e reembolso dos seus tickets Transcash, PCS, Neosurf, Google Play e mais.",
    validateTicket: "Validar um Ticket",
    requestReimbursement: "Solicitar Reembolso",
    trackRequest: "Rastrear minha Solicitação",
    secure100: "100% Seguro",
    fastProcessing: "Processamento Rápido",
    officialService: "Serviço Oficial",

    // Services
    ourServices: "Nossos Serviços",
    servicesSubtitle: "Suportamos todos os tipos populares de tickets de recarga",
    ticketValidation: "Validação de Tickets",
    ticketValidationDesc: "Verifique a validade e autenticidade dos seus tickets de recarga",
    reimbursementService: "Reembolso",
    reimbursementDesc: "Solicite o reembolso dos seus tickets não utilizados ou defeituosos",
    trackingService: "Rastreamento de Solicitação",
    trackingDesc: "Acompanhe o status das suas solicitações de validação ou reembolso",
    supportedTickets: "Tipos de Tickets Suportados",

    // How it works
    howItWorks: "Como funciona?",
    howItWorksSubtitle: "Um processo simples e seguro em 4 etapas",
    step1Title: "1. Envie seu ticket",
    step1Desc: "Preencha o formulário com as informações do seu ticket de recarga",
    step2Title: "2. Verificação automática",
    step2Desc: "Nosso sistema verifica automaticamente a validade e autenticidade do seu ticket",
    step3Title: "3. Confirmação por email",
    step3Desc: "Você recebe uma confirmação por email com os detalhes da sua solicitação",
    step4Title: "4. Processamento final",
    step4Desc: "Validação confirmada ou reembolso processado conforme sua solicitação",
    processingTime: "Processamento geralmente concluído em 24h",

    // Forms
    ticketType: "Tipo de Ticket",
    ticketCode: "Código do Ticket",
    ticketAmount: "Valor do Ticket (€)",
    fullName: "Nome Completo",
    email: "Email",
    phone: "Telefone (Opcional)",
    required: "*",
    submit: "Enviar",
    submitting: "Enviando...",

    // Footer
    footerDescription:
      "Serviço profissional e seguro para validação e reembolso de todos os seus tickets de recarga. Processamento rápido e confiável.",
    services: "Serviços",
    support: "Suporte",
    helpCenter: "Central de Ajuda",
    contactUs: "Entre em Contato",
    faq: "FAQ",
    allRightsReserved: "Todos os direitos reservados.",
    legalNotices: "Avisos Legais",
    privacy: "Privacidade",
    terms: "Termos",
  },
  de: {
    // Navigation
    home: "Startseite",
    validation: "Validierung",
    reimbursement: "Erstattung",
    tracking: "Verfolgung",
    start: "Loslegen",

    // Homepage
    officialSecureService: "Offizieller und Sicherer Service",
    heroTitle: "Validierung und Erstattung von",
    heroTitleHighlight: "Auflade-Tickets",
    heroSubtitle:
      "Professioneller Service für die Validierung und Erstattung Ihrer Transcash, PCS, Neosurf, Google Play Tickets und mehr.",
    validateTicket: "Ticket Validieren",
    requestReimbursement: "Erstattung Beantragen",
    trackRequest: "Meine Anfrage Verfolgen",
    secure100: "100% Sicher",
    fastProcessing: "Schnelle Bearbeitung",
    officialService: "Offizieller Service",

    // Services
    ourServices: "Unsere Dienstleistungen",
    servicesSubtitle: "Wir unterstützen alle beliebten Arten von Auflade-Tickets",
    ticketValidation: "Ticket-Validierung",
    ticketValidationDesc: "Überprüfen Sie die Gültigkeit und Echtheit Ihrer Auflade-Tickets",
    reimbursementService: "Erstattung",
    reimbursementDesc: "Beantragen Sie die Erstattung Ihrer ungenutzten oder defekten Tickets",
    trackingService: "Anfrage-Verfolgung",
    trackingDesc: "Verfolgen Sie den Status Ihrer Validierungs- oder Erstattungsanfragen",
    supportedTickets: "Unterstützte Ticket-Typen",

    // How it works
    howItWorks: "Wie funktioniert es?",
    howItWorksSubtitle: "Ein einfacher und sicherer 4-Schritte-Prozess",
    step1Title: "1. Ticket einreichen",
    step1Desc: "Füllen Sie das Formular mit den Informationen Ihres Auflade-Tickets aus",
    step2Title: "2. Automatische Überprüfung",
    step2Desc: "Unser System überprüft automatisch die Gültigkeit und Echtheit Ihres Tickets",
    step3Title: "3. E-Mail-Bestätigung",
    step3Desc: "Sie erhalten eine E-Mail-Bestätigung mit den Details Ihrer Anfrage",
    step4Title: "4. Finale Bearbeitung",
    step4Desc: "Validierung bestätigt oder Erstattung gemäß Ihrer Anfrage bearbeitet",
    processingTime: "Bearbeitung normalerweise innerhalb von 24h abgeschlossen",

    // Wachsamkeit
    beVigilant: "Seien Sie wachsam!",
    vigilanceMessage1: "Wir bieten einen sichereren und zuverlässigeren Validierungs- und Rückerstattungsservice für mehr Sicherheit und zur Betrugsprävention an.",
    vigilanceMessage2: "Tatsächlich haben wir mehrere Beschwerden über ungültige oder nicht bestätigte Aufladungen erhalten. Um diese Probleme zu vermeiden, empfehlen wir Ihnen, Ihre Aufladungen sofort nach dem Kauf zu aktivieren.",

    // Forms
    ticketType: "Ticket-Typ",
    ticketCode: "Ticket-Code",
    ticketAmount: "Ticket-Betrag (€)",
    fullName: "Vollständiger Name",
    email: "E-Mail",
    phone: "Telefon (Optional)",
    required: "*",
    submit: "Senden",
    submitting: "Wird gesendet...",

    // Footer
    footerDescription:
      "Professioneller und sicherer Service für die Validierung und Erstattung aller Ihrer Auflade-Tickets. Schnelle und zuverlässige Bearbeitung.",
    services: "Dienstleistungen",
    support: "Support",
    helpCenter: "Hilfe-Center",
    contactUs: "Kontaktieren Sie uns",
    faq: "FAQ",
    allRightsReserved: "Alle Rechte vorbehalten.",
    legalNotices: "Rechtliche Hinweise",
    privacy: "Datenschutz",
    terms: "AGB",
  },
}

export function getTranslation(language: Language, key: string): string {
  const keys = key.split(".")
  let value: any = translations[language]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
