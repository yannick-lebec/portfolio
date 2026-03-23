// Package handlers contient les fonctions qui traitent les requêtes HTTP.
// Chaque handler reçoit une requête, fait son traitement, et renvoie une réponse JSON.
package handlers

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// LoginRequest représente le corps JSON attendu pour la connexion admin.
// Le tag `binding:"required"` fait que Gin renvoie une erreur si le champ manque.
type LoginRequest struct {
	Password string `json:"password" binding:"required"`
}

// Login gère la connexion admin.
// Route : POST /api/admin/login
//
// Fonctionnement :
// 1. On lit le mot de passe envoyé dans la requête
// 2. On compare avec ADMIN_PASSWORD dans .env
// 3. Si correct, on génère un token JWT valable 24h
// 4. Le frontend stocke ce token et l'envoie dans chaque requête admin
func Login(c *gin.Context) {
	var req LoginRequest

	// ShouldBindJSON lit le corps JSON de la requête et remplit la struct
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mot de passe requis"})
		return
	}

	// Vérification du mot de passe (comparaison simple avec la variable d'env)
	adminPassword := os.Getenv("ADMIN_PASSWORD")
	if req.Password != adminPassword {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Mot de passe incorrect"})
		return
	}

	// Génération du token JWT
	// JWT = JSON Web Token : un token signé que le serveur peut vérifier sans BDD
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"role": "admin",
		// exp = expiration : le token expire dans 24h
		"exp": time.Now().Add(24 * time.Hour).Unix(),
	})

	// On signe le token avec la clé secrète définie dans .env
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la génération du token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
