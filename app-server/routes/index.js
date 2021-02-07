var express = require('express');
const user = require('../../auth-server/models/user');
var router = express.Router();
var axios = require('axios');
const fs = require('fs')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var path = require('path');
var {nanoid} = require('nanoid');
const e = require('express');


/* GET home page. */
router.get('/',verificaAutenticacao, function(req, res) {
  res.render('index');
});

/* Login page */
router.get('/login',function(req, res) {
  res.render('login-form' );
});

router.get('/logout',function(req, res) {
  res.clearCookie("token")
    res.redirect('/')
})
/* vai para a página de registo de um user */
router.get('/registo',function(req, res) {
  res.render('registo');
});



/*vai para a paǵina do perfil do user*/
router.get('/perfil', function(req,res){
  console.log(req.cookies.token)
  axios.get('http://localhost:8002/users/perfil?token='+req.cookies.token)
    .then(dados => {
      axios.get('http://localhost:8001/recurso/recursos/perfil'+"?token="+req.cookies.token)
      .then(recursos => {
       res.render('perfil', {user: dados.data, recursos:recursos.data})})
      })
    .catch(erro => 
      res.redirect("/logout")
      
     )
});

/*página para editar o perfil */
router.get('/perfil/editar',function(req, res) {
  axios.get('http://localhost:8002/users/perfil?token='+req.cookies.token)
    .then(dados => res.render('editar-perfil', { user: dados.data }))
    .catch(e => res.render('error', {error: e}))
});


router.get('/users',function(req, res) {
  axios.get('http://localhost:8002/users')
    .then(lista => {
      
      res.render('listaUser',{lista:lista.data.dados} );
    })
    .catch(e => res.redirect("/logout"))
 
});

/* pagina de adicionar recursos*/
router.get('/addFiles',function(req, res) {
  res.render('upload');
});

/*vai para o feed de um produtor*/
router.get('/feed',function(req, res) {
  axios.get('http://localhost:8002/users/perfil?token='+req.cookies.token)
     .then(dados => {
      if (req.query.search != " " && req.query.search != null && req.query.type != " " && req.query.type != null ){
      
        axios.get('http://localhost:8001/recurso/pesquisar?token='+req.cookies.token+'&search='+req.query.search+'&type='+req.query.type)
          .then(recursos =>{
           
            if(dados.data.level=="consumer")
              res.render('feedconsumer', {recursos:recursos.data}); 
            else if (dados.data.level=="admin")
                res.render('feedAdmin', {recursos:recursos.data});
            else 
            res.render('feed', {recursos:recursos.data});
          })
          .catch(erro => res.status(500).jsonp(erro))}
      else{
        axios.get('http://localhost:8001/recurso/recursos'+"?token="+req.cookies.token)
          .then(recursos =>{
           
             var c = recursos.data
           
            if(dados.data.level=="consumer")
              res.render('feedconsumer', {recursos:recursos.data}); 
            else if (dados.data.level=="admin")
                res.render('feedAdmin', {recursos:recursos.data});
            else 
            res.render('feed', {recursos:recursos.data});
          }) 
          .catch(erro => res.status(500).jsonp(erro))}
      })
        .catch(erro => 
    
          res.redirect("/logout"))
});





