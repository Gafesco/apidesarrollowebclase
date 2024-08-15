const db = require('../config/db.config.js');
const Libro = db.Libro;

// Crear un nuevo Libro
exports.create = (req, res) => {
    let libro = {};

    try {
        libro.codigo = req.body.codigo;
        libro.nombre = req.body.nombre;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.pais_autor = req.body.pais_autor;
        libro.numero_paginas = req.body.numero_paginas;
        libro.ano_edicion = req.body.ano_edicion;
        libro.precio = req.body.precio;

        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con id = " + result.codigo,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
};

// Recuperar todos los Libros
exports.retrieveAll = (req, res) => {
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "¡Todos los Libros recuperados exitosamente!",
                libros: libroInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
};

// Recuperar un Libro por ID
exports.getById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            if (!libro) {
                res.status(404).json({
                    message: "Libro no encontrado con id = " + libroId,
                });
            } else {
                res.status(200).json({
                    message: "¡Libro recuperado exitosamente con id = " + libroId,
                    libro: libro
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
};

// Actualizar un Libro por ID
exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el Libro para actualizar con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {
            // Actualizar los datos del libro
            let updatedObject = {
                codigo: req.body.codigo,
                nombre: req.body.nombre,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                pais_autor: req.body.pais_autor,
                numero_paginas: req.body.numero_paginas,
                ano_edicion: req.body.ano_edicion,
                precio: req.body.precio
            };
            let result = await Libro.update(updatedObject, { returning: true, where: { codigo: libroId } });

            // Responder al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el Libro con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Libro actualizado exitosamente con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el Libro con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un Libro por ID
exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un Libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el Libro con id = " + req.params.id,
            error: error.message,
        });
    }
};
