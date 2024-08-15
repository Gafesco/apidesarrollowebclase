module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleado', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        edad: {
            type: Sequelize.INTEGER
        },
        correo: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        }
    });

    return Empleado;
};
