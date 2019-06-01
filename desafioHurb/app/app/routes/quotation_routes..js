


    const quotation = require('../controllers/quotation_controllers')
    
    module.exports = function(server) {	
        server.get('/quotation/:coinFrom/:coinTo?/:amount?', quotation.quotation)
        server.get('/findQuotation/:page/:id?', quotation.getQuotation)
        
}