const mongoose = require("mongoose");

const PublicacionSchema = new mongoose.Schema({
  titulo: { type: String, required: true, immutable:true },
  descripcion: { type: String, required: true },
  id_usuario: {type: mongoose.Schema.ObjectId,immutable:true},
  likes:[{
    type:mongoose.Schema.ObjectId,
    ref:'usuarios'
  }
  ]
},{
    timestamps:true
});
const tweet = mongoose.model("publicaciones", PublicacionSchema);
module.exports = tweet;
