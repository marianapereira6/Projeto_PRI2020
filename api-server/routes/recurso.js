// Roteador do servidor API para o problema da gestão de recursos

var express = require('express');
var router = express.Router();
const Recurso = require('../controllers/publicacao')
var multer = require('multer')



// Listar todos os recursos
router.get('/recursos',function(req, res) {
  if(req.user.level === 'producer' || req.user.level === 'admin'){
    Recurso.listar()
      .then(dados => res.status(200).jsonp(dados) )
      .catch(e => res.status(500).jsonp({error: e}))
  }
  else{  
    Recurso.findByLevel(req.user.level)
      .then(dados => res.status(200).jsonp(dados) )
      .catch(e => res.status(500).jsonp({error: e}))
    }
    
  });

// Listar todos os recursos por autor
router.get('/pesquisar',function(req, res) {
  if (req.query.type === "autor"){
    if(req.user.level === 'producer' || req.user.level === 'admin'){
      Recurso.listarAutor(req.query.search)
        .then(dados => {
        res.status(200).jsonp(dados)} )
        .catch(e => res.status(500).jsonp({error: e}))
    }
    else{  
      Recurso.listarAutorLevel(req.user.level,req.query.search)
        .then(dados => res.status(200).jsonp(dados) )
        .catch(e => res.status(500).jsonp({error: e}))
    }
  }
  else if (req.query.type === "tipo"){
    if(req.user.level === 'producer' || req.user.level === 'admin'){
      Recurso.listarTipo(req.query.search)
        .then(dados => {
        res.status(200).jsonp(dados)} )
        .catch(e => res.status(500).jsonp({error: e}))
    }
    else{  
      Recurso.listarTipoLevel(req.user.level,req.query.search)
        .then(dados => res.status(200).jsonp(dados) )
        .catch(e => res.status(500).jsonp({error: e}))
    }
  }
  else if (req.query.type === "ano"){
    if(req.user.level === 'producer' || req.user.level === 'admin'){
      
      Recurso.listarAno(req.query.search)
        .then(dados => {
        res.status(200).jsonp(dados)} )
        .catch(e => res.status(500).jsonp({error: e}))
    }
    else{  
      Recurso.listarAnoLevel(req.user.level,req.query.search)
        .then(dados => res.status(200).jsonp(dados) )
        .catch(e => res.status(500).jsonp({error: e}))
    }
  }
  else if (req.query.type === "anoC"){
    if(req.user.level === 'producer' || req.user.level === 'admin'){
     
      Recurso.listarAnoC(req.query.search)
        .then(dados => {
        res.status(200).jsonp(dados)} )
        .catch(e => res.status(500).jsonp({error: e}))
    }
    else{  
      Recurso.listarAnoCLevel(req.user.level,req.query.search)
        .then(dados => res.status(200).jsonp(dados) )
        .catch(e => res.status(500).jsonp({error: e}))
    }
  }
  else if (req.query.type === "titulo")  {
    if(req.user.level === 'producer' || req.user.level === 'admin'){
      Recurso.listarTitulo(req.query.search)
        .then(dados => {
        res.status(200).jsonp(dados)} )
        .catch(e => res.status(500).jsonp({error: e}))
    }
    else{  
      Recurso.listarTituloLevel(req.user.level,req.query.search)
        .then(dados => res.status(200).jsonp(dados) )
        .catch(e => res.status(500).jsonp({error: e}))
    }
  }
});

// Listar todos os recursos pessoa
router.get('/recursos/perfil',function(req, res) {
  
    Recurso.listarPerfil(req.user.username)
      .then(dados => res.status(200).jsonp(dados) )
      .catch(e => res.status(500).jsonp({error: e}))
  
  });

router.post('/files',function (req, res) {
   
    console.log(req.body)
    var publicacao = {}
    
    var date = new Date()
    var stars = {
      numero :0,
      users : []
    }

    publicacao.titulo=req.body.titulo
    publicacao.autor= req.user.username
    publicacao.visibilidade = req.body.visibilidade
    publicacao.tipo = req.body.tipo
    publicacao.tema = req.body.tema
    publicacao.dataCriacao = req.body.dataCriacao
    if(req.body.descricao)
      publicacao.descricao=req.body.descricao

    if(req.body.subtitulo)
      publicacao.subtitulo=req.body.subtitulo


    publicacao.data = date
    publicacao.stars = stars,
    publicacao.files = req.body.myFile


    Recurso.inserir(publicacao)
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
})


router.delete('/deletepost', function(req, res) {
    
  Recurso.deletepost(req.query._id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/stars', function(req, res) {
  Recurso.star(req.query._id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});



router.post('/addStar', function(req, res) {
    
  Recurso.star(req.query._id)
    .then(dados =>{ 
      
      var startN = dados[0].stars.numero
      var startC= dados[0].stars.users
      
      if(!startC.includes(req.user.username)){
        startN++;
        startC.push(req.user.username)
        var stars = {
          numero : startN,
          users : startC
        }
      } 
      else {
        startN--;
        startC.remove(req.user.username)
        var stars = {
          numero : startN,
          users : startC
        }
      }
      Recurso.addStar(req.query._id,stars)
        .then(lista => {
          res.status(200).jsonp(lista)
        })
        .catch(e => res.status(500).jsonp({error: e}))
    })
    .catch(e => res.status(500).jsonp({error: e}))
});



router.get('/comentarios', function(req, res) {
  Recurso.comentarios(req.query._id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});



router.post('/addComentarios', function(req, res) {
  
  var coment = {}
  var data = new Date()
  var stars = {
    numero :0,
    users : []
  }
  coment.data = data
  coment.stars = stars
  coment.text = req.body.text
  coment.user_id = req.user.username
 
  Recurso.comentarios(req.query._id)
    .then(dados =>{ 
      
      var novoComentarios= dados[0].comentarios;
      novoComentarios.push(coment)
      Recurso.comentarioAdd(req.query._id,novoComentarios)
        .then(lista => {
          res.status(200).jsonp(lista)
        })
        .catch(e => res.status(500).jsonp({error: e}))
    })
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/addStarComent', function(req, res) {
  Recurso.verificaGostoComentario(req.query._id,req.query.i,req.user.username)
    .then(dados =>{
      dados.forEach(element => {
        
       
        element.comentarios.forEach(c => {
          if(c._id  ==req.query.i )
        {
          
       
      if(!c.stars.users.includes(req.user.username)){
        Recurso.comentarioStar(req.query._id,req.query.i,req.user.username )
      .then(comentarios => { 
        res.status(200).jsonp(comentarios)}) 
      .catch(e => res.status(500).jsonp({error: e}))
      }
      else {
        Recurso.comentarioStarP(req.query._id,req.query.i,req.user.username )
      .then(comentarios => { 
        res.status(200).jsonp(comentarios)}) 
      .catch(e => res.status(500).jsonp({error: e}))
      }}
      
    } )

  }
  )
});

});




router.delete('/deleteComent', function(req, res) { 
  Recurso.comentarioDelete(req.query._id,req.query.i)
    .then(comentarios => res.status(200).jsonp(comentarios)) 
    .catch(e => res.status(500).jsonp({error: e}))  
});


router.delete('/deleteComentFeed', function(req, res) { 

  Recurso.comentarioDeleteFeed(req.query._id,req.query.i,req.user.username)
    .then(comentarios => res.status(200).jsonp(comentarios)) 
    .catch(e => res.status(500).jsonp({error: e}))  
});



module.exports = router;