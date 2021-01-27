const restify = require('restify');
const errors = require('restify-errors');
const routes = require('./routes/');
const env = require('./config/env');

const app = restify.createServer();
app.use(restify.plugins.queryParser({mapParams: true}));
app.use(restify.plugins.jsonBodyParser());
routes(app);

app.on('restifyError', (req, res, err, callback) => {    
    return res.send(err.statusCode || 500, err.body || new errors.InternalServerError());
});

app.listen(env.SERVER_PORT, () => {
    console.log(`SERVER STARTED\nPORT:${env.SERVER_PORT}`);
});
