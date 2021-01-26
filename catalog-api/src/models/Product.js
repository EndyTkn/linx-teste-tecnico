const mongoose = require('mongoose');
const errors = require('restify-errors');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({props: Object, id: {type: String, unique: true}});

ProductSchema.path('id').validate(function(id) {
    if (!id) return null;
    
    return true;
}, 'ID cannot be null');


ProductSchema.statics = {
    compactFindById: function(id) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Compact id: ', id);
                const res = await this.findOne({id}).exec();
                if (!res) reject(new errors.ResourceNotFoundError({statusCode: 404,}, "product not found"));
                console.log(res);
                let {name, price, status, categories} = res.props;

                resolve({name, price, status, categories});
            } catch(error) {
                reject(error);
            }
        });
    },
    compactFindList: function(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = []
                for (let id of ids) {
                    console.log(id);
                    res.push(await this.findOne({id}).exec());
                }
                if (res.length === 0)
                    reject(new errors.ResourceNotFoundError({statusCode: 404,}, "products not found"));
                resolve(res);
            } catch(error) {
                reject(error);
            }
        });
    }
}

mongoose.model('Product', ProductSchema);