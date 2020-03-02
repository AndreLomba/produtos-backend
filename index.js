const express = require('express');
const mongoose = require('mongoose');
const Produto = require('./ProdutoSchema');

const server = express();

const MONGO_URL = "mongodb+srv://root:1234@clusterlp3-s6xmr.mongodb.net/dbproduto?retryWrites=true&w=majority";

const db = mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var produtos = [];

server.get('/produto', async function(request, response) {
    const produtos = await Produto.find();
    return response.json(produtos);
});

// MIDDLEWARES
server.use(express.json());

// RECEBE O ID DO PRODUTO COMO PARAMETRO, FILTRA O ID E RETORNA
server.get('/produto/:id', function(request, response) {

    const id = request.params.id;

    const produto = produtos.filter(p => p.id == id);

    return response.json(produto);
});

server.post('/produto', function(request, response){
    const produto = request.body;
    Produto.create(produto);

    return response.status(201).send();
});

server.delete('/produto/:id', function(request, response){
    const id = request.params.id;

    const produto = produtos.filter(p => p.id != id);

    for (var i = 0; i < produtos.length; i++) {
        if(produtos[i].id == id){
            var nome = produtos[i].nome;
            produtos.splice(i,1);

        }
    }

    return response.json('Apagou o produto '+ nome);
});

server.put('/produto/:id', (req, res) => {
    var id = req.params.id;
    
    const produto = req.body;

    produtos.forEach(p => {
        if(p.id == id){
            p.nome = produto.nome;
            p.preco = produto.preco;
        }
    })

    return res.send();
});

server.listen(3000);