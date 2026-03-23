// App.tsx : point d'entrée du routing React
// React Router gère la navigation entre les pages sans rechargement :
//   / → page d'accueil (portfolio public)
//   /admin/login → page de connexion admin
//   /admin → dashboard admin (protégé par JWT)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'

export default function App() {
  return (
    // BrowserRouter active le système de navigation par URL
    <BrowserRouter>
      <Routes>
        {/* Route publique : page d'accueil du portfolio */}
        <Route path="/" element={<Home />} />

        {/* Route publique : connexion admin */}
        <Route path="/admin/login" element={<Login />} />

        {/* Route admin : dashboard (la page elle-même vérifie le token) */}
        <Route path="/admin" element={<Admin />} />

        {/* Toute URL inconnue redirige vers l'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
