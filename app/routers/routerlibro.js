let express = require('express');
let router = express.Router();

const libros = require('../controllers/controllerlibros.js');

router.post('/create', libros.create);
router.get('/all', libros.retrieveAll);
router.get('/onebyid/:id', libros.getById);
router.put('/update/:id', libros.updateById);
router.delete('/delete/:id', libros.deleteById);

module.exports = router;
