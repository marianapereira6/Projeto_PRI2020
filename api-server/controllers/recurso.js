// Controlador para o modelo Recurso
/*
var Recurso = require('../models/recurso')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})



// Devolve a lista de recursos
module.exports.listar = () => {
    return Recurso
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Recurso
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = p => {
    var novo = new Recurso(p)
    return novo.save()
}

module.exports.remover = function(id){
    return Recurso.deleteOne({_id: id})
}

module.exports.alterar = function(r){
    return Recurso.findByIdAndUpdate({_id: r._id}, r, {new: true})
}
*/