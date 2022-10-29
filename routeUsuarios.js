const { response } = require('express');
const express = require('express')
const router = express.Router()
const UserModel = require("./models/usuario_model")

router.post('/createuser', async (req,res) => {
    
    // CREACION DE DOCUMENTO SEGUN MODELO
    try{
        const { nombre, apellido, telefono, fecha_nacimiento,usuario } = req.body;
        const newUsuario = new UserModel({
          nombre,
          apellido,
          telefono,
          fecha_nacimiento,
          usuario
        });
    const user= await newUsuario.save()
    res.json(user);
    }catch(e){
     res.json(e.message); 
    }
})
router.get('/', async (req,res) => {
    
    // CREACION DE DOCUMENTO SEGUN MODELO
   const usuarios= await UserModel.find({});
   res.json(usuarios)
    
})
router.get('/:id', async (req,res) => {
    const id= req.params.id;
    // CREACION DE DOCUMENTO SEGUN MODELO
   const usuarios= await UserModel.findById(id);
   res.json(usuarios)
    
})
router.put('/update/:id', async (req,res) => {
    const id= req.params.id;
    // CREACION DE DOCUMENTO SEGUN MODELO
    try{
        const update = req.body;
        
    const updateuser= await UserModel.findByIdAndUpdate(id,update)
    res.json(updateuser);
    }catch(e){
     res.json(e.message); 
    }
})
router.delete('/delete/:id', async (req,res) => {
    const id= req.params.id;
    // CREACION DE DOCUMENTO SEGUN MODELO
    try{
    const deleteuser= await UserModel.findByIdAndRemove(id)
    res.json(deleteuser);
    }catch(e){
     res.json(e.message); 
    }
})
module.exports = router;