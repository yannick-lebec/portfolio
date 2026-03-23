// Package middleware contient les fonctions intermédiaires qui s'exécutent
// avant les handlers. Ici, on vérifie que l'utilisateur est bien connecté
// avant d'autoriser l'accès aux routes admin.
package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// RequireAuth est un middleware Gin qui protège les routes admin.
//
// Comment ça marche :
// Le frontend envoie le token JWT dans le header HTTP : Authorization: Bearer <token>
// Ce middleware vérifie que le token est valide avant de laisser passer la requête.
//
// Si le token est absent ou invalide → erreur 401 (non autorisé)
// Si le token est valide → la requête continue vers le handler
func RequireAuth(c *gin.Context) {
	// On récupère le header Authorization
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token manquant"})
		c.Abort() // Abort() empêche la requête d'aller plus loin
		return
	}

	// Le header doit être au format "Bearer <token>"
	// strings.TrimPrefix enlève le préfixe "Bearer " pour récupérer juste le token
	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	if tokenString == authHeader {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Format de token invalide (attendu: Bearer <token>)"})
		c.Abort()
		return
	}

	// On parse et vérifie le token avec la clé secrète
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Vérification que l'algorithme de signature est bien HMAC (HS256)
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalide ou expiré"})
		c.Abort()
		return
	}

	// Token valide : on laisse passer la requête vers le handler
	c.Next()
}
