const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false, 
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.Vendedor = require('../models/vendedor.model.js')(sequelize, Sequelize);
db.Producto = require('../models/producto.model.js')(sequelize, Sequelize);
db.Empleado = require('../models/empleado.model.js')(sequelize, Sequelize);
db.Libro = require('../models/libros.model.js')(sequelize, Sequelize);
db.Prestamo = require('../models/prestamo.model.js')(sequelize, Sequelize);

module.exports = db;
