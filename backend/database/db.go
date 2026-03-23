// Package database gère la connexion à la base de données PostgreSQL via GORM.
// GORM est un ORM (Object-Relational Mapper) : il traduit automatiquement
// les structs Go en tables SQL, et les opérations Go en requêtes SQL.
// Exemple : db.Find(&projects) devient SELECT * FROM projects en SQL.
package database

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB est la variable globale de connexion à la base de données.
// On y accède partout dans le projet via database.DB
var DB *gorm.DB

// Connect ouvre la connexion à PostgreSQL (Neon) en lisant l'URL depuis .env
func Connect() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL n'est pas définie dans le fichier .env")
	}

	var err error
	// gorm.Open établit la connexion avec PostgreSQL
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Impossible de se connecter à la base de données Neon:", err)
	}

	log.Println("Base de données Neon connectée !")
}
