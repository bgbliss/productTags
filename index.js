const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss-dev.myshopify.com';
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
    autoLimit: { calls: 2, interval: 1000, bucketSize: 35 }
});

let config = require('./config.js');

///search api for this key/////
let apiTag = config[0].tag
let search = config[0].type
//////////////////////////////
let count = 0 
let errorCheck = []
//loops though the given array to update the product tags

iterateFunction = (results) =>{
    setTimeout(() => {
        //waits 3 sec before calling function 
        //due to status error
        loopArray(array1, results)
    }, 3000);
}

loopArray = async (list, newI) =>{
    for(let i = newI; i < list.length; i++){
        
            console.log(i)
            let results = await requestBggApi(list[i], i)
            console.log(results)
            //if the results is not a status code 200
            //then break, call function again 
            if(results.length <= 0){
                continue
            }
            else if(results[0] === 0){
                console.log(results[1])
                return iterateFunction(results[1])
            }
            else
            {
                let productId = list[i].product_id
                AddTag(results, productId)
            }
    }  
}

AddTag = async (results, id) =>{ 
    let tags = results.map(i => apiTag + i);
    console.log(tags)
    let currentTags = await getCurrentTags(id)
    console.log(currentTags)
}

requestBggApi = (obj, i) =>{
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
               console.log(error)
            }
            else
            {
                //if request is not successful 
                //loop though the same index again
                let json = JSON.parse(body)
                let bggTags = json[search]
                if(i === 5 ){
                    resolve([0, i]);
                }
                if(response.statusCode != 200){
                    console.log(`status code: ${response.statusCode}`)
                    resolve([0, i-1]);
                }
                else
                {
                    resolve(bggTags)    
                }    
            }
        })
    })
}

//gets the current tags of products 
//from shopify inventory
getCurrentTags = async (id) =>{
    let getTag = await
    shopify.product
        .get(id, {fields: 'tags'})
        .then((tags)=>{
            return tags
        })
        .catch((err)=>{
            console.log(err)
        })
    return getTag
}

errorHandling = () =>{
    errorCheck.push(id)
}

updateTags = () =>{
    
}
loopArray(array1, 0)
