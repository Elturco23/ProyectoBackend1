const express = require('express')
const router = express.Router()
const PublicacionModel = require("./models/publicacion_model")
const UserModel = require("./models/usuario_model")
const mongoose = require("mongoose");
router.get('/likes/:id_usuario', async (req,res) => {
    const id= req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
   const publicaciones= await UserModel.findById(id,{likes:1});
   res.json(publicaciones)
    
})
// Crear Like
router.put('/createLike/:id_usuario/:id_publicacion', async (req,res) => {
    const id_usuario= req.params.id_usuario;
    const id_publicacion=req.params.id_publicacion;
    // CREACION DE DOCUMENTO SEGUN MODELO
   
     try{
        const publicacion= await PublicacionModel .findById(id_publicacion);
        const usuario= await UserModel.findByIdAndUpdate(id_usuario,{
            $push:{
                'likes':publicacion
            }
        });
        const publicacionlikeada= await PublicacionModel.findByIdAndUpdate(id_publicacion,{
            $push:{
       'likes':usuario
            }
        });
       
    res.json({
        Mensaje:'Se agregó correctamente el like'
    });

    }catch(e){
     res.json(e.message); 
    }
})
router.put('/deleteLike/:id_usuario/:id_publicacion', async (req,res) => {
    const id_usuario= req.params.id_usuario;
    const id_publicacion=req.params.id_publicacion;
    // CREACION DE DOCUMENTO SEGUN MODELO
    
        try{
            const publicacion= await PublicacionModel .findById(id_publicacion);
           const usuario= await UserModel.findByIdAndUpdate(id_usuario,{
               $pull:{
                   likes:mongoose.Types.ObjectId(id_publicacion)
               }
           });
           const publicacionlikeada= await PublicacionModel.findByIdAndUpdate(id_publicacion,{
               $pull:{
               likes:mongoose.Types.ObjectId(id_usuario)
        }
         }
           );
          
           res.json({
            Mensaje:'Se borró correctamente el like'
        });
       
       }catch(e){
        res.json(e.message); 
       }
   })
module.exports = router;