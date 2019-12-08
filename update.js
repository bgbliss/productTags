const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss-dev.myshopify.com';
var request = require("request");
const {parseString} = require('xml2js')
const array1 = require('./test')

// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
var join = require('lodash.join');
var split = require('lodash.split');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret,
    autoLimit: { calls: 2, interval: 1000, bucketSize: 35 }
});

let config = require('./config.js')
console.log(config)
///search api for this key/////
let apiTag = config[0].type
let search = config[0].category
//////////////////////////////
let categories = []

getBggApi = () =>{

    array1.forEach(element => {
    var options = { method: 'GET',
        url: 'https://boardgamegeek.com/xmlapi2/thing',
        qs: { id: element.bgg_id },
        headers: 
        {'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        parseString(body, function (err, result) {
            try{
                let test = []
                let node1 = []
                for(let prop in result){
                    //console.log(result[prop])
                    test = result[prop]
                }
                let file = test.item[0];
                let jsonConfig = file[search]
                for(let prop in jsonConfig){
                    node1.push(jsonConfig[prop])
                    //console.log(jsonConfig[prop])
                }
                
                iterate(jsonConfig)
                getCurrentTag(categories, element.product_id)
            }
            catch(err){
                console.log(err)
            }
            });
    });
});
}

const iterate = (obj) => {
    Object.keys(obj).forEach(key => {
    if(obj[key] === apiTag){
        let val = obj.value.split(" ")
        categories.push(val[0].replace(/,/g,""))
        //console.log(`key: ${key}, value: ${obj[key]}`)
    }
    else if(apiTag === 'none' && key === 'value'){
        console.log(obj[key])
    }
    if (typeof obj[key] === 'object') {
            iterate(obj[key])
        }
    })
}

getCurrentTag = (categories, id) =>{
    //console.log(categories)
    let getTag =
    shopify.product
        .get(id, {fields: 'tags'})
        .then((tags)=>{
            //return tags
            updateTags(categories, id, tags)
        })
        .catch((err)=>{
            console.log(err)
        })
}

updateTags = (categories, id, tags) =>{
    let data = ""
    let newString = tags.tags.replace(/\s/g,'')
    let toArry = split(newString, ",")
    let newArray = toArry
   // console.log(categories)
    categories.forEach(values => {
        if(toArry.includes(values)){
           // console.log(true)
        }
        else{
            newArray = _.concat(newArray, values)
           // console.log(newArray)
        }
    });
    let str = join(newArray, ",").replace(/,/g, ", ")
    let productUpdate =
        shopify.product
            .update(id, {"id": id, "tags": str})
            .then((results)=>{
                console.log(results.tags)
            })
}

getBggApi();