const { error } = require('console');
const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const DATA_PATH = path.join(__dirname, '../data.json');

// Logique pour récupérer les projets
exports.getProjects = (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Erreur de lecture" });
    res.json(JSON.parse(data).projets);
  });
};

exports.createProjects = (req, res) => {
  const { nom } = req.body;

  if (!nom) {
    return res.status(400).json({ error: "Le nom est requis" });
  }

  fs.readFile(DATA_PATH, 'utf8', (err, fileData) => {
    if (err) {
      return res.status(500).json({ error: "Erreur de lecture" });
    }

    const jsonData = JSON.parse(fileData);

    const newProject = {
      id: Date.now(),
      nom,
      statut: "en cours"
    };

    jsonData.projets.push(newProject);

    fs.writeFile(
      DATA_PATH,
      JSON.stringify(jsonData, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Erreur d'écriture" });
        }

        res.status(201).json(newProject);
      }
    );
  });
};
