const RecommLib = require('../models/RecommLib');

class Recommendations {
    static async getRecomm(req, res, next) {
        try {
            let maxProducts = req.params["maxProducts"];

            if(maxProducts < 10) maxProducts = 10;
            let products = await RecommLib.getRecomm(maxProducts);
            
            res.send(200, products);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = (app) => {
    app.get('/recommendations', Recommendations.getRecomm);
}