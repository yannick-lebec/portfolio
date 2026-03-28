// Admin : dashboard pour gérer les projets du portfolio
// Accessible sur /admin — protégé par le token JWT
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProjects, createProject, updateProject, deleteProject } from '../api/client'
import type { Project, ProjectForm } from '../types'

// Formulaire vide par défaut (utilisé pour la création et la réinitialisation)
const emptyForm: ProjectForm = {
  title: '',
  description: '',
  tech_stack: '',
  github_url: '',
  demo_url: '',
  image_url: '',
  featured: false,
}

export default function Admin() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<ProjectForm>(emptyForm)
  // editingId : si non null, on est en mode "modification" de ce projet
  const [editingId, setEditingId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Vérification : si pas de token, redirection vers la page de login
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await fetchProjects()
      setProjects(data)
    } catch {
      showMessage('error', 'Impossible de charger les projets')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    // Le message disparaît automatiquement après 3 secondes
    setTimeout(() => setMessage(null), 3000)
  }

  // handleSubmit : gère à la fois la création et la modification d'un projet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingId !== null) {
        // Mode modification
        await updateProject(editingId, form)
        showMessage('success', 'Projet mis à jour !')
      } else {
        // Mode création
        await createProject(form)
        showMessage('success', 'Projet créé !')
      }

      // On recharge la liste et on ferme le formulaire
      await loadProjects()
      setForm(emptyForm)
      setEditingId(null)
      setShowForm(false)
    } catch {
      showMessage('error', 'Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (project: Project) => {
    // Pré-remplir le formulaire avec les données existantes
    setForm({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack,
      github_url: project.github_url,
      demo_url: project.demo_url,
      image_url: project.image_url,
      featured: project.featured,
    })
    setEditingId(project.ID)
    setShowForm(true)
    // Scroll vers le formulaire
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: number) => {
    // confirm() affiche une boîte de dialogue de confirmation native du navigateur
    if (!confirm('Supprimer ce projet ?')) return

    try {
      await deleteProject(id)
      showMessage('success', 'Projet supprimé')
      await loadProjects()
    } catch {
      showMessage('error', 'Erreur lors de la suppression')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Header admin */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Dashboard Admin</h1>
          <p className="text-gray-400 text-sm">Gestion du portfolio</p>
        </div>
        <div className="flex gap-3">
          <a href="/" className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors">
            Voir le site
          </a>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Message de succès/erreur */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border text-sm ${
            message.type === 'success'
              ? 'bg-green-900/50 border-green-700 text-green-400'
              : 'bg-red-900/50 border-red-700 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Bouton pour ouvrir le formulaire */}
        {!showForm && (
          <div className="mb-8">
            <button
              onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true) }}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un projet
            </button>
          </div>
        )}

        {/* Formulaire de création/modification */}
        {showForm && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
            <h2 className="text-lg font-bold mb-6">
              {editingId ? 'Modifier le projet' : 'Nouveau projet'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="Mon super projet"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={10}
                  placeholder="Description du projet..."
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none resize-y"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Technologies</label>
                <input
                  type="text"
                  value={form.tech_stack}
                  onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
                  placeholder="Go, React, PostgreSQL"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
                />
                <p className="text-gray-500 text-xs mt-1">Sépare les technologies par des virgules</p>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">URL GitHub</label>
                  <input
                    type="url"
                    value={form.github_url}
                    onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">URL Demo</label>
                  <input
                    type="url"
                    value={form.demo_url}
                    onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                    placeholder="https://mon-projet.vercel.app"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">URL Image</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600"
                />
                <label htmlFor="featured" className="text-sm text-gray-300">
                  Mettre en avant ce projet
                </label>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Sauvegarde...' : (editingId ? 'Mettre à jour' : 'Créer le projet')}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm) }}
                  className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des projets existants */}
        <h2 className="text-lg font-bold mb-4">Projets ({projects.length})</h2>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            Aucun projet. Commence par en créer un !
          </div>
        )}

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.ID}
              className="bg-gray-800 rounded-xl border border-gray-700 p-4 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold truncate">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 bg-indigo-900 text-indigo-400 text-xs rounded-full border border-indigo-700 shrink-0">
                      En avant
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm truncate mt-0.5">{project.description}</p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(project.ID)}
                  className="px-3 py-1.5 bg-red-900/50 text-red-400 rounded-lg text-sm hover:bg-red-900 transition-colors border border-red-800"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
