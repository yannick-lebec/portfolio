// client.ts configure axios pour communiquer avec le backend Go.
// Axios est une librairie pour faire des requêtes HTTP (GET, POST, PUT, DELETE).
// C'est l'équivalent de fetch() mais avec plus de fonctionnalités.

import axios from 'axios'
import type { Project, ProjectForm } from '../types'

// Instance axios préconfigurée avec l'URL de base de notre API
// Grâce au proxy dans vite.config.ts, /api est redirigé vers http://localhost:8080
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

// Intercepteur : avant chaque requête, on ajoute automatiquement le token JWT
// si l'utilisateur est connecté en tant qu'admin.
// Sans ça, il faudrait ajouter manuellement le header Authorization partout.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ─── Fonctions API publiques ────────────────────────────────────────────────

// Récupère tous les projets depuis GET /api/projects
export const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await api.get<Project[]>('/projects')
  return data
}

// Récupère un projet par ID depuis GET /api/projects/:id
export const fetchProject = async (id: number): Promise<Project> => {
  const { data } = await api.get<Project>(`/projects/${id}`)
  return data
}

// ─── Fonctions API admin (nécessitent d'être connecté) ──────────────────────

// Connexion admin : envoie le mot de passe, reçoit un token JWT
export const login = async (password: string): Promise<string> => {
  const { data } = await api.post<{ token: string }>('/admin/login', { password })
  return data.token
}

// Crée un nouveau projet : POST /api/admin/projects
export const createProject = async (project: ProjectForm): Promise<Project> => {
  const { data } = await api.post<Project>('/admin/projects', project)
  return data
}

// Modifie un projet : PUT /api/admin/projects/:id
export const updateProject = async (id: number, project: ProjectForm): Promise<Project> => {
  const { data } = await api.put<Project>(`/admin/projects/${id}`, project)
  return data
}

// Supprime un projet : DELETE /api/admin/projects/:id
export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/admin/projects/${id}`)
}
