const axios = require('axios');
const env = require('../config/env');

class RecommLib {
    static async getRecomm(maxProds) {
        try {
            console.log(env.RECOMM_URL + env.PRICE_REDUCTION_PATH);
            const MAX_PROD_PER_QUERY = 5;
            
            const priceRedProds = (await axios.get(env.RECOMM_URL + env.PRICE_REDUCTION_PATH)).data;
            const mostPopProds = (await axios.get(env.RECOMM_URL + env.MOST_POPULAR_PATH)).data;

            const priceRedProdsIDs = priceRedProds.map(prod => prod.recommendedProduct.id);
            const mostPopProdsIDs = mostPopProds.map(prod => prod.recommendedProduct.id);

            //const priceReductionList = this.getProdInformations(priceRedProdsIDs);

            

        } catch(error) {
            throw error;
        }
    }

    isAvailable(prod) {
        if (prod.status === 'AVAILABLE') return true;
        return false;
    }

    
    static async getProdInformations(ids) {
        try {
            const route = "product";
            console.log(`${env.CATALOG_PROTOCOL}://${env.CATALOG_HOST}:${env.CATALOG_PORT}/${route}/${JSON.stringify(ids)}`);
            const prods = (await axios.get(`${env.CATALOG_PROTOCOL}://${env.CATALOG_HOST}:${env.CATALOG_PORT}/${route}/${JSON.stringify(ids)}`)).data;

            return prods;
        } catch(error) {
            //throw error;
        }
    }
}

module.exports = RecommLib;