const mongoose = require('mongoose');
const env = require('../config/env');
require('../models/Product');

const auth = env.DB_USER ? env.DB_USER + ':' + env.DB_PASS + '@' : "";
const config = `mongodb://${auth}${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;

try {
    mongoose.connect(config, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
} catch (error) {
    console.error(error)
}


const startSeed = async () => {
    const catalog = require('./catalog.json');
    
    for (let product of catalog) {
        let res = await seed(product);
    }
    console.log('Completed');
}

const seed = async (product) => {
    const Product = mongoose.model('Product');

    return new Promise((resolve, reject) => {
        let {id, ...props} = product;
        let prod = new Product({id, props});
        prod.save((err, data) => {
            if (err) reject(err)
            resolve(data);
        });
        console.log(prod.id);
    });
}

startSeed();