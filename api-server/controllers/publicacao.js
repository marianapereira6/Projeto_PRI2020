// Controlador para o modelo Publicacao

var Publicacao = require('../models/publicacao')


// Devolve a lista de publicacoes
module.exports.listar = () => {
    return Publicacao
        .find()
        .sort( { data : -1 })
        .exec()
}

// Devolve a lista de publicacoes
module.exports.listarPerfil = (autor) => {
    return Publicacao
        .find({autor: autor})
        .sort( {data : -1} )
        .exec()
}

// Devolve a lista de publicacoes por autor, producer
module.exports.listarAutor = (autor) => {
    return Publicacao
        .find({autor: autor})
        .sort( {data : -1} )
        .exec()
}

// Devolve a lista de publicacoes por autor, consumer
module.exports.listarAutorLevel = (level, autor) => {
    return Publicacao
        .find({visibilidade: level,autor: autor})
        .exec()
}

// Devolve a lista de publicacoes por autor, producer
module.exports.listarTipo = (tipo) => {
    return Publicacao
        .find({tipo: tipo})
        .sort( {data : -1} )
        .exec()
}

// Devolve a lista de publicacoes por autor, consumer
module.exports.listarTipoLevel = (level, tipo) => {
    return Publicacao
        .find({visibilidade: level,tipo: tipo})
        .exec()
}



module.exports.listarTitulo= (titulo) => {
    return Publicacao
        .find({titulo:{ $regex: titulo}})
        .sort( {data : -1} )
        .exec()
}

// Devolve a lista de publicacoes por autor, consumer
module.exports.listarTituloLevel = (level, titulo) => {
    return Publicacao
       .find({visibilidade: level,titulo: { $regex: titulo}})
        .exec()
}

// Devolve a lista de publicacoes por autor, producer
module.exports.listarAno = (ano) => {
    return Publicacao
        .find( {data: { $regex: ano}})
        .sort( {data : -1} )
        .exec()
}

// Devolve a lista de publicacoes por autor, consumer
module.exports.listarAnoLevel = (level, ano) => {
    return Publicacao
        .find({visibilidade: level,data: { $regex: ano}})
        .exec()
}

// Devolve a lista de publicacoes por autor, producer
module.exports.listarAnoC = (ano) => {
    return Publicacao
        .find( {dataCriacao: { $regex: ano}})
        .sort( {data : -1} )
        .exec()
}

// Devolve a lista de publicacoes por autor, consumer
module.exports.listarAnoCLevel = (level, ano) => {
    return Publicacao
        .find({visibilidade: level,dataCriacao: { $regex: ano}})
        .exec()
}




module.exports.findByLevel = level => {
    return Publicacao
        .find({visibilidade: level})
        .exec()
}


module.exports.consultar = id => {
    return Publicacao
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = p => {
    var novo = new Publicacao(p)
    return novo.save()
}

module.exports.remover = function(id){
    return Publicacao.deleteOne({_id: id})
}

module.exports.alterar = function(t){
    return Publicacao.findByIdAndUpdate({_id: t._id}, t, {new: true})
}

module.exports.star = (id) =>{
    return Publicacao
        .find({_id:id},{stars:1})
        .exec()  
}


module.exports.addStar = (id,t) =>{
    return Publicacao
        .findByIdAndUpdate({_id: id },{stars :t}, {new: true})
        .exec()
}

module.exports.addStarComent = (id,i,t) =>{
    return Publicacao
        .find({_id: id},{comentarios:1})
        .findByIdAndUpdate({_id: i },{stars :t}, {new: true})
        .exec()
}



module.exports.deletepost = (id) =>{
    return Publicacao
        .deleteOne({_id: id })
}


module.exports.comentarios = (id) =>{

    return Publicacao
    .find({_id: id},{comentarios:1})
    .sort()
    .exec()
    
}

module.exports.comentarioDeleteFeed = (id,idC, user) =>{
    return Publicacao
    .updateOne(
        {_id:id},
        {$pull : 
            {comentarios: { _id:idC, user_id : user  } }
        }  
    )
    .exec()
}

module.exports.comentarioDelete = (id,idC) =>{
    return Publicacao
    .updateOne(
        {_id:id},
        {$pull : 
            {comentarios: { _id:idC} }
        }  
    )
    .exec()
}

module.exports.verificaGostoComentario =  (idPub, idComentario,idUser) => {
 
    return Publicacao
    .find({ _id: idPub ,"comentarios._id" : idComentario  }).exec()

}






module.exports.comentarioStar = (id,idC,idUser) =>{
    return Publicacao
    .updateOne({ _id: id ,"comentarios._id" : idC  }, 
    
    {$push : {"comentarios.$.stars.users" : idUser },
    $inc : {"comentarios.$.stars.numero" : 1}})
    .exec()
}


module.exports.comentarioStarP = (id,idC,idUser) =>{
    return Publicacao
    .updateOne({ _id: id ,"comentarios._id" : idC }, 
    {$pull : {"comentarios.$.stars.users" : idUser },
    $inc : {"comentarios.$.stars.numero" : -1}})
    .exec()
}


module.exports.comentarioAdd = (id,t) =>{
    
    return Publicacao
        .findByIdAndUpdate({_id: id },{comentarios :t}, {new: true})
}

