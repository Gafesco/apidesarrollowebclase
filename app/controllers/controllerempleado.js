const db = require('../config/db.config.js');
const Empleado = db.Empleado;


exports.create = (req, res) => {
    let empleado = {};

    try {

        empleado.nombre = req.body.nombre;
        empleado.apellido = req.body.apellido;
        empleado.direccion = req.body.direccion;
        empleado.edad = req.body.edad;
        empleado.correo = req.body.correo;
        empleado.telefono = req.body.telefono;


        Empleado.create(empleado).then(result => {

            res.status(200).json({
                message: "Empleado creado exitosamente con id = " + result.id,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
};

// Recuperar todos los Empleados
exports.retrieveAll = (req, res) => {
    Empleado.findAll()
        .then(empleadoInfos => {
            res.status(200).json({
                message: "¡Todos los Empleados recuperados exitosamente!",
                empleados: empleadoInfos
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

// Recuperar un Empleado por ID
exports.getById = (req, res) => {
    let empleadoId = req.params.id;
    Empleado.findByPk(empleadoId)
        .then(empleado => {
            if (!empleado) {
                res.status(404).json({
                    message: "Empleado no encontrado con id = " + empleadoId,
                });
            } else {
                res.status(200).json({
                    message: "¡Empleado recuperado exitosamente con id = " + empleadoId,
                    empleado: empleado
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

// Actualizar un Empleado por ID
exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No se encontró el Empleado para actualizar con id = " + empleadoId,
                empleado: "",
                error: "404"
            });
        } else {
            // Actualizar los datos del empleado
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                edad: req.body.edad,
                correo: req.body.correo,
                telefono: req.body.telefono
            };
            let result = await Empleado.update(updatedObject, { returning: true, where: { id: empleadoId } });

            // Responder al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el Empleado con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Empleado actualizado exitosamente con id = " + empleadoId,
                empleado: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el Empleado con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un Empleado por ID
exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No existe un Empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Empleado eliminado exitosamente con id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el Empleado con id = " + req.params.id,
            error: error.message,
        });
    }
};
