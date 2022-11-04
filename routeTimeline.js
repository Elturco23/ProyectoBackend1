const express = require('express')
const router = express.Router()
const PublicacionModel = require("./models/publicacion_model")
const UserModel = require("./models/usuario_model")

router.get('/:id_usuario', async (req,res) => {
    const id_usuario= req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
    let todospublicaciones=[];
    const usuariosseguidos= await UserModel.findById(id_usuario,{seguidos:1,_id:0});
   const publicaciones=usuariosseguidos.seguidos
   for (let index = 0; index < publicaciones.length; index++) {
  const id=publicaciones[index]
   todospublicaciones[index] = await (await PublicacionModel.find({id_usuario:id},{id_usuario:1,titulo:1,descripcion:1,createdAt:1}));
    
   }
  todospublicaciones=todospublicaciones.flat()
   function arrayordenado(array){
   return array.sort(
    function(a, b){ 
    return   new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()}
    )
   }
   // ordenado desde la publicacion mas reciente a la mas antigua
   res.json(arrayordenado(todospublicaciones))
  } 
    )

module.exports = router;