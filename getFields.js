const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss-dev.myshopify.com';
const Count = require('./count');
var fs = require('fs')

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret,
    autoLimit: { calls: 2, interval: 1000, bucketSize: 35 }
});
let arr = []

getProducts =  async (i) =>{
    let get = await
        shopify.product
        .list({limit: 250, page: i, product_type: "Board Games"})
        .then((product) => {
            product.forEach(element => {
                let id = element.id
                return getBggID(id)
            })
        })
    return get
}

getBggID = async (productID) =>{
    let data = await
        shopify.metafield.list({metafield: { owner_resource: 'product', owner_id: productID }})
            .then((fields)=>{
                fields.forEach(element =>{
                    if(fields.length === 1){
                        // if(typeof element.vlaue === 'number' ){
                            let object = {
                                product_id: productID,
                                bgg_id: element.value
                            }    
                            console.log(object)
                            arr.push(object)
                        //}
                    }
                    else{
                        for(let i=0; i < fields.length; i++){
                            if(fields[i].key === 'BGG_ID'){
                                let object = {
                                    product_id: productID,
                                    bgg_id: fields[i].value
                                }
                                arr.push(object)
                            }
                        }
                    }
                })
                return arr
                })
            .catch(err => {
                console.log(err)
            })
        return data
}

const forLoop = async _ => {
    let totalLoops = await Count.product('loop').then((results)=>{return results}).catch(function(error) {console.error(error);});
    let totalProducts = await Count.product('total').then((results)=>{return results});
    let loops = []
    console.log(totalProducts)
    console.log(totalLoops)
    for(var i=0; i <= 8; i++){
        loops[i] = Math.floor(totalLoops/10)
    }
    loops[9] = totalLoops - loops.reduce((a, b) => a + b, 0)
    let count = 0

    for(let i=0; i < loops.length ;i++){
        for(let j = 0; j < loops[i]; j++){
            count += 1
            let arry = await getProducts(count);
            console.log(count)
            if(count === totalLoops){
                console.log(results)
                var json = JSON.stringify(results)
                //fs.writeFile('myjsfile.js', json, 'utf8');  
                fs.writeFile('allproductstxt.js', json, 'utf8');  
                //return results
            }
        }
    }
}

forLoop()