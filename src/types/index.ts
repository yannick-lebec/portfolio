// Types TypeScript partagés dans toute l'application.
// TypeScript = JavaScript avec des types : ça évite les bugs en détectant
// les erreurs avant même d'exécuter le code.

// Project correspond exactement à la struct Go dans backend/models/project.go
export interface Project {
  ID: number
  title: string
  description: string
  tech_stack: string   // ex: "Go, React, PostgreSQL"
  github_url: string
  demo_url: string
  image_url: string
  featured: boolean
  CreatedAt: string
  UpdatedAt: string
}

// ProjectForm est utilisé dans le formulaire admin pour créer/modifier un projet
export interface ProjectForm {
  title: string
  description: string
  tech_stack: string
  github_url: string
  demo_url: string
  image_url: string
  featured: boolean
}
