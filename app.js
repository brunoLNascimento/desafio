let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

consign({cwd:'app'})
    .include('models')    
    
    .then('controllers')
    .then('routes')
    .then('config')
    .into(app);


    //consign().include('app/models').then('app/controllers').then('app/routes').then('app/config').into(server);
module.exports = app;
