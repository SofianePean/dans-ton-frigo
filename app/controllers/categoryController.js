const { Category } = require('../models');

const categoryController = {
    category: async (req, res) => {
        try {
            // récupèrer les cartes
            const category = await Category.findAll({
                include: 'items'
            });
            // envoyer une réponse
            res.json(category);
        } catch(error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    create : async (req,res) => {
        try {
            if (!req.body.name) {
                throw new Error('Il faut passer en POST un paramètre name');
            }
            const newCategory = await Category.create({
                name: req.body.name,
            });
            // envoyer une réponse
            res.json(newCategory);
        } catch(error) {
            // alert('Il faut un nom')
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    read : async (req, res) => {
        try {
            const id = req.params.id;
            // ou avec destructuring, c'est pareil !
            // const { id } = req.params;
            const category = await Category.findByPk(id, {
                include: 'items'
            });
            // si on trouve la liste on la renvoie
            if(category) {
                res.json(category);
                // reponse : status 200 , body { name: 'list toto', id: 123 }
            }
            // sinon on envoie une réponse explicite pour dire qu'on a rien trouvé
            else {
                res.status(404).json(`Aucune category a l'id ${id}`);
                // reponse : status 404, body "Aucune liste à l'id 123"
            }
        } catch(error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    update : async (req,res) => {
        try {
            const id = req.params.id;
            const category = await Category.findByPk(id);
            if(category) {
                if (req.body.name) {
                    // on met à jour le nom
                    category.name = req.body.name;
                }
                const categorySaved = await category.save();
                // envoyer une réponse
                res.json(categorySaved);
            }
            else {
                res.status(404).json(`Aucune category a l'id ${id}`);
            }
        } catch(error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    delete : async (req,res) => {
        try {
            const id = req.params.id;
            const category = await Category.findByPk(id);
            // si on trouve la liste on la supprime
            if(category) {
                await category.destroy();
                res.json('Category supprimée');
            }
            // sinon on envoie une réponse explicite pour dire qu'on a rien trouvé
            else {
                res.status(404).json(`Aucune category à l'id ${id}`);
            }
        } catch(error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
};

module.exports = categoryController;