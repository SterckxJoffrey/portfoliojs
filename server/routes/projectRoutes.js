const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route : GET /api/projets
router.get('/', projectController.getProjects);
router.post('/', projectController.createProjects);
router.delete('/', projectController.deleteProjects)

module.exports = router;