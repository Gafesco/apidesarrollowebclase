let express = require('express');
let router = express.Router();

const empleados = require('../controllers/controllerempleado.js');

router.post('/create', empleados.create);
router.get('/all', empleados.retrieveAll);
router.get('/onebyid/:id', empleados.getById);
router.put('/update/:id', empleados.updateById);
router.delete('/delete/:id', empleados.deleteById);

module.exports = router;
