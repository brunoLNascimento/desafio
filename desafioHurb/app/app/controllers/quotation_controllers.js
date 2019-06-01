var mongoose = require('mongoose');
var config = require('../config/config')
const Quotation = mongoose.model('Quotation');
const axios = require('axios');
mongoose.set('debug', true)

exports.quotation = function (req, res){
    var coinFrom = req.params.coinFrom
    var coinTo = req.params.coinTo
    var retorno = 1

    if(!coinFrom) return res.status(400).send("Moeda principal é um campo obrigatório") 
    if(!coinTo) return res.status(400).send("Moeda a ser convertida é um campo obrigatório") 
    if(!req.params.amount) return res.status(400).send("Valor a ser convertido é um campo obrigatório") 

    axios.get(config.awesomeApi.url + `/${coinFrom}-${coinTo}/${retorno}`,
    {
        timeout: 5000
    }).then( response => {
        if(response.data.length){
            var saveQuotation = awesomeApi(req, response, coinFrom, coinTo)

            saveQuotation.save(function(err, saved){
                if(err){
                    return res.status(500).send("Erro ao salvar cotação solicitada")
                }
                if(saved){
                    return res.status(200).send({
                        message: saved._doc.message,
                        res: saved
                    })
                }else{
                    return res.status(400).send("Algo deu errado!")
                }
            })    
        }else{
            return res.status(200).send("Nenhuma valor encontrado para pesquisa.")
        }
    }).catch( err => {
        return res.status(500).send("Algo deu errado ao validar consulta!")
    })
}

exports.getQuotation = function (req, res){
    var page = req.params.page
    var limit = 10
    var skip = page * limit

    if(req.params.id){
        var query = { quotation_id: req.params.id }
    }else{
        var query = { }
    }

    Quotation.find(query, function (err, response){
        if(err){
            return res.status(500).send("Erro ao consultar cotação")
        }
        if(response.length){
            return res.status(200).send(response) 
        }else{
            return res.status(201).send("Nenhuma cotação encontrada!")
        }
    }).limit(limit).skip(skip)
}


awesomeApi = function(req, response, coinFrom, coinTo){
    var amount = req.params.amount

    var quotation = response.data[0]
    quotation.valueQuotation = parseInt(quotation.high * amount).toFixed(2)
    quotation.message = "Valor a ser cotado $" +amount+ ", resultado da conversão: " +coinFrom+ " para " +coinTo+ " = " +quotation.valueQuotation
    
    var saveQuotation = new Quotation({
        varBid: quotation.varBid,
        code: quotation.code,
        codein: quotation.codein,
        name: quotation.name,
        high: quotation.high,
        low: quotation.low,
        pctChange: quotation.pctChange,
        bid: quotation.bid,
        ask: quotation.ask,
        timestamp: quotation.timestamp,
        create_date: quotation.create_date,
        message: quotation.message,
        valueQuotation: quotation.valueQuotation
    })
    return saveQuotation
}