// iterate though object till value is returned 
const iterate = (obj) => {
    Object.keys(obj).forEach(key => {
    if(obj[key] === apiTag){
        return obj.value
    }
    if (typeof obj[key] === 'object') {
            iterate(obj[key])
        }
    })
}

module.exports = iterate