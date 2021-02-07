// Roteador do servidor API para o problema da gestão de publicações

var express = require('express');
var router = express.Router();
const Publicacao = require('../controllers/publicacao')

// Listar todas as publicações
router.get('/publicacoes', function(req, res) {
  Publicacao.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});


// Consultar uma publicacao
router.get('/publicacao/:id', function(req, res) {
  Publicacao.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Inserir uma publicacao
router.post('/publicacoes', function(req, res){
  Publicacao.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Alterar uma Publicacao
router.put('/publicacoes', function(req, res){
  Publicacao.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Remover uma tarefa
router.delete('/publicacoes/:id', function(req, res) {
  Publicacao.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;






/*
// Roteador do servidor API para o problema da gestão de tarefas
var express = require('express');
var router = express.Router();
const Tarefa = require('../controllers/tarefa')

// Listar todas as tarefas
router.get('/tarefas', function(req, res) {
  Tarefa.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

// Consultar uma tarefa
router.get('/tarefas/:id', function(req, res) {
  Tarefa.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Inserir uma tarefa
router.post('/tarefas', function(req, res){
  Tarefa.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Alterar uma tarefa
router.put('/tarefas', function(req, res){
  Tarefa.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Remover uma tarefa
router.delete('/tarefas/:id', function(req, res) {
  Tarefa.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
*/