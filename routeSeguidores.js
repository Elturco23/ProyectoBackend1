const express = require('express')
const router = express.Router()
const PublicacionModel = require("./models/publicacion_model")
const UserModel = require("./models/usuario_model")
const mongoose = require("mongoose");
router.get('/seguidores/:id_usuario', async (req,res) => {
    const id= req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
   const seguidores= await UserModel.findById(id,{seguidores:1});
   res.json(seguidores)
    
})
router.get('/seguidos/:id_usuario', async (req,res) => {
    const id= req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
   const seguidos= await UserModel.findById(id,{seguidos:1});
   res.json(seguidos)
    
})
router.put('/createSeguidor/:id_usuario/:id_seguidor', async (req,res) => {
    const id_usuario= req.params.id_usuario;
    const id_seguidor=req.params.id_seguidor;
    // CREACION DE DOCUMENTO SEGUN MODELO
   if(id_usuario!=id_seguidor){
     try{
        const usuarioseguidor= await UserModel.findById(id_seguidor);
        const usuario= await UserModel.findByIdAndUpdate(id_usuario,{
            $push:{
                'seguidores':usuarioseguidor
            }
        });
        const seguidor= await UserModel.findByIdAndUpdate(id_seguidor,{
            $push:{
       'seguidos':usuario
            }
        });
       
    res.json({
        Mensaje:'Se agregó correctamente el vinculo'
    });

    }catch(e){
     res.json(e.message); 
    }
}else{
    console.log('El id es igual ')
}
    
})
router.put('/deleteVinculo/:id_usuario/:id_seguidor', async (req,res) => {
    const id_usuario= req.params.id_usuario;
    const id_seguidor=req.params.id_seguidor;
    // CREACION DE DOCUMENTO SEGUN MODELO
    if(id_usuario!=id_seguidor){
        try{
           const usuarioseguidor= await UserModel.findById(id_seguidor);
           const usuario= await UserModel.findByIdAndUpdate(id_usuario,{
               $pull:{
                   seguidores:mongoose.Types.ObjectId(id_seguidor)
               }
           });
           const seguidor= await UserModel.findByIdAndUpdate(id_seguidor,{
               $pull:{
          seguidos:mongoose.Types.ObjectId(id_usuario)
        }
         }
           );
          
           res.json({
            Mensaje:'Se eliminó correctamente el vinculo'
        });
       
       }catch(e){
        res.json(e.message); 
       }
   }else{
       console.log('El id es igual ')
   }
})
module.exports = router;