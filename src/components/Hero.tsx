export default function Hero() {
  return (
    <section className="min-h-screen animated-gradient flex items-center justify-center px-4 relative overflow-hidden">

      {/* Cercles décoratifs flous en arrière-plan */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Photo avec effet flottant et lueur */}
        <div className="mb-8 flex justify-center animate-fade-in-up">
          <div className="animate-float">
            <img
              src="/Photo Avatar Yannick.png"
              alt="Yannick Lebec"
              className="w-56 h-56 rounded-full object-cover border-4 border-violet-500/60 animate-glow"
            />
          </div>
        </div>

        {/* Badge disponibilité */}
        <div className="animate-fade-in-up delay-100 flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-900/40 border border-violet-500/30 text-violet-300 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Disponible pour de nouvelles opportunités
          </span>
        </div>

        {/* Nom */}
        <h1 className="animate-fade-in-up delay-200 text-5xl sm:text-6xl font-bold text-white mb-3">
          Yannick Lebec
        </h1>

        {/* Titre avec dégradé */}
        <p className="animate-fade-in-up delay-300 text-2xl font-semibold gradient-text mb-6">
          Développeur Full Stack
        </p>

        {/* Description */}
        <p className="animate-fade-in-up delay-400 text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Passionné par la création d'applications web modernes avec Go et React.
          Je construis des solutions robustes et performantes.
        </p>

        {/* Boutons */}
        <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-500 transition-all hover:scale-105 shadow-lg shadow-violet-500/25"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:border-violet-500 hover:text-white transition-all hover:scale-105"
          >
            Me contacter
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-8 py-3 border border-violet-500/50 text-violet-300 rounded-xl font-semibold hover:bg-violet-500/20 hover:text-white transition-all hover:scale-105 flex items-center gap-2 justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Télécharger mon CV
          </a>
        </div>

        {/* Flèche animée vers le bas */}
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
