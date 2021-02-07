const mongoose = require('mongoose')

var fileSchema = new mongoose.Schema({
    name: String,
    mimetype: String,
    size: Number,
    originalName:String
})

var starSchema = new mongoose.Schema({
    numero : { type : Number, required : true},
    users: [String]
},{_id:false})


var comentarioSchema = new mongoose.Schema({
  id: String,
  data: { type: String, required: true },
  user_id: { type: String, required: true },
  text: {type: String, required: true},
  stars :{type : starSchema ,required: true}
});


var publicacaoSchema = new mongoose.Schema({
  
  id : String,
  titulo: {type : String , required : true},
  subtitulo : String,
  autor : { type: String, required: true },
  tema: {type : String , required : true},
  descricao : String,
  tipo : {type : String , required : true},
  data : { type: String, required: true },
  dataCriacao : { type: String, required: true },
  stars : {type : starSchema ,required: true},
  comentarios : [comentarioSchema],
  files : [fileSchema],
  visibilidade: {type : String , required : true},

});



module.exports = mongoose.model('publicacao', publicacaoSchema)

