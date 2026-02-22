const {pool} = require('../configuracion/baseDatos');

const obtenerTodosLosVideojuegos = async (req, res) => {
    try {
        const consulta = 'select * from videojuegos order by id asc';
        const resultado = await pool.query(consulta);

        res.json({
            exito: true,
            mensaje: 'Videojuegos obtenidos correctamente',
            datos: resultado.rows,
            total: resultado.rows.length
        })
    } catch (error) {
        console.error(`Error:`, error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al obtener los videojuegos',
            error: error.message
        });
    }
};

const obtenerVideojuegoPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const consulta = `select * from videojuegos where id = $1`;
        const resultado = await pool.query(consulta, [id]);

        if(resultado.rows.length === 0){
            return res.status(404).json({
                exito: false,
                mensaje: 'Videojuegos no encontrado'
            });
        }

        res.json({
            exito: true,
            mensaje: 'Videojuego encontrado correctamente',
            datos: resultado.rows,
            total: resultado.rows.length
        });

    } catch (error) {
        console.error(`Error:`, error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al obtener el videojuego',
            error: error.message
        });
    }
};

const crearVideojuego = async (req, res) => {
    try {
        const {nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion} = req.body;

        if (!nombre || !genero || !plataforma || !precio) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Los campos nombre, genero, plataforma y precio son obligatorios'
            });
        }

        const consulta = `Insert into videojuegos (
                            nombre,
                            genero,
                            plataforma,
                            precio,
                            fecha_lanzamiento,
                            desarrollador,
                            descripcion
                        )
                        values ($1, $2, $3, $4, $5, $6, $7)
                        returning *`;

        const valores = [nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion];
        
        const resultado = await pool.query(consulta, valores);

        res.status(201).json({
                exito: true,
                mensaje: 'Videojuego creado exitosamente',
                datos: resultado.rows[0]
        });

    } catch (error) {
        console.error(`Error:`, error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al crear el videojuego',
            error: error.message
        });
    }
};

const actualizarVideojuegoPorId = async (req, res) => {
    try {
        const {id} = req.params;

        const {nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion} = req.body;

        if (!nombre || !genero || !plataforma || !precio) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Los campos nombre, genero, plataforma y precio son obligatorios'
            });
        }

        const consulta = `
            Update videojuegos 
            Set
                nombre = $1,
                genero = $2,
                plataforma = $3,
                precio = $4,
                fecha_lanzamiento = $5,
                desarrollador = $6,
                descripcion = $7
            where id = $8
            returning *`;

        const valores = [nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion, id];
        
        const resultado = await pool.query(consulta, valores);

        if(resultado.rows.length === 0){
            return res.status(404).json({
                exito: false,
                mensaje: 'Videojuegos no encontrado'
            });
        }

        res.status(201).json({
                exito: true,
                mensaje: 'Videojuego actualizado exitosamente',
                datos: resultado.rows[0]
        });

    } catch (error) {
        console.error(`Error:`, error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al actualizar el videojuego',
            error: error.message
        });
    }
};

const borrarVideojuegoPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const consulta = `delete from videojuegos where id = $1 returning *`;
        const resultado = await pool.query(consulta, [id]);

        if(resultado.rows.length === 0){
            return res.status(404).json({
                exito: false,
                mensaje: 'Videojuegos no encontrado'
            });
        }

        res.json({
            exito: true,
            mensaje: 'Videojuego borrado correctamente',
            datos: resultado.rows,
            total: resultado.rows.length
        });

    } catch (error) {
        console.error(`Error:`, error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al borrar el videojuego',
            error: error.message
        });
    }
};

module.exports = {
    obtenerTodosLosVideojuegos,
    obtenerVideojuegoPorId,
    crearVideojuego,
    actualizarVideojuegoPorId,
    borrarVideojuegoPorId
};