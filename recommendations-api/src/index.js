const restify = require('restify');
const errors = require('restify-errors');
const routes = require('./routes/');
const env = require('./config/env');

const app = restify.createServer();
app.use(restify.plugins.queryParser({mapParams: true}));
app.use(restify.plugins.jsonBodyParser());
routes(app);

app.on('restifyError', (req, res, err) => {  
    console.log(`restifyError | ${err.statusCode || 500} | ${err.message}`);
    console.log('onRestify Error',err);
    return res.send(err.statusCode || 500, err);
});

app.on('InternalServer', (req, res, err) => {
    console.log(`Internal Server Error | ${err.statusCode || 500} | ${err.message}`);
    let {statusCode, message} = err;
    if (env.DEBUG_MODE)
        return res.send(statusCode || 500, {statusCode, message});

    message = 'Internal Server error';
    return res.send(statusCode || 500, {statusCode, message});
});

app.listen(env.SERVER_PORT, () => {
    console.log(`RECOMMENDATION API STARTED\nPORT:${env.SERVER_PORT}`);
});
