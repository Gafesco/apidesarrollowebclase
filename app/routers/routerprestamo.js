let express = require('express');
let router = express.Router();

const prestamos = require('../controllers/controllerprestamo.js');

router.post('/create', prestamos.create);
router.get('/all', prestamos.retrieveAll);
router.get('/onebyid/:id', prestamos.getById);
router.put('/update/:id', prestamos.updateById);
router.delete('/delete/:id', prestamos.deleteById);

module.exports = router;
