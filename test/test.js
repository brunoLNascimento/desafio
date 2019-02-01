const app = require('../app');
const mongoose = require('mongoose');
const request = require('supertest');
const config = require('../app/config/config');

mongoose.connect(config.db.url, config.db.options);

const planetTatooine = {
    planetId:'1d887c00-fb66-11e8-860c-27b8020ec3d3',
    name:'Tatooine',
}


const planetTatooineEditado = {
    planetId:'1d887c00-fb66-11e8-860c-27b8020ec3d3',
    name:'Tatooine',
    clima:'Árido',
    terreno:'plano',
    qtdAparicoesEmFilmes: 5,
}

it('#Criando um novo planeta', function(done) {
    request(app)
        .post(`/planet`)
        .send(planetTatooine)
        .expect('Content-Type',/json/)
        .timeout(5000)
        .end(done)
});

it('#Editando um planeta', function(done) {
    request(app)
        .put(`/planet`)
        .send(planetTatooineEditado)
        .timeout(5000)
        .end(done)
});

it('#Consultando planeta pelo id', function(done) {
    request(app)
        .get(`/planet/${planetTatooineEditado.planetId}`)
        .timeout(5000)
        .end(done);
});

it('#Removendo um planeta', function(done) {
    request(app)
        .delete(`/planet/${planetTatooineEditado.planetId}`)
        .timeout(30000)
        .end(done);
});

