var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('mongoose-sequence')(mongoose)

var quotation = new Schema({
    varBid: { type: Number },
    code: { type: String},
    codein:{ type: String },
    name: { type: String },
    high: { type: Number },
    low: { type: Number },
    pctChange: { type: Number },
    bid: { type: Number },
    ask: { type: Number },
    timestamp: { type: Number },
    create_date: { type: Date },
    message: { type: String },
    valueQuotation: { type: Number }
},{
    'collection': quotation
})

quotation.plugin(autoincrement, {inc_field: 'quotation_id'}).set('toJSON', {
    getters: true,
    virtuals: true
})

mongoose.model('Quotation', quotation);


