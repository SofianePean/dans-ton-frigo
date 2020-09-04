const { Item, Category } = require('../models');

const itemController = {
    item: async (req, res) => {
        try {
            // récupèrer les cartes
            const items = await Item.findAll({
                include: 'category',
                order : [
                    ['expirationdate', 'ASC'],
                ],
            });
            // envoyer une réponse
            res.json(items);
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
            const newItem = await Item.create({
                name: req.body.name,
                expirationdate: req.body.expirationdate,
                quantity: req.body.quantity,
                quantitypackage: req.body.quantitypackage,
                category_id : req.body.category_id
            });
            // envoyer une réponse
            res.json(newItem);
        } catch(error) {
            // alert('Il faut un nom')
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    read : async (req,res) => {
            // ici je devrais récupérer la liste pour l'id demandé
            try {
                const id = req.params.id;
                // ou avec destructuring, c'est pareil !
                // const { id } = req.params;
                const item = await Item.findByPk(id, {
                    include: 'category'
                });
                // si on trouve la liste on la renvoie
                if(item) {
                    res.json(item);
                    // reponse : status 200 , body { name: 'list toto', id: 123 }
                }
                // sinon on envoie une réponse explicite pour dire qu'on a rien trouvé
                else {
                    res.status(404).json(`Aucun item à l'id ${id}`);
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
            const item = await Item.findByPk(id);
            if(item) {
                if (req.body.name) {
                    // on met à jour le nom
                    item.name = req.body.name;
                }
                const itemSaved = await item.save();
                // envoyer une réponse
                res.json(itemSaved);
            }
            else {
                res.status(404).json(`Aucune liste à l'id ${id}`);
            }
        } catch(error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    delete : async (req, res) => {
        try {
            const id = req.params.id;
            const item = await Item.findByPk(id);
            // si on trouve la liste on la supprime
            if(item) {
                await item.destroy();
                res.json('Item supprimée');
            }
            // sinon on envoie une réponse explicite pour dire qu'on a rien trouvé
            else {
                res.status(404).json(`Aucun item à l'id ${id}`);
            }
        } catch(error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    }
};

module.exports = itemController;