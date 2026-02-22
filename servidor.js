const express = require("express");
const cors = require("cors");
const {probarConexion} = require('./configuracion/baseDatos');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/videojuegosrouter'));

const iniciarServidor = async () => {
    try {
        await probarConexion();

        app.listen(port, () => {
            console.log("Servidor de node escuchando en http://localhost:"+port)
        });
    } catch (error) {
        console.error(`Error al iniciar`, error.message)
    }
};

iniciarServidor();

/*
app.listen(port, () => {
    console.log("Servidor6 de node escuchando en http://localhost:"+port)
});
*/

/*
https://youtu.be/sx0tKwO2qJo?si=kOsYjlSVirWDbkym
*/