module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define('producto', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      nombre: {
          type: Sequelize.STRING
      },
      precio: {
          type: Sequelize.FLOAT
      },
      descripcion: {
          type: Sequelize.STRING
      }
  });

  return Producto;
};