/*efetuar */
router.post('/comentar/:id',function(req, res) {
  axios.post('http://localhost:8001/recurso/addComentarios'+"?token="+req.cookies.token+'&_id='+ req.params.id, req.body)
    .then(dados =>{
      
        res.redirect('/feed')
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/addStar/:id',function(req, res) {
  axios.post('http://localhost:8001/recurso/addStar'+"?token="+req.cookies.token+'&_id='+ req.params.id)
    .then(dados =>{
     
        res.redirect('/feed')
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/deletepost/:id',function(req, res) {

  axios.delete('http://localhost:8001/recurso/deletepost'+"?token="+req.cookies.token+'&_id='+ req.params.id)
    .then(dados =>{
      
      window.location.assign('/')
      //res.redirect('/perfil')
    })
    .catch(e => res.render('error', {error: e}))
});


router.post('/deleteComentFeed/:id/:i',function(req, res) {

  axios.delete('http://localhost:8001/recurso/deleteComentFeed'+"?token="+req.cookies.token+'&_id='+ req.params.id + '&i=' +req.params.i)
    .then(dados =>{
      
      window.location.assign('/')
      //res.redirect('/perfil')
    })
    .catch(e => res.render('error', {error: e}))
});


router.post('/deleteComent/:id/:i',function(req, res) {
  
  axios.delete('http://localhost:8001/recurso/deleteComent'+"?token="+req.cookies.token+'&_id='+ req.params.id + '&i=' +req.params.i)
    .then(dados =>{
      
      window.location.assign('/')
      //res.redirect('/perfil')
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/addstarComent/:id/:i',function(req, res) {
  axios.post('http://localhost:8001/recurso/addStarComent'+"?token="+req.cookies.token+'&_id='+ req.params.id + '&i=' +req.params.i)
    .then(dados =>{
     
      window.location.assign('/')
      window.alert("oi")
      //res.redirect('/perfil')
    })
    .catch(e => res.render('error', {error: e}))
});


/*efetuar o login */
router.post('/login',function(req, res) {
  axios.post('http://localhost:8002/users/login', req.body)
    .then(dados =>{
      console.log(dados.data)
      res.cookie('token', dados.data.token, {
        expires: new Date(Date.now() + '1d'),
        secure: false, // set to true if your using https
        httpOnly: true
      });
        res.redirect('/feed')
    })
    .catch(e => {
      if (e.message === "Request failed with status code 401"){
      
        res.render('login-form', {error : e.message})
      
      }
      else res.redirect('/login')
    }
    )
});




/*efetua o registo de um user*/
router.post('/registo',function(req, res) {
  var error ={} 
  if( req.body.username === "" || req.body.username === null ||req.body.username === undefined)
    error.username = "username" 
  if ( req.body.password === "" || req.body.password === null ||req.body.password === undefined)
    error.pass = "pass" 
  if ( req.body.filiacao === "" || req.body.filiacao === null ||req.body.filiacao === undefined) 
    error.filiacao = "filiacao" 
  if ( req.body.level === "" || req.body.level === null ||req.body.level === undefined)
    error.level = "level" 
  if (error != {})
    res.render('registo', {username: error.username, pass: error.pass,filiacao: error.filiacao,level: error.level })
  else {
    axios.post('http://localhost:8002/users/registo', req.body)
      .then(dados =>{+
        
        res.redirect('/')
      })
      .catch(e => res.render('error', {error: e}))
  }
});



/*efetuar a edição de um perfil*/
router.post('/perfil/editar',function(req, res) {
  
  axios.post('http://localhost:8002/users/editar?token='+req.cookies.token, req.body)
    .then(dados =>{
      res.redirect('/perfil/')})
    .catch(e => res.render('error', {error: e}))
});

router.post('/deleteperfil/:id',function(req, res) {
  
  axios.delete('http://localhost:8002/users/deleteperfil?_id='+ req.params.id)
    .then(dados =>{
      
      window.location.assign('/')
      //res.redirect('/perfil')
    })
    .catch(e => res.render('error', {error: e}))
});




/* adiciona um recurso */
router.post('/files',upload.array('myFile'), function(req,res){
  var reg = /([0-9]{1,2}\-[0-9]{1,2}\-[0-9]{4})/;
  var d = req.body.dataCriacao.match(reg);
  var error ={} 
  if( req.body.titulo === "" || req.body.titulo === null ||req.body.titulo === undefined)
    error.titulo = "titulo" 
  if ( req.body.tema === "" || req.body.tema === null ||req.body.tema === undefined)
    error.tema = "tema" 
  if ( req.body.tipo === "" || req.body.tipo === null ||req.body.tipo === undefined) 
    error.tipo = "tipo" 
  if ( req.body.dataCriacao === "" || req.body.dataCriacao === null ||req.body.dataCriacao === undefined)
    error.data = "data" 
  else if ( d === "" || d === null || d === undefined)
    error.d = "d" 
  if ( req.body.visibilidade === "" || req.body.visibilidade === null ||req.body.visibilidade === undefined) 
    error.visibilidade = "visibilidade" 
  if ( req.files.length  === 0 )
    error.file = "file" 
  
  
  var files=[]
  var i = 0

  req.files.forEach(reqImage => {
    console.log(i)
    var id = nanoid()
    console.log(id)
    var extension = path.extname(reqImage.originalname)
    let oldPath = __dirname + '/../' + reqImage.path
    let newPath = __dirname + '/../public/ficheiros/'+ id+extension
  
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err
    })
    files[i]={}
    files[i].name=id+extension,
    files[i].mimetype=reqImage.mimetype,
    files[i].size=reqImage.size,
    files[i].originalName=reqImage.originalname  
     i++;
   
  })
 
  req.body.myFile = files;
  axios.post('http://localhost:8001/recurso/files?token='+req.cookies.token, req.body)
    .then(dados =>{
     
      res.redirect('/feed')
  
    })
    .catch(e => {
      res.render('upload', {titulo: error.titulo, tema: error.tema,tipo: error.tipo,data: error.data, d : error.d,visibilidade: error.visibilidade,file: error.file })

    })
  
  
    
}
)  





function verificaAutenticacao(req,res,next){
  if(!req.cookies.token){
  //req.isAuthenticated() will return true if user is logged in
    next();
  } else{
    res.redirect("/feed");}
}

module.exports = router;
