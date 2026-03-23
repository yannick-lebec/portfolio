export default function About() {
  const skills = [
    { name: 'Go',         color: 'bg-cyan-900/50 text-cyan-300 border-cyan-700/50' },
    { name: 'React',      color: 'bg-blue-900/50 text-blue-300 border-blue-700/50' },
    { name: 'TypeScript', color: 'bg-indigo-900/50 text-indigo-300 border-indigo-700/50' },
    { name: 'PostgreSQL', color: 'bg-sky-900/50 text-sky-300 border-sky-700/50' },
    { name: 'Docker',     color: 'bg-blue-900/50 text-blue-300 border-blue-700/50' },
    { name: 'Git',        color: 'bg-orange-900/50 text-orange-300 border-orange-700/50' },
    { name: 'REST API',   color: 'bg-violet-900/50 text-violet-300 border-violet-700/50' },
    { name: 'GORM',       color: 'bg-purple-900/50 text-purple-300 border-purple-700/50' },
  ]

  const parcours = [
    {
      periode: 'Sept. 2025 – aujourd\'hui',
      titre: 'Formation Développeur Web Full Stack',
      lieu: 'Ada Tech School · Paris',
      color: 'border-violet-500',
      dot: 'bg-violet-500',
    },
    {
      periode: '2012 – 2025',
      titre: 'Chef d\'équipe',
      lieu: 'Art-toit',
      color: 'border-slate-600',
      dot: 'bg-slate-500',
    },
    {
      periode: '2008 – 2012',
      titre: 'Gérant fondateur',
      lieu: 'Mon entreprise de couverture',
      color: 'border-slate-600',
      dot: 'bg-slate-500',
    },
    {
      periode: '2003 – 2008',
      titre: 'Couvreur salarié',
      lieu: 'Entreprise de couverture',
      color: 'border-slate-600',
      dot: 'bg-slate-500',
    },
    {
      periode: '2001 – 2003',
      titre: 'Formation · BEP Couverture',
      lieu: 'Compagnons du Devoir',
      color: 'border-slate-600',
      dot: 'bg-slate-500',
    },
  ]

  return (
    <section id="about" className="bg-slate-900 py-24 px-4 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 font-medium mb-2 text-sm uppercase tracking-widest">Qui suis-je ?</p>
          <h2 className="text-3xl font-bold text-white">À propos de moi</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Texte + Stats */}
          <div className="space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              Après <span className="text-white font-semibold">25 ans dans le BTP</span> — dont
              4 ans à la tête de ma propre entreprise — j'ai choisi de me réinventer en
              embrassant ma passion pour le développement web.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Mon parcours m'a appris à <span className="text-slate-300">comprendre le besoin client</span>,
              à gérer des projets de A à Z et à travailler sous contrainte. Des qualités que
              j'applique aujourd'hui pour construire des applications web robustes et utiles.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Actuellement en fin de formation <span className="text-slate-300 font-medium">Full Stack à Ada Tech School (Paris)</span>,
              je suis à la recherche d'un <span className="text-violet-400 font-semibold">stage ou d'une alternance</span> dans
              une entreprise bienveillante pour mettre mes compétences en pratique et continuer à progresser.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { value: '25', label: 'Ans d\'expérience pro' },
                { value: '4', label: 'Ans entrepreneur' },
                { value: '2025', label: 'Reconversion web' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite : parcours + skills */}
          <div className="space-y-8">

            {/* Timeline parcours */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-5">Mon parcours</h3>
              <div className="space-y-4">
                {parcours.map((item) => (
                  <div key={item.titre} className={`pl-4 border-l-2 ${item.color}`}>
                    <p className="text-xs text-slate-500 mb-0.5">{item.periode}</p>
                    <p className="text-white text-sm font-medium">{item.titre}</p>
                    <p className="text-slate-400 text-xs">{item.lieu}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compétences */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium border ${skill.color} transition-transform hover:scale-105 cursor-default`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
    </section>
  )
}
