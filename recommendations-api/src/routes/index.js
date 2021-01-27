const fs = require('fs');

const CTRL_PATH = './src/controllers';
module.exports = (app) => {
    let files = fs.readdirSync(CTRL_PATH);
    for(let filename of files) {
        const routes = require('../controllers/' + filename);
        routes(app);
    }
}