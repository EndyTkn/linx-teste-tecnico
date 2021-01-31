const mongoose = require('mongoose');
const errors = require('restify-errors');
const Product = mongoose.model('Product')

class ProductController {
    static async listByIds(req, res, next) {
        let idParam = req.params.id;
        let resFormat = req.params.resFormat;
        let ids;
        let prod;
        
        try {
            if (!idParam)
                throw (new errors.BadRequestError({statusCode: 400,}, 'valid id param is required!'));
            if (resFormat != 'compact' && resFormat != 'complete')
                throw (new errors.BadRequestError({statusCode: 400}, 'a response format is required'))

            ids = idParam.split(',');

            prod = await Product.findByList(ids, resFormat === 'compact');
            if (prod.length === 1) return res.send(prod[0]);
            return res.send(prod);
        } catch (error) {
            return next(error);
        }
    }

}


module.exports = (app) => {
    app.get('/product/:resFormat', ProductController.listByIds);
}