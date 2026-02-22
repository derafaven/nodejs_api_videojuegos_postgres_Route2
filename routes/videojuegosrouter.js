//rutas o url que tendra el servidor
const {Router} = require('express');
const express = require('express');
const router = Router();

const {obtenerTodosLosVideojuegos, 
        obtenerVideojuegoPorId,
        crearVideojuego,
        actualizarVideojuegoPorId,
        borrarVideojuegoPorId} = require('../controladores/videojuegoscontrolador');

//route 2
const r_videojuegos = express.Router();
router.use('/api/videojuegos', r_videojuegos);

router.get("/", (req, res) => {
    return res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Api videojuegos</title>
        <style>
            html {
                height: 100%;
            }
            body {
                margin: 0%;
                background-color: black;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                font-family: Arial, Helvetica, sans-serif;
                text-align: center;
            }
        </style>

    </head>
    <body>
        <div>
            <h1>Api de videojuegos funcionando</h1>
            <p>Servidor Activo</p>
        </div>
    </body>
    </html>`);
});

r_videojuegos.get('/', obtenerTodosLosVideojuegos);
r_videojuegos.get('/:id', obtenerVideojuegoPorId);
r_videojuegos.post('/', crearVideojuego);
r_videojuegos.put('/:id', actualizarVideojuegoPorId);
r_videojuegos.delete('/:id', borrarVideojuegoPorId);

module.exports = router;