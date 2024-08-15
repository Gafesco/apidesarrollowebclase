let express = require('express');
let router = express.Router();
const vendedores = require('../controllers/controllervendedor.js');

router.post('/create', vendedores.create);
router.get('/all', vendedores.retrieveAll);
router.get('/onebyid/:id', vendedores.getById);
router.put('/update/:id', vendedores.updateById);
router.delete('/delete/:id', vendedores.deleteById);

module.exports = router;
