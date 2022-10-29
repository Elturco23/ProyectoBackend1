const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre:  {type: String, required: true},
  apellido: {type: String, required: true},
  telefono:  {type: Number, required: true},
  fecha_nacimiento: {type:Date,required:true},
  usuario:{type:String,require:true,unique:true},
  seguidos:[{
    type:mongoose.Schema.ObjectId,
    ref:'usuarios',
    
  }],
  seguidores:[{
    type:mongoose.Schema.ObjectId,
    ref:'usuarios',
   
  }],
  likes:[{
    type:mongoose.Schema.ObjectId,
    ref:'publicaciones',
   
  }],
  },{
    versionKey:false
  });
const user=mongoose.model('usuarios', userSchema);
module.exports = user;