const mongoose = require('mongoose');
const errors = require('restify-errors');
const Product = mongoose.model('Product')

class ProductController {
    static async listByid(req, res, next) {
        let {id} = req.params;
        let ids;
        try {
            ids = JSON.parse(id);
        } catch(error) {
            ids = id;
        }
        
        try {
            let prod;
            if (typeof ids == Object)
                prod = await Product.compactFindList(ids);
            else prod = await Product.compactFindById(ids);
            res.send(prod);
        } catch (error) {
            next(error);
        }
    }
}


module.exports = (app) => {
    app.get('/product/:id', ProductController.listByid);
}