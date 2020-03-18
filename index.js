const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss.myshopify.com';
var limit = require("simple-rate-limiter");
var request = require('retry-request', {
    request: limit(require("request")).to(3).per(1000)
  });
const array1 = require('./myjsfile')

// Load the full build.
var _ = require('lodash');

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret,
    autoLimit: { calls: 4, interval: 1000, bucketSize: 35 }
});

let config = require('./config.js');

///search api for this key/////
let apiTag = config[0].type
let search = config[0].category
//////////////////////////////
let count = 0 
loopArray = (list) =>{
    list.forEach((element, index) => {
        setTimeout(() => {
            requestBggApi(element)
        }, 300 * (index + 1));
    });
}

requestBggApi = (obj) =>{
    var opts = {
        noResponseRetries: 99
        };   
    
    var options = { method: 'GET',
        url: 'https://bgg-json.azurewebsites.net/thing/' + obj.bgg_id,
        headers: 
        {'cache-control': 'no-cache' } };

    return new Promise(function(resolve, reject) {
        request(options, opts, function (error, response, body){
            if (error) {
                console.log(obj.bgg_id)
                reject(err);
            }else{
                console.log(count += 1)
                console.log(body)
                resolve(body)
            }
        })
    })
}

loopArray(array1)