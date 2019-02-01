const axios = require('axios');
const mongoose = require('mongoose');
const Planet = mongoose.model('Planet');
const uuidv1 = require('uuidv1')
mongoose.set('debug', true);

exports.getAll = function(req, res){
    Planet.find(function(err, planets) {
        if (err) {
            res.status(500).send("Erro ao consultar");
        } else {
            res.send(planets);
        }
    });
}

exports.getPorId = function(req, res){
    var id = req.params.id;

    if(!id){
        res.status(500).send("Id é requerido");
    }

    var query = { _id : id };

    Planet.find(query, function(err, planets) {
        if (err) {
            res.status(500).send("Erro ao consultar");
        } else {
            res.send(planets);
        }
    });
}

exports.getPorNome = function(req, res){
    var nome = req.params.name;

    if(!nome){
        res.status(500).send("Nome é requerido");
    }

    var query = { nome : nome };

    Planet.find(query, function(err, planets) {
        if (err) {
            res.status(500).send("Erro ao consultar");
        } else {
            res.send(planets);
        }
    });    
}

exports.remove = function(req, res){
    var id = req.params.id;

    if(!id){
        res.status(500).send("Id é requerido");
    }

    var query = { planetId : id };

    Planet.remove(query, function (err){
            if(err){
                res.status(500).send("Erro ao excluir");
            }else{
                res.send("Planeta excluído com sucesso");
            };
        });
}

exports.insert = function(req, res){    
    var name = req.body.name
   
    console.log(`[SERVICE] - Buscando aparições do planeta ${name} em filmes`)
        axios.get(`https://swapi.co/api/planets/?search=${name}`, {
            timeout:3000
    })
    .then(planetaEncontrado => {
        
        if(planetaEncontrado){
            var qtdAparicoesEmFilmes = planetaEncontrado.data.results[0].films.length
            var terreno = planetaEncontrado.data.results[0].terrain
            var clima = planetaEncontrado.data.results[0].climate

        }else{
            var qtdAparicoesEmFilmes = re.body.qtdAparicoesEmFilmes
            var terreno = req.body.terreno
            var clima = req.body.clima
        }

        var planetId = req.body.planetId

        if(!planetId){
            planetId = uuidv1()
        }
        
        var planet = new Planet({
            nome: req.body.name,
            clima: clima,
            terreno: terreno,
            qtdAparicoesEmFilmes: qtdAparicoesEmFilmes,
            planetId: planetId
        });
    
        planet.save(function(err, model) {
            if (err) {
                res.status(500).send("Erro ao Savar o planeta");
            } else {
                res.send(model);
            }
        });
    })
    .catch(error => {
        console.log(error)
    })
}

exports.update = function(req, res){
    var id = req.body.planetId;

    if(!id){
        res.status(500).send("Id é requerido");
    }

    var query = { planetId : id };
    var modelPlanet = montaModel(req);

    Planet.update(query, { $set:modelPlanet }, function(err) {
        if (err) {
            res.status(500).send("Erro ao atualizar o planeta" + err);            
        }else{
            res.send("Planeta atualizado com sucesso!");
        }
    });    
}

function montaModel(req){
    var modelPlanet = {};
    if(req.body.name) modelPlanet["nome"] = req.body.name;
    if(req.body.clima) modelPlanet["clima"] = req.body.clima;
    if(req.body.terreno) modelPlanet["terreno"] = req.body.terreno;
    if(req.body.qtdAparicoesEmFilmes) modelPlanet["qtdAparicoesEmFilmes"] = req.body.qtdAparicoesEmFilmes;
    if(req.body.planetId) modelPlanet["planetId"] = req.body.planetId;
    return modelPlanet;
}