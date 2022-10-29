const express = require('express')
const router = express.Router()
const PublicacionModel = require("./models/publicacion_model")
const UserModel = require("./models/usuario_model")

router.get('/:id_usuario', async (req,res) => {
    const id= req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
   const publicaciones= await PublicacionModel.find({id_usuario:id});
   res.json(publicaciones)
    
})
router.post('/createTweet/:id', async (req,res) => {
    const id_usuario= req.params.id;
    // CREACION DE DOCUMENTO SEGUN MODELO
     try{
        const usuarios= await UserModel.findById(id_usuario);
        const { titulo,descripcion } = req.body;
        const newPublicacion = new PublicacionModel({
          titulo,
          descripcion,
          id_usuario
        });
    const publicacion= await newPublicacion.save()
    res.json(publicacion);
    }catch(e){
     res.json(e.message); 
    }

    
})
router.put('/update/:id', async (req,res) => {
    const id= req.params.id;
    // CREACION DE DOCUMENTO SEGUN MODELO
    try{
        const update = req.body;
        
    const updatepublicacion= await PublicacionModel.findByIdAndUpdate(id,update)
    res.json(updatepublicacion);
    }catch(e){
     res.json(e.message); 
    }
})
router.delete('/delete/:id', async (req,res) => {
    const id= req.params.id;
    // CREACION DE DOCUMENTO SEGUN MODELO
    try{
    const deletepublicacion= await PublicacionModel.findByIdAndRemove(id)
    res.json(deletepublicacion);
    }catch(e){
     res.json(e.message); 
    }
})
module.exports = router;