//shopify keys
const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss-dev.myshopify.com';
var limit = require("simple-rate-limiter");
var request = require('retry-request', {
    request: limit(require("request")).to(3).per(1000)
  });
const {parseString} = require('xml2js')
const array1 = require('./myjsfile')
var _ = require('lodash');

let config = require('./config.js')
console.log(config)
///search api for this key/////
let apiTag = config[0].type
let search = config[0].category

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret,
    autoLimit: { calls: 4, interval: 1000, bucketSize: 35 }
});

let count = 0;
let newArray = [];

// start = async() =>{ 
//     array1.forEach(async element => {
//         let update = await getBggApi(element)
//         if(count === array1.length){
//             console.log(true);
//         }
//     });
//     }

getBggApi = (values) =>{
    values.forEach((element)=>{
        //return element
        bggApiCall(element)
        // setTimeout(() => {
        //     bggApiCall(element)
        // }, 500);
    })
}

bggApiCall = (obj) =>{
    var opts = {
        noResponseRetries: 99
    };
    var options = { method: 'GET',
    url: 'https://boardgamegeek.com/xmlapi2/thing',
    qs: { id: obj.bgg_id },
    headers: 
    {'cache-control': 'no-cache' } };

    request(options, opts, function (error, response, body) {
        console.log(body)
        if(error) throw new Error (error);
        parseString(body, function (err, result) {
            try{
                let test = []
                for(let prop in result){
                    //console.log(result[prop])
                    test = result[prop]
                }
                let file = []
                try{
                    file = test.item[0]
                } catch (e){
                    console.log(e)
                    console.log(test)
                }
                let jsonConfig = file[search]
                //console.log(obj.product_id)
                //return jsonConfig, obj.product_id
                let object = {
                    json: jsonConfig,
                    id: obj.productid
                }
                newArray.push(object)
                console.log(newArray)
            }
            catch(err){
                console.log(err)
            }
            });
    })

}

getBggApi(array1)
//console.log(bggApiCall(array1))