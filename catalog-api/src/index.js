const restify = require('restify');
const errors = require('restify-errors');
const mongoose = require('mongoose');
const routes = require('./routes/');
const env = require('./config/env');
require('./models/Product');

const app = restify.createServer();
app.use(restify.plugins.jsonBodyParser());
app.use(restify.plugins.queryParser({mapParams: true}));
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


function start() {
    app.listen(env.SERVER_PORT, () => {
       console.log(`CATALOG API STARTED\nPORT:${env.SERVER_PORT}`);
    }); 
}

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnect', connect)
        .once('open', start);

    const auth = env.DB_USER?env.DB_USER+':'+env.DB_PASS+'@':"";
    const config = `mongodb://${auth}${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
    console.log(config)
    return mongoose.connect(config, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

connect();