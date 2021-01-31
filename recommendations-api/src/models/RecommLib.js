const axios = require('axios');
const errors = require('restify-errors');
const env = require('../config/env');

class RecommLib {
    static async getRecomm(maxProds) {
        try {
            
            const priceRedProds = (await axios.get(env.RECOMM_URL + env.PRICE_REDUCTION_PATH)).data;
            const mostPopProds = (await axios.get(env.RECOMM_URL + env.MOST_POPULAR_PATH)).data;

            const priceRedProdsIDs = priceRedProds.map(prod => prod.recommendedProduct.id);
            const mostPopProdsIDs = mostPopProds.map(prod => prod.recommendedProduct.id);
            
            const priceReductionList = await this.getProdInformations(priceRedProdsIDs);
            const mostPopList = await this.getProdInformations(mostPopProdsIDs);
            
            return {
                productsPriceReduction:
                    priceReductionList.filter((prod) => {
                        if (this.isAvailable(prod)) return prod
                    }).slice(0, maxProds),
                productsMostPopular:
                    mostPopList.filter((prod) => {
                        if (this.isAvailable(prod)) return prod
                    }).slice(0, maxProds)
            }
        } catch(error) {
            throw error;
        }
    }

    static isAvailable(prod) {
        if (prod.props) return prod.props.status === 'AVAILABLE';
        return prod.status === 'AVAILABLE';
    }

    
    static async getProdInformations(ids) {
        try {
            const url = `${env.CATALOG_PROTOCOL}://${env.CATALOG_HOST}:${env.CATALOG_PORT}${env.CATALOG_PRODUCT_ROUTE}`;
            console.log(`${url}?id=${ids.join(',')}`);
            const prods = (await axios.get(`${url}?id=${ids.join(',')}`)).data;
            return prods;
        } catch(error) {
            throw new errors.InternalServerError('getProdInformation: ' + error.message);
        }
    }
}

module.exports = RecommLib;