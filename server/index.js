const express = require('express');
const cors = require('cors');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5080;

app.use(cors()); // permet a l'app REACT de parler au serveur
app.use(express.json()) // permet de recevoir du json


app.get('/api/test' , (req, res) => {
    res.json({message : "Le serveur express répond bien !"});
})

app.listen(PORT, () => {
    console.log(`serveur tourne sur localhost : ${PORT}`)
})