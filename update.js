const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss.myshopify.com';
var limit = require("simple-rate-limiter");
var request = require('retry-request', {
    request: limit(require("request")).to(3).per(1000)
  });
const {parseString} = require('xml2js')
const array1 = require('./myjsfile')

// Load the full build.
var _ = require('lodash');
var join = require('lodash.join');
var split = require('lodash.split');

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret,
    autoLimit: { calls: 4, interval: 1000, bucketSize: 35 }
});

let config = require('./config.js')
console.log(config)
///search api for this key/////
let apiTag = config[0].type
let search = config[0].category
//////////////////////////////

getBggApi = () =>{
   array1.forEach(function(obj,index,collection) {
        setTimeout(function(){
        var opts = {
            noResponseRetries: 99
            };   

        var options = { method: 'GET',
            url: 'https://boardgamegeek.com/xmlapi2/thing',
            qs: { id: obj.bgg_id },
            headers: 
            {'cache-control': 'no-cache' } };

        request(options, opts, function (error, response, body) {
            if (error) throw new Error(error);
            parseString(body, function (err, result) {
                try{
                    let test = []
                    let node1 = []
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
                    // for(let prop in jsonConfig){
                    //     node1.push(jsonConfig[prop])
                    //    // console.log(jsonConfig[prop])
                    // }
                    //console.log(obj.product_id)
                    iterate(jsonConfig, obj.product_id)
                }
                catch(err){
                    console.log(err)
                }
                });
        })}, index * 300);
});
}


// function iterates though object till it finds the same key value
const iterate = (obj, id) => {
    let categories = []
    console.log(id)
    console.log('test')
    // Object.keys(obj).forEach(key => {
    // if(obj[key] === apiTag){
    //     let val = obj.value.split(" ")
    //     categories.push(val[0].replace(/,/g,""))
    //     //console.log(`key: ${key}, value: ${obj[key]}`)
    // }
    // else if(apiTag === 'none' && key === 'value'){
    //     //console.log(obj[key])
    // }
    // if (typeof obj[key] === 'object') {
    //         iterate(obj[key])
    //     }
    // })
    // getCurrentTag(categories, id)
}

getCurrentTag = async (categories, id) =>{
    // //console.log(categories)
    let getTag = await
    shopify.product
        .get(id, {fields: 'tags'})
        .then((tags)=>{
            //console.log(categories)
            //console.log(tags)
           // updateTags(categories, id, tags)
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
    console.log(str)
    // let productUpdate =
    //     shopify.product
    //         .update(id, {"id": id, "tags": str})
    //         .then((results)=>{
    //             console.log(results.tags)
    //         })
}

getBggApi();