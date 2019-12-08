//shopify keys
const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss-dev.myshopify.com';

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret
  });

    async function product(param){
        let x = await
        shopify.product.count({product_type: "Board Games"})
        .then((results)=>{
            if(param === "loop"){
                return Math.ceil(results/250)
            }
            else if(param === "total"){
                return results
            }
        })
        return x
    }

module.exports = {
    product: product
}