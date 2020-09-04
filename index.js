require('dotenv').config();
const express = require('express');
const multer = require('multer');
const app = express ();
const cors = require('cors')
// on peut configurer nos CORS à la mano ou via un module NPM bien foutu
app.use(cors({
    origin: '*',
}));

const PORT = process.env.PORT || 5000;

// Initialisation de la lecture de paramètre post ( création de req.body )
app.use(express.urlencoded({ extended: true }));


const bodyParser = multer();

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
app.use( bodyParser.none() );

//Servir des fichier statics
// app.use(express.static(__dirname + '/[nom du dossier static]'));

// Le routage
const router = require('./app/router');
app.use(router);

// Lancement du serveur
app.listen(PORT, () => {
	console.log(`Server listenning on http://localhost:${PORT}`);
});
