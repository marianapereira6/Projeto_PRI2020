var express = require('express');
var router = express.Router();

var passport = require('passport')
var jwt = require('jsonwebtoken')

var User = require('../controllers/user')


router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function (err) {
  
  });
});

router.get('/perfil',passport.authenticate('jwt'),function(req, res){
  User.consultar(req.user.username)
  
  .then(dados => res.status(201).jsonp(dados))
  .catch(e => res.status(500).jsonp({error: e}))
})

//erro
router.post('/editar',passport.authenticate('jwt'), function(req, res){

  User.editar(req.user.username, req.body)
    .then(dados => res.status(200).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error : e}))
})





router.get('/', function(req, res){
 
  User.listar()
    .then(dados => res.status(200).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error : e}))
})



router.post('/registo', function(req, res){
  var user = {}
  var data = new Date()
  user.name = req.body.name;
  user.username= req.body.username
  user.password = req.body.password
  user.level = req.body.level
  user.dataRegisto= data
  user.filiacao = req.body.filiacao
  User.inserir(user)
  .then(dados => res.status(201).jsonp({dados: dados}))
  .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/login', passport.authenticate('local'), function(req, res){
  jwt.sign({ username: req.user.username, level: req.user.level, 
              sub : 'PRI2021'},
              "PRI2021",
              {expiresIn: 3000},
              function(e, token) {
                if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e})
                 
                else res.status(201).jsonp({token: token, username: req.user.username, level:req.user.level })
        });
})

router.delete('/deleteperfil', function(req, res) {
  
  User.deleteOne(req.query._id)
    .then(dados => res.status(200).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error : e}))  
 
});









module.exports = router;