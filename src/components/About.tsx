export default function About() {
  const skillsWeb = [
    { name: 'Go',         color: 'bg-cyan-900/50 text-cyan-300 border-cyan-700/50' },
    { name: 'React',      color: 'bg-blue-900/50 text-blue-300 border-blue-700/50' },
    { name: 'TypeScript', color: 'bg-indigo-900/50 text-indigo-300 border-indigo-700/50' },
    { name: 'PostgreSQL', color: 'bg-sky-900/50 text-sky-300 border-sky-700/50' },
    { name: 'REST API',   color: 'bg-violet-900/50 text-violet-300 border-violet-700/50' },
    { name: 'GORM',       color: 'bg-purple-900/50 text-purple-300 border-purple-700/50' },
    { name: 'Docker',     color: 'bg-blue-900/50 text-blue-300 border-blue-700/50' },
    { name: 'Git',        color: 'bg-orange-900/50 text-orange-300 border-orange-700/50' },
  ]

  const skillsReseaux = [
    { name: 'Linux',            color: 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50' },
    { name: 'TCP/IP',           color: 'bg-teal-900/50 text-teal-300 border-teal-700/50' },
    { name: 'Cisco',            color: 'bg-cyan-900/50 text-cyan-300 border-cyan-700/50' },
    { name: 'Virtualisation',   color: 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50' },
    { name: 'Active Directory', color: 'bg-sky-900/50 text-sky-300 border-sky-700/50' },
    { name: 'Wireshark',        color: 'bg-teal-900/50 text-teal-300 border-teal-700/50' },
  ]

  const parcours = [
    {
      periode: 'À venir',
      titre: 'Formation Technicien Systèmes et Réseaux',
      lieu: 'En préparation',
      color: 'border-teal-500',
      badge: true,
    },
    {
      periode: 'Sept. 2025 – aujourd\'hui',
      titre: 'Formation Développeur Web Full Stack',
      lieu: 'Ada Tech School · Paris',
      color: 'border-cyan-500',
      badge: false,
    },
    {
      periode: '2012 – 2025',
      titre: 'Chef d\'équipe',
      lieu: 'Art-toit',
      color: 'border-slate-600',
      badge: false,
    },
    {
      periode: '2008 – 2012',
      titre: 'Gérant fondateur',
      lieu: 'Couverture-pro',
      color: 'border-slate-600',
      badge: false,
    },
    {
      periode: '2003 – 2008',
      titre: 'Couvreur salarié',
      lieu: 'Entreprise de couverture',
      color: 'border-slate-600',
      badge: false,
    },
    {
      periode: '2001 – 2003',
      titre: 'Formation · BEP Couverture',
      lieu: 'Compagnons du Devoir',
      color: 'border-slate-600',
      badge: false,
    },
  ]

  return (
    <section id="about" className="bg-slate-900 py-24 px-4 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-medium mb-2 text-sm uppercase tracking-widest">Qui suis-je ?</p>
          <h2 className="text-3xl font-bold text-white">À propos de moi</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Texte + Stats */}
          <div className="space-y-5">
            <p className="text-slate-300 text-lg leading-relaxed">
              Après <span className="text-white font-semibold">plus de 25 ans d'expérience dans le BTP</span>,
              dont plusieurs années à gérer ma propre entreprise, j'ai fait le choix de me réorienter
              vers un domaine qui me passionne depuis longtemps : <span className="text-cyan-400 font-medium">l'informatique</span>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Habitué à piloter des projets, résoudre des problèmes concrets et travailler sous pression,
              j'ai développé une <span className="text-slate-300">rigueur et un sens de l'analyse</span> que
              j'applique aujourd'hui dans le développement web et les systèmes & réseaux.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Actuellement en formation <span className="text-slate-300 font-medium">Développeur Full Stack</span> et
              en préparation d'une <span className="text-cyan-400 font-semibold">formation Technicien Systèmes & Réseaux</span>,
              je construis un profil hybride capable de :
            </p>
            <ul className="text-slate-400 space-y-1 pl-4 text-sm leading-relaxed">
              {[
                'Concevoir des applications web modernes',
                'Comprendre et configurer l\'infrastructure qui les héberge',
                'Déployer, sécuriser et maintenir des services',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5 shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-slate-400 leading-relaxed">
              Je m'intéresse particulièrement à l'<span className="text-slate-300">administration Linux</span>,
              aux <span className="text-slate-300">réseaux (TCP/IP, segmentation, diagnostic)</span>,
              à la <span className="text-slate-300">virtualisation</span> et au
              <span className="text-slate-300"> déploiement sécurisé d'applications</span>.
            </p>

            {/* Objectif */}
            <div className="bg-cyan-900/20 border border-cyan-700/30 rounded-xl p-4">
              <p className="text-cyan-300 text-sm font-medium mb-1"> Mon objectif :</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Intégrer une <span className="text-white font-semibold">alternance en systèmes et réseaux</span> pour
                monter en compétence sur le terrain et évoluer vers des postes mêlant
                infrastructure, support et déploiement.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { value: '25+', label: 'Ans d\'expérience pro' },
                { value: '4',   label: 'Ans entrepreneur' },
                { value: '2025', label: 'Reconversion IT' },
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
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs text-slate-500">{item.periode}</p>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 bg-teal-900/50 text-teal-400 text-xs rounded border border-teal-700/50">
                          À venir
                        </span>
                      )}
                    </div>
                    <p className="text-white text-sm font-medium">{item.titre}</p>
                    <p className="text-slate-400 text-xs">{item.lieu}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compétences */}
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Développement Web</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsWeb.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-3 py-1.5 rounded-xl text-sm font-medium border ${skill.color} transition-transform hover:scale-105 cursor-default`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Systèmes & Réseaux</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsReseaux.map((skill) => (
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
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
    </section>
  )
}
