const planet = require('../controllers/planet')

module.exports = function(server) {	
	server.get('/planet', planet.getAll)
	server.get('/planet/:id', planet.getPorId)
	server.get('/planet/porNome/:nome', planet.getPorNome)
	server.delete('/planet/:id', planet.remove)
	server.post('/planet', planet.insert)
	server.put('/planet', planet.update)
}