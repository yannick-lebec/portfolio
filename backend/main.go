// main.go est le point d'entrée du serveur Go.
// Il fait 4 choses dans l'ordre :
//  1. Charge les variables d'environnement depuis .env
//  2. Connecte la base de données PostgreSQL (Neon)
//  3. Crée automatiquement les tables (AutoMigrate)
//  4. Démarre le serveur HTTP sur le port 8080
package main

import (
	"log"
	"os"
	"portfolio/backend/database"
	"portfolio/backend/handlers"
	"portfolio/backend/middleware"
	"portfolio/backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// 1. Charger les variables depuis le fichier .env
	// godotenv lit DATABASE_URL, JWT_SECRET, ADMIN_PASSWORD, PORT
	if err := godotenv.Load(); err != nil {
		log.Println("Pas de fichier .env trouvé, utilisation des variables d'environnement système")
	}

	// 2. Connexion à la base de données Neon
	database.Connect()

	// 3. AutoMigrate : GORM crée ou met à jour les tables automatiquement
	// Si la table "projects" n'existe pas → elle est créée
	// Si elle existe mais manque une colonne → la colonne est ajoutée
	// C'est l'équivalent des migrations dans d'autres frameworks
	if err := database.DB.AutoMigrate(&models.Project{}); err != nil {
		log.Fatal("Erreur AutoMigrate:", err)
	}
	log.Println("Tables créées/mises à jour avec succès")

	// 4. Création du routeur Gin
	// Gin est le framework web Go : il gère les routes HTTP et les middlewares
	r := gin.Default()

	// Configuration CORS : autorise le frontend React (port 5173) à appeler notre API
	// Sans CORS, le navigateur bloquerait les requêtes entre localhost:5173 et localhost:8080
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000", "https://yannick-le-bec.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// ─── Routes publiques ───────────────────────────────────────────────────────
	// Ces routes sont accessibles par tout le monde (visiteurs du portfolio)
	api := r.Group("/api")
	{
		api.GET("/projects", handlers.GetProjects)    // Liste tous les projets
		api.GET("/projects/:id", handlers.GetProject) // Récupère un projet par ID
	}

	// ─── Routes admin (protégées par JWT) ──────────────────────────────────────
	// Ces routes nécessitent d'être connecté en tant qu'admin
	admin := r.Group("/api/admin")
	{
		// Login : la seule route admin qui ne nécessite pas de token
		admin.POST("/login", handlers.Login)

		// Routes protégées : middleware.RequireAuth vérifie le token JWT avant chaque appel
		protected := admin.Group("/")
		protected.Use(middleware.RequireAuth)
		{
			protected.POST("/projects", handlers.CreateProject)      // Créer un projet
			protected.PUT("/projects/:id", handlers.UpdateProject)   // Modifier un projet
			protected.DELETE("/projects/:id", handlers.DeleteProject) // Supprimer un projet
		}
	}

	// Démarrage du serveur sur le port défini dans .env (8080 par défaut)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Serveur démarré sur http://localhost:%s\n", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Erreur démarrage serveur:", err)
	}
}
