"use client"
import { Shield, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-blue-950 border-t border-blue-100 dark:border-blue-900 py-8">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-7 w-7 text-blue-600" />
          <span className="text-2xl font-extrabold text-blue-950 dark:text-white tracking-tight">RechargeSecure</span>
        </div>
        <p className="text-base text-blue-900 dark:text-blue-100 font-medium mb-4 max-w-xl">
          Service professionnel et sécurisé pour la validation et le remboursement de tous vos tickets de recharge. Traitement rapide et fiable.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-4 text-blue-800 dark:text-blue-200">
          <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@rechargesecure.com</span>
          <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +48 22 123 45 67</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Varsovie, Pologne</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-4 text-sm text-blue-700 dark:text-blue-300 font-semibold">
          <span>Validation de Tickets</span>
          <span>Remboursement</span>
          <span>Suivi de Demande</span>
          <span>Support</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-4 text-xs text-blue-600 dark:text-blue-400">
          <span>Centre d'Aide</span>
          <span>Nous Contacter</span>
          <span>FAQ</span>
        </div>
        <div className="w-full border-t border-blue-100 dark:border-blue-900 my-4" />
        <div className="flex flex-col md:flex-row justify-between items-center w-full text-xs text-blue-700 dark:text-blue-300">
          <span>© 2024 RechargeSecure. Tous droits réservés.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span>Mentions Légales</span>
            <span>Confidentialité</span>
            <span>CGU</span>
          </div>

        </div>
      </div>
    </footer>
  )
}
