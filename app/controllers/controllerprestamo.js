const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;

exports.create = (req, res) => {
    let prestamo = {};

    try {
        prestamo.codigoLibro = req.body.codigoLibro;
        prestamo.codigoUsuario = req.body.codigoUsuario;
        prestamo.fechaSalida = req.body.fechaSalida;
        prestamo.fechaMaximaDevolucion = req.body.fechaMaximaDevolucion;
        prestamo.fechaDevolucion = req.body.fechaDevolucion;

        Prestamo.create(prestamo).then(result => {
            res.status(200).json({
                message: "Préstamo creado exitosamente con número de pedido = " + result.numeroPedido,
                prestamo: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
};

// Recuperar todos los Préstamos
exports.retrieveAll = (req, res) => {
    Prestamo.findAll()
        .then(prestamoInfos => {
            res.status(200).json({
                message: "¡Todos los Préstamos recuperados exitosamente!",
                prestamos: prestamoInfos
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

// Recuperar un Préstamo por ID
exports.getById = (req, res) => {
    let prestamoId = req.params.id;
    Prestamo.findByPk(prestamoId)
        .then(prestamo => {
            if (!prestamo) {
                res.status(404).json({
                    message: "Préstamo no encontrado con número de pedido = " + prestamoId,
                });
            } else {
                res.status(200).json({
                    message: "¡Préstamo recuperado exitosamente con número de pedido = " + prestamoId,
                    prestamo: prestamo
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

// Actualizar un Préstamo por ID
exports.updateById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No se encontró el Préstamo para actualizar con número de pedido = " + prestamoId,
                prestamo: "",
                error: "404"
            });
        } else {
            // Actualizar los datos del préstamo
            let updatedObject = {
                codigoLibro: req.body.codigoLibro,
                codigoUsuario: req.body.codigoUsuario,
                fechaSalida: req.body.fechaSalida,
                fechaMaximaDevolucion: req.body.fechaMaximaDevolucion,
                fechaDevolucion: req.body.fechaDevolucion
            };
            let result = await Prestamo.update(updatedObject, { returning: true, where: { numeroPedido: prestamoId } });

            // Responder al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el Préstamo con número de pedido = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Préstamo actualizado exitosamente con número de pedido = " + prestamoId,
                prestamo: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el Préstamo con número de pedido = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un Préstamo por ID
exports.deleteById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No existe un Préstamo con número de pedido = " + prestamoId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Préstamo eliminado exitosamente con número de pedido = " + prestamoId,
                prestamo: prestamo,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el Préstamo con número de pedido = " + req.params.id,
            error: error.message,
        });
    }
};
