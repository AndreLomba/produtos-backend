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

server.get('/produto/:id', function(request, response) {

    const id = request.params.id;

    const produto = produtos.filter(p => p.id == id);

    return response.json(produto);
    
});


server.listen(3000);