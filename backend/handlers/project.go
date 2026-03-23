package handlers

import (
	"net/http"
	"portfolio/backend/database"
	"portfolio/backend/models"

	"github.com/gin-gonic/gin"
)

// GetProjects renvoie tous les projets du portfolio.
// Route publique : GET /api/projects
// Le frontend l'appelle pour afficher la liste des projets sur la page d'accueil.
func GetProjects(c *gin.Context) {
	var projects []models.Project

	// database.DB.Find remplit le slice `projects` avec tous les enregistrements
	// C'est l'équivalent GORM de : SELECT * FROM projects WHERE deleted_at IS NULL
	result := database.DB.Order("created_at desc").Find(&projects)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récupération des projets"})
		return
	}

	c.JSON(http.StatusOK, projects)
}

// GetProject renvoie un seul projet par son ID.
// Route publique : GET /api/projects/:id
func GetProject(c *gin.Context) {
	var project models.Project
	id := c.Param("id") // récupère le :id dans l'URL

	// First cherche le premier enregistrement correspondant à l'ID
	result := database.DB.First(&project, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Projet non trouvé"})
		return
	}

	c.JSON(http.StatusOK, project)
}

// CreateProject crée un nouveau projet en base de données.
// Route protégée (admin) : POST /api/admin/projects
//
// Le frontend admin envoie un JSON avec les infos du projet,
// GORM insère une nouvelle ligne dans la table projects.
func CreateProject(c *gin.Context) {
	var project models.Project

	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Données invalides: " + err.Error()})
		return
	}

	// database.DB.Create insère le projet en BDD et remplit automatiquement
	// les champs ID, CreatedAt, UpdatedAt
	result := database.DB.Create(&project)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la création du projet"})
		return
	}

	// StatusCreated = code HTTP 201 : ressource créée avec succès
	c.JSON(http.StatusCreated, project)
}

// UpdateProject modifie un projet existant.
// Route protégée (admin) : PUT /api/admin/projects/:id
func UpdateProject(c *gin.Context) {
	var project models.Project
	id := c.Param("id")

	// On vérifie d'abord que le projet existe
	if result := database.DB.First(&project, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Projet non trouvé"})
		return
	}

	// On lit les nouvelles données envoyées par le frontend
	var updatedData models.Project
	if err := c.ShouldBindJSON(&updatedData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Données invalides: " + err.Error()})
		return
	}

	// Save met à jour tous les champs non-zéro
	database.DB.Model(&project).Updates(updatedData)
	c.JSON(http.StatusOK, project)
}

// DeleteProject supprime un projet (soft delete : il reste en BDD avec DeletedAt rempli).
// Route protégée (admin) : DELETE /api/admin/projects/:id
func DeleteProject(c *gin.Context) {
	var project models.Project
	id := c.Param("id")

	if result := database.DB.First(&project, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Projet non trouvé"})
		return
	}

	// Delete fait un soft delete grâce à gorm.Model (remplit DeletedAt au lieu de supprimer)
	database.DB.Delete(&project)
	c.JSON(http.StatusOK, gin.H{"message": "Projet supprimé"})
}
