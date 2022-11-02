const express = require('express');
const app = express();
const mongoose = require('mongoose');

// MIDDLEWARE JSON
app.use(express.json());

// CONEXION MONGO
mongoose.connect(
    "mongodb+srv://jrianop:jorge23082000@cluster0.27emz.mongodb.net/Twitter?retryWrites=true&w=majority"
    )
.then(() => {
    console.log("Exito");
})
.catch((e) => {
    console.log(e)
    console.log("Jumbo")
})

// DECLARACION DE RUTA
const route1 = require('./routeUsuarios')
const route2= require('./routePublicaciones')
const route3= require('./routeSeguidores')
const route4= require('./routeLikes')
const route5= require('./routeTimeline')
app.use("/user", route1)
app.use("/tweet", route2)
app.use("/follower", route3)
app.use("/like", route4)
app.use("/timeline", route5)
// ABRIR PUERTO PARA APP
app.listen(3001, () => console.log("Hola"));



