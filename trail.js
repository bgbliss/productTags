
loopArray = (list, newI) =>{
    for(let i = newI; i < list.length; i++){
        setTimeout(() => {
            requestBggApi(list[i], i)
        }, 300 * (i + 1));
    }
}

requestBggApi = (list, i) =>{
    console.log(list, i)
}

let arry = [22,33,13,44,55];

loopArray(arry, 0)