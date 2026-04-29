import { useEffect, useState } from 'react'
import { fetchProjects } from '../api/client'
import type { Project } from '../types'
import ProjectCard from './ProjectCard'

type Filter = 'tous' | 'web' | 'réseaux'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('tous')

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setError('Impossible de charger les projets. Le serveur est-il démarré ?'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = projects.filter((p) => {
    if (filter === 'tous') return true
    if (filter === 'réseaux') return p.category === 'réseaux'
    return p.category === 'web' || !p.category
  })

  const tabs: { id: Filter; label: string }[] = [
    { id: 'tous',    label: 'Tous' },
    { id: 'web',     label: 'Développement Web' },
    { id: 'réseaux', label: 'Systèmes & Réseaux' },
  ]

  return (
    <section id="projects" className="bg-slate-950 py-24 px-4 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Décoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="text-center mb-10">
          <p className="text-cyan-400 font-medium mb-2 text-sm uppercase tracking-widest">Ce que j'ai construit</p>
          <h2 className="text-3xl font-bold text-white mb-4">Mes Projets</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Une sélection de mes réalisations en développement web et systèmes & réseaux
          </p>
        </div>

        {/* Onglets de filtre */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:text-white hover:border-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">Aucun projet dans cette catégorie pour le moment.</p>
            <p className="text-slate-600 text-sm mt-2">Connecte-toi à l'admin pour en ajouter !</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={project.ID}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
    </section>
  )
}
