const router = require('express').Router();

// exemple : const listController = require('./controllers/listController');
const itemController = require('./controllers/itemController')
const categoryController = require('./controllers/categoryController')

// Route pour les items :
router.get('/items', itemController.item);
router.post('/items',  itemController.create);
router.get('/items/:id', itemController.read);
router.patch('/items/:id', itemController.update);
router.delete('/items/:id', itemController.delete);

// Route pour les categories :
router.get('/categories', categoryController.category);
router.post('/categories', categoryController.create);
router.get('/categories/:id', categoryController.read);
router.patch('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);
module.exports = router;