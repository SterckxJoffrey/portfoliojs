const express = require('express');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projectRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// On utilise nos routes avec un préfixe
app.use('/api/projets', projectRoutes);

const PORT = process.env.PORT || 5080;
app.listen(PORT, () => console.log(`🚀 Serveur organisé sur le port ${PORT}`));