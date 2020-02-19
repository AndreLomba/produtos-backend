const express = require('express');

const server = express();

var produtos = [
    {id: 1, nome: 'Computador', preco: 1200},
    {id: 2, nome: 'Notebook', preco: 1000},
    {id: 3, nome: 'TV', preco: 300.90}
];

server.get('/produto', function(request, response) {
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
    produtos.push(produto);

    var nome = request.body.nome;

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