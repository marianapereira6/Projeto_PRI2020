// Controlador para o modelo Tarefa

var User = require('../models/user')

// Devolve a lista de Tarefas
module.exports.listar = () => {
   
    return User
            .find({level : {$ne : "admin"}})
            .exec()
    }


module.exports.consultar = uname => {
    return User
        .findOne({username: uname})
        .exec()
}

module.exports.inserir = u => {
    var novo = new User(u)
    return novo.save()
}

module.exports.deleteOne = function(id){
    return User.deleteOne({_id: id})
}


module.exports.editar = (uname, user) => {
    return User
        .updateOne({username: uname}, user)
}




