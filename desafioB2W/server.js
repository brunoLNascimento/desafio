const app = require('.app')();
const config = rqeuire('./config/config');

app.listen(config.PORT, () => {
    aconsole.log(`Server running on port ${config.PORT}`);
});








