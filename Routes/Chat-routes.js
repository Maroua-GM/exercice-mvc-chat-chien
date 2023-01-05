
// Définir un routeur (Router)
const express = require('express');
const {getCats, createCat, getCatById, updateCat, deleteCat} = require('./../controllers/Chat-controller');
// Router:  le contructeur Router nous donne un objet router , 
// avec cet objet on peut utiliser les fonctions middleware  
const router = express.Router();
// http://localhost:5000/cats/ + GET
router.get('/', getCats);

// http://localhost:5000/cats/ + POST
router.post('/', createCat);

// http://localhost:5000/cats/:id + get
router.get('/:id', getCatById);

// http://localhost:5000/cats/:id + put
router.put('/:id', updateCat);


// // http://localhost:5000/cats/ + delete
router.delete('/:id', deleteCat);

module.exports = router;