var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var planet = new Schema({
    nome: { type: String, required: true },    
	clima: { type: String },
	terreno: { type: String },
    qtdAparicoesEmFilmes: { type: Number },
    planetId: {type: String}
}, {
    collection: "planets"
});

planet.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Planet', planet);