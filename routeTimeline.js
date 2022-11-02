const express = require('express')
const router = express.Router()
const PublicacionModel = require("./models/publicacion_model")
const UserModel = require("./models/usuario_model")

router.get('/:id_usuario', async (req,res) => {
    const id_usuario= req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
    let todospublicaciones=[];
    const usuariosseguidos= await UserModel.findById(id_usuario,{seguidos:1,_id:0});
   const publicaciones=usuariosseguidos.seguidos.map(async (id)=>{ 
    return await PublicacionModel.find({id_usuario:id},{id_usuario:1,titulo:1,descripcion:1,createdAt:1},
        )
  } 
    )
    Promise.all(publicaciones).then((allpublicaciones)=>{
        res.json(allpublicaciones)
    })
    

  

    
})
module.exports = router;