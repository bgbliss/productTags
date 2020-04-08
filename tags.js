const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss.myshopify.com';
var limit = require("simple-rate-limiter");
var request = require('retry-request', {
    request: limit(require("request")).to(3).per(1000)
  });
const array1 = require('./myjsfile-dev')

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
let apiTag = config[0].tag
let search = config[0].type
//////////////////////////////
let count = 0 
let errorCheck = []
let loop = 200
//loops though the given array to update the product tags

requestBgg = (i, obj)=>{
    while(i < loop){
        let bggApiSearch = obj[i]['bgg_id'];
        let product_id = obj[i]['product_id'];
        setDelay(i);
        i += 1;
        
    //     var opts = {
    //         noResponseRetries: 99
    //         };   

    //     var options = { method: 'GET',
    //     url: 'https://bgg-json.azurewebsites.net/thing/' + obj.bgg_id,
    //     headers: 
    //     {'cache-control': 'no-cache' } };

    //     return new Promise(function(resolve, reject) {
    //         request(options, opts, function (error, response, body){
    //             if (error) {
    //                 loopArray(array1, i - 1)
    //             }else{
    //                 //if request is not successful 
    //                 //loop though the same index again
    //                 console.log(i)
    //                 let json = JSON.parse(body)
    //                 let bggTags = json[search]
    //                 console.log(bggTags) 
    //                 if(response.statusCode != 200){
    //                     //wait 2 sec before calling
    //                 }
    //                 // let json = JSON.parse(body)
    //                 // let bggTags = json[search]
    //                 // if(bggTags.legnth <= 0){
    //                 //     loopArray(array1, i)
    //                 // }
    //                 // else{
    //                 //     resolve(body)
    //                 // }        
    //                 resolve(body)       
    //             }
    //         })
    //     })
    }
    function setDelay(i) {
        setTimeout(function(){
          console.log(i);
        }, 1000);
      }
}


requestBgg(count, array1)