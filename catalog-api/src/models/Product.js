const mongoose = require('mongoose');
const errors = require('restify-errors');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({props: Object, id: {type: String, unique: true}});

ProductSchema.path('id').validate(function(id) {
    if (!id) return null;
    
    return true;
}, 'ID cannot be null');


ProductSchema.statics = {
    compactFindList: function(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                let compactProducts;
                let productsInfo = await this.find({id: {'$in': ids}}).exec()
                if (productsInfo.length === 0)
                    reject(new errors.ResourceNotFoundError({statusCode: 404,}, "products not found"));

                compactProducts = productsInfo.map((prod) => {
                    var {name, price, status, categories} = prod.props;
                    return {name, price, status, categories};  
                })
                resolve(compactProducts);   
            } catch(error) {
                reject(error);
            }
        });
    }
}

mongoose.model('Product', ProductSchema);