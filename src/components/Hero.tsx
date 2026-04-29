export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: '#050d1a' }}>

      {/* Photo de fond serveur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/serveur_futuriste.png')" }}
      />

      {/* Pattern circuit board en arrière-plan */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="1.5" fill="#22d3ee" />
            <circle cx="0"  cy="0"  r="1"   fill="#22d3ee" />
            <circle cx="80" cy="0"  r="1"   fill="#22d3ee" />
            <circle cx="0"  cy="80" r="1"   fill="#22d3ee" />
            <circle cx="80" cy="80" r="1"   fill="#22d3ee" />
            <line x1="0"  y1="40" x2="40" y2="40" stroke="#22d3ee" strokeWidth="0.4" />
            <line x1="40" y1="0"  x2="40" y2="40" stroke="#22d3ee" strokeWidth="0.4" />
            <line x1="40" y1="40" x2="80" y2="40" stroke="#22d3ee" strokeWidth="0.4" opacity="0.5" />
            <line x1="40" y1="40" x2="40" y2="80" stroke="#22d3ee" strokeWidth="0.4" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Halos lumineux */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* ── Icônes réseau flottantes (droite) ── */}

      {/* Cloud */}
      <div className="absolute top-1/4 right-[8%] animate-float-slow opacity-40 hidden lg:block">
        <svg width="90" height="70" viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="88" height="68" rx="8" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
          <path d="M25 42 Q25 30 35 30 Q36 22 45 22 Q55 22 57 30 Q65 29 65 38 Q65 45 57 45 L33 45 Q25 45 25 42Z" stroke="#22d3ee" strokeWidth="1.5" fill="rgba(6,182,212,0.08)" />
          <line x1="40" y1="50" x2="40" y2="60" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="52" y1="52" x2="58" y2="60" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="28" y1="52" x2="22" y2="60" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="40" cy="63" r="2.5" fill="#22d3ee" opacity="0.7" />
          <circle cx="58" cy="63" r="2.5" fill="#22d3ee" opacity="0.7" />
          <circle cx="22" cy="63" r="2.5" fill="#22d3ee" opacity="0.7" />
        </svg>
      </div>

      {/* Ping stats */}
      <div className="absolute top-[18%] right-[6%] hidden lg:block opacity-35 font-mono text-xs text-cyan-400 leading-relaxed">
        <p>ping 192.168.1.1</p>
        <p>Reply from 192.168.1.1:</p>
        <p>bytes=32 time&lt;1ms TTL=64</p>
      </div>

      {/* Serveur / switch */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[6%] animate-float opacity-35 hidden lg:block" style={{ animationDelay: '1s' }}>
        <svg width="70" height="80" viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[0, 22, 44].map((y) => (
            <g key={y}>
              <rect x="2" y={y + 2} width="66" height="16" rx="3" stroke="#22d3ee" strokeWidth="1.2" fill="rgba(6,182,212,0.06)" />
              <circle cx="12" cy={y + 10} r="2.5" fill="#22d3ee" opacity="0.8" />
              <line x1="20" y1={y + 7} x2="50" y2={y + 7} stroke="#22d3ee" strokeWidth="0.8" opacity="0.5" />
              <line x1="20" y1={y + 13} x2="44" y2={y + 13} stroke="#22d3ee" strokeWidth="0.8" opacity="0.3" />
            </g>
          ))}
          <line x1="35" y1="66" x2="35" y2="76" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="35" cy="78" r="2" fill="#22d3ee" opacity="0.6" />
        </svg>
      </div>

      {/* Terminal commands */}
      <div className="absolute bottom-[22%] right-[5%] hidden lg:block opacity-30 font-mono text-xs text-green-400 leading-loose">
        <p><span className="text-cyan-500">{'>'}</span> systemctl status nginx</p>
        <p><span className="text-cyan-500">{'>'}</span> sudo ufw status</p>
        <p><span className="text-cyan-500">{'>'}</span> ip a</p>
        <p><span className="text-cyan-500">{'>'}</span> df -h</p>
      </div>

      {/* Bouclier */}
      <div className="absolute bottom-[28%] right-[9%] animate-float-slow opacity-35 hidden lg:block" style={{ animationDelay: '2s' }}>
        <svg width="60" height="68" viewBox="0 0 60 68" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 3 L55 14 L55 36 C55 50 42 62 30 66 C18 62 5 50 5 36 L5 14 Z" stroke="#22d3ee" strokeWidth="1.5" fill="rgba(6,182,212,0.08)" />
          <path d="M20 34 L27 41 L40 28" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ── Contenu principal ── */}
      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Photo */}
        <div className="mb-8 flex justify-center animate-fade-in-up">
          <div className="animate-float">
            <img
              src="/Photo Avatar Yannick.png"
              alt="Yannick Le Bec"
              className="w-52 h-52 rounded-full object-cover border-4 border-cyan-400/70 animate-glow"
            />
          </div>
        </div>

        {/* Badge disponibilité */}
        <div className="animate-fade-in-up delay-100 flex justify-center mb-5">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900/60 border border-cyan-500/30 text-white rounded-full text-sm backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" />
            Disponible pour une alternance en Systèmes & Réseaux
          </span>
        </div>

        {/* Nom */}
        <h1 className="animate-fade-in-up delay-200 text-5xl sm:text-6xl font-bold text-white mb-4">
          Yannick Le Bec
        </h1>

        {/* Titre double */}
        <div className="animate-fade-in-up delay-300 mb-7 space-y-1">
          <p className="text-2xl font-bold text-cyan-400">
            Alternant Technicien Systèmes & Réseaux
          </p>
          <p className="text-xl font-semibold text-cyan-300/75">
            Développeur Full Stack
          </p>
        </div>

        {/* Description */}
        <p className="animate-fade-in-up delay-400 text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Passionné par l'infrastructure, les réseaux et la cybersécurité.<br className="hidden sm:block" />
          J'assure la gestion, l'administration et la sécurisation des systèmes<br className="hidden sm:block" />
          tout en développant des applications web modernes et performantes.
        </p>

        {/* Boutons */}
        <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8" />
            </svg>
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 px-8 py-3 border border-slate-500 text-white rounded-xl font-semibold hover:border-cyan-500 hover:text-cyan-300 transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Me contacter
          </a>
          <a
            href="/cv.pdf"
            download
            className="flex items-center justify-center gap-2 px-8 py-3 border border-slate-500 text-white rounded-xl font-semibold hover:border-cyan-500 hover:text-cyan-300 transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Télécharger mon CV
          </a>
        </div>

        {/* Flèche animée */}
        <div className="animate-fade-in-up delay-600 mt-16">
          <a href="#about" className="inline-block animate-bounce">
            <svg className="w-6 h-6 text-slate-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
