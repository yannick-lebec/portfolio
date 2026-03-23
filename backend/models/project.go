// Package models contient les structures de données de l'application.
// Chaque struct correspond à une table dans la base de données PostgreSQL.
// GORM crée automatiquement les tables avec AutoMigrate() dans main.go.
package models

import "gorm.io/gorm"

// Project représente un projet dans le portfolio.
//
// Les tags `json:"..."` contrôlent comment le champ apparaît dans les réponses API.
// Les tags `gorm:"..."` configurent la colonne en base de données.
//
// gorm.Model ajoute automatiquement ces 4 champs :
//   - ID        uint      (clé primaire auto-incrémentée)
//   - CreatedAt time.Time (date de création)
//   - UpdatedAt time.Time (date de dernière modification)
//   - DeletedAt time.Time (soft delete : suppression logique, pas physique)
type Project struct {
	gorm.Model
	Title       string `json:"title"       gorm:"not null"`
	Description string `json:"description" gorm:"not null"`
	// TechStack : technologies séparées par des virgules, ex: "Go, React, PostgreSQL"
	TechStack string `json:"tech_stack"`
	GithubURL string `json:"github_url"`
	DemoURL   string `json:"demo_url"`
	ImageURL  string `json:"image_url"`
	// Featured : si true, le projet est mis en avant sur la page d'accueil
	Featured bool `json:"featured" gorm:"default:false"`
}
