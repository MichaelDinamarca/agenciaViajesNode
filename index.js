// const express = require('express');// version de common js
import express from 'express';//imports express
import router from './routes/index.js';
import db from './config/db.js';

// dotenv.config();
console.log(process.env.DB_HOST)

const app = express();

// Conectar la db
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//--------> npm run dev para echar a andar el Servidor
// Definir puerto 
const port = process.env.PORT || 4000;

// Habilitar Pug (npm i pug)->una vez instalado pug(para template plantillas)
app.set('view engine', 'pug');

// Obtener el anyo actual
app.use((req, res, next)=>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear(); //es el middleware locals es para las variables locales
    res.locals.nombresitio = "Agencia de Viajes";
    return next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica con css y img
app.use(express.static('public'));

// Agregar Router
app.use('/', router);// use es el verbo que soporta los demas(post,get,etc)


app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
})
 