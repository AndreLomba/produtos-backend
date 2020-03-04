// GET - FIND - SELECT
// POST - CREATE - INTERT
// PUT - FIND AND UPDATE - UPDATE
// DELETE - FIND AND DELETE - DELETE

const express = require('express');
const mongoose = require('mongoose');
const Produto = require('./ProdutoSchema');

const server = express();

const MONGO_URL = "mongodb+srv://root:1234@clusterlp3-s6xmr.mongodb.net/dbproduto?retryWrites=true&w=majority";
<<<<<<< HEAD

const db = mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

var produtos = [];

// EXIBE O RESULT DO QUE EXISTE EM PRODUTO, FIND É EQUIVALENTE AO "SELECT"
=======

const db = mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var produtos = [];

>>>>>>> a3642eca0c15ee71ab739ca2dc178b76f9cfbc38
server.get('/produto', async function(request, response) {
    const produtos = await Produto.find();
    return response.json(produtos);
});

// MIDDLEWARES
server.use(express.json());

// RECEBE O ID DO PRODUTO COMO PARAMETRO, FILTRA O ID E RETORNA
server.get('/produto/:id', async function(request, response) {

    const id = request.params.id;
    const produto = await Produto.findById(id);

    return response.json(produto);
});

server.post('/produto', async function(request, response){
    const produto = request.body;
<<<<<<< HEAD

    await Produto.create(produto);
=======
    Produto.create(produto);
>>>>>>> a3642eca0c15ee71ab739ca2dc178b76f9cfbc38

    return response.json(produto);
});

server.delete('/produto/:id', async function(request, response){
    const id = request.params.id;
    const produto = await Produto.findByIdAndDelete(id);



    return response.json('Apagou o produto com id: ' + id );
});

server.put('/produto/:id', async (req, res) => {
    var id = req.params.id;
    
    const dados = req.body;

    await Produto.findByIdAndUpdate(id, dados)

    return res.send();

    // produtos.forEach(p => {
    //     if(p.id == id){
    //         p.nome = produto.nome;
    //         p.preco = produto.preco;
    //     }
    // })

});

server.listen(3000);