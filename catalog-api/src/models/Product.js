const mongoose = require('mongoose');
const errors = require('restify-errors');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({props: Object, id: {type: String, unique: true}});

ProductSchema.path('id').validate(function(id) {
    if (!id) return null;
    
    return true;
}, 'ID cannot be null');


function orderFindedProducts(idsList, products, compact) {
    let prodMaps = {}, res = [];
    if(compact === true) {
        for (let product of products) {
            var {name, price, status, categories} = product.props;
            prodMaps[product.id] = {name, price, status, categories}
        }
    }
    else for (let product of products)  {
        prodMaps[product.id] = product;
    }
    for (let id of idsList) 
        if (prodMaps[id] != null) res.push(prodMaps[id]);
    
    return res;
    
}

ProductSchema.statics = {
    findByList: function(ids, isCompact) {
        return new Promise(async (resolve, reject) => {
            try {
                let productsInfo = await this.find({id: {'$in': ids}}).exec()

                if (productsInfo.length === 0)
                    reject(new errors.ResourceNotFoundError({statusCode: 404,}, "products not found"));

                resolve(orderFindedProducts(ids, productsInfo, isCompact));   
            } catch(error) {
                reject(error);
            }
        });
    }
}

mongoose.model('Product', ProductSchema);