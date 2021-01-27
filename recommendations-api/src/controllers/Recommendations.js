const RecommLib = require('../models/RecommLib');

class Recommendations {
    static async getRecomm(req, res, next) {
        try {
            if(req.params["maxProducts"] < 10) maxProducts = 10;
            
            let res = RecommLib.getRecomm(maxProducts);
            res.send(res);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = (app) => {
    app.get('/recommendations', Recommendations.getRecomm);
}