import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo avec dégradé */}
          <Link to="/" className="font-bold text-xl text-white hover:text-violet-400 transition-colors duration-300">
            <span className="gradient-text">YLB</span>
            <span className="text-slate-300 ml-2 font-normal text-base hidden sm:inline">Yannick Le Bec</span>
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              <>
                <a href="#about"    className="text-slate-400 hover:text-white transition-colors text-sm">À propos</a>
                <a href="#projects" className="text-slate-400 hover:text-white transition-colors text-sm">Projets</a>
                <a href="#contact"  className="text-slate-400 hover:text-white transition-colors text-sm">Contact</a>
              </>
            ) : (
              <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm">Accueil</Link>
            )}
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3 border-t border-slate-800/50 pt-4">
            <a href="#about"    className="text-slate-400 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>À propos</a>
            <a href="#projects" className="text-slate-400 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Projets</a>
            <a href="#contact"  className="text-slate-400 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </div>
    </nav>
  )
}
