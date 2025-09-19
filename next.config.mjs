/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activation de l'export statique
  output: 'export',
  
  // Désactivation de la vérification ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Désactivation des erreurs TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuration des images pour l'export statique
  images: {
    unoptimized: true,
  },
  
  // Configuration des redirections si nécessaire
  async redirects() {
    return [];
  },
  
  // Configuration des réécritures si nécessaire
  async rewrites() {
    return [];
  },
}

export default nextConfig
