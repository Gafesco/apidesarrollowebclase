const db = require('../config/db.config.js');
const Producto = db.Producto;


exports.create = (req, res) => {
    let producto = {};

    try {
        producto.nombre = req.body.nombre;
        producto.precio = req.body.precio;
        producto.descripcion = req.body.descripcion;

        Producto.create(producto).then(result => {
            res.status(200).json({
                message: "Producto creado exitosamente con id = " + result.id,
                producto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
};

// Recuperar todos los Productos
exports.retrieveAll = (req, res) => {
    Producto.findAll()
        .then(productoInfos => {
            res.status(200).json({
                message: "¡Todos los Productos recuperados exitosamente!",
                productos: productoInfos
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

// Recuperar un Producto por ID
exports.getById = (req, res) => {
    let productoId = req.params.id;
    Producto.findByPk(productoId)
        .then(producto => {
            if (!producto) {
                res.status(404).json({
                    message: "Producto no encontrado con id = " + productoId,
                });
            } else {
                res.status(200).json({
                    message: "¡Producto recuperado exitosamente con id = " + productoId,
                    producto: producto
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

// Actualizar un Producto por ID
exports.updateById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No se encontró el Producto para actualizar con id = " + productoId,
                producto: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion
            };
            let result = await Producto.update(updatedObject, { returning: true, where: { id: productoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el Producto con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Producto actualizado exitosamente con id = " + productoId,
                producto: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el Producto con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un Producto por ID
exports.deleteById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No existe un Producto con id = " + productoId,
                error: "404",
            });
        } else {
            await producto.destroy();
            res.status(200).json({
                message: "Producto eliminado exitosamente con id = " + productoId,
                producto: producto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el Producto con id = " + req.params.id,
            error: error.message,
        });
    }
};
