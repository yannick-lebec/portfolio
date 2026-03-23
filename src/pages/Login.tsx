// Login : page de connexion admin
// Accessible sur /admin/login — les visiteurs normaux ne voient jamais cette page
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/client'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // useNavigate permet de rediriger l'utilisateur vers une autre page
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    // preventDefault empêche le rechargement de la page (comportement par défaut d'un form HTML)
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // On appelle notre API Go : POST /api/admin/login
      const token = await login(password)

      // On stocke le token JWT dans le localStorage du navigateur
      // Il sera envoyé automatiquement dans les requêtes admin (voir api/client.ts)
      localStorage.setItem('admin_token', token)

      // Redirection vers le dashboard admin
      navigate('/admin')
    } catch {
      setError('Mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Carte de connexion */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">Admin</h1>
          <p className="text-gray-400 text-center mb-8">Accès réservé</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe admin"
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-500"
              />
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Lien retour */}
        <p className="text-center mt-6">
          <a href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Retour au portfolio
          </a>
        </p>
      </div>
    </div>
  )
}
