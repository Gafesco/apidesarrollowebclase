module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define('libro', {
        codigo: {
            type: Sequelize.BIGINT, 
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(60) 
        },
        editorial: {
            type: Sequelize.STRING(25)
        },
        autor: {
            type: Sequelize.STRING(25)
        },
        genero: {
            type: Sequelize.STRING(20) 
        },
        pais_autor: {
            type: Sequelize.STRING(20)
        },
        numero_paginas: {
            type: Sequelize.INTEGER 
        },
        ano_edicion: {
            type: Sequelize.DATEONLY 
        },
        precio: {
            type: Sequelize.DECIMAL(10, 2) 
        }
    });

    return Libro;
};
