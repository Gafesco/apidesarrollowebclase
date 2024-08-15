const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

const db = require('./app/config/db.config.js');

db.sequelize.sync().then(() => {
  console.log('Drop and Resync with { force: true }');
});

let customerRouter = require('./app/routers/router.js');
let vendedorRouter = require('./app/routers/routervendedor.js');
let productoRouter = require('./app/routers/routerproducto.js');
let empleadoRouter = require('./app/routers/routerempleado.js'); 
let libroRouter = require('./app/routers/routerlibro.js');
let prestamoRouter = require('./app/routers/routerprestamo.js'); 

app.use('/api/customers', customerRouter);
app.use('/api/vendedores', vendedorRouter);
app.use('/api/productos', productoRouter);
app.use('/api/empleados', empleadoRouter); 
app.use('/api/libros', libroRouter); 
app.use('/api/prestamos', prestamoRouter); 

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

const server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
