export default function LegalFooter() {
  return (
    <footer className="w-full text-center text-xs text-gray-500 py-4 border-t mt-8">
      <div>
        &copy; {new Date().getFullYear()} RechargeSecure. Tous droits réservés.<br />
        Site protégé. Toute reproduction interdite. <br />
        <a href="/" className="text-blue-600 hover:underline">www.rechargesecure.com</a>
      </div>
    </footer>
  );
}
