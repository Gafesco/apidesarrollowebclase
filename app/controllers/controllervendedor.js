const db = require('../config/db.config.js');
const Vendedor = db.Vendedor;

exports.create = (req, res) => {
    let vendedor = {};

    try {

        vendedor.nombre = req.body.nombre;
        vendedor.apellido = req.body.apellido;
        vendedor.direccion = req.body.direccion;
        vendedor.edad = req.body.edad;
        vendedor.correo = req.body.correo;
        vendedor.telefono = req.body.telefono;


        Vendedor.create(vendedor).then(result => {

            res.status(200).json({
                message: "Vendedor creado exitosamente con id = " + result.id,
                vendedor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
};

// Recuperar todos los Vendedores
exports.retrieveAll = (req, res) => {
    Vendedor.findAll()
        .then(vendedorInfos => {
            res.status(200).json({
                message: "¡Todos los Vendedores recuperados exitosamente!",
                vendedores: vendedorInfos
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

// Recuperar un Vendedor por ID
exports.getById = (req, res) => {
    let vendedorId = req.params.id;
    Vendedor.findByPk(vendedorId)
        .then(vendedor => {
            if (!vendedor) {
                res.status(404).json({
                    message: "Vendedor no encontrado con id = " + vendedorId,
                });
            } else {
                res.status(200).json({
                    message: "¡Vendedor recuperado exitosamente con id = " + vendedorId,
                    vendedor: vendedor
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

// Actualizar un Vendedor por ID
exports.updateById = async (req, res) => {
    try {
        let vendedorId = req.params.id;
        let vendedor = await Vendedor.findByPk(vendedorId);

        if (!vendedor) {
            res.status(404).json({
                message: "No se encontró el Vendedor para actualizar con id = " + vendedorId,
                vendedor: "",
                error: "404"
            });
        } else {
            // Actualizar los datos del vendedor
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                edad: req.body.edad,
                correo: req.body.correo,
                telefono: req.body.telefono
            };
            let result = await Vendedor.update(updatedObject, { returning: true, where: { id: vendedorId } });

            // Responder al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el Vendedor con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Vendedor actualizado exitosamente con id = " + vendedorId,
                vendedor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el Vendedor con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un Vendedor por ID
exports.deleteById = async (req, res) => {
    try {
        let vendedorId = req.params.id;
        let vendedor = await Vendedor.findByPk(vendedorId);

        if (!vendedor) {
            res.status(404).json({
                message: "No existe un Vendedor con id = " + vendedorId,
                error: "404",
            });
        } else {
            await vendedor.destroy();
            res.status(200).json({
                message: "Vendedor eliminado exitosamente con id = " + vendedorId,
                vendedor: vendedor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el Vendedor con id = " + req.params.id,
            error: error.message,
        });
    }
};
