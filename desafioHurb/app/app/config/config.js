module.exports = {
    db: {
        url: 'mongodb://localhost:27017/desafioHurb',
        options: {
            db: {native_parser: true},
            server: {
                poolSize: 5,
                socketOptions: {keepAlive: 1},
                auto_reconnect: true
            }
        }
    },

    awesomeApi: {
        url: "https://economia.awesomeapi.com.br"
    }


};