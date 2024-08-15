const express = require('express');
const router = express.Router();
const productos = require('../controllers/controllerproducto.js');


router.post('/create', productos.create);
router.get('/all', productos.retrieveAll);
router.get('/onebyid/:id', productos.getById);
router.put('/update/:id', productos.updateById);
router.delete('/delete/:id', productos.deleteById);

module.exports = router;
