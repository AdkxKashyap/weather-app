const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    url="https://api.darksky.net/forecast/6a7acbcbc73d39a81091c39250342a50/"+latitude+","+longitude+"?units=si"

    request({url,json:true},(error,{body})=>{//Using destructurin assignment.Response consists of body property,we need only the body 
    
    if(error){
        callback('Connection Error',undefined)
    }
    else if(body.error){
        callback(body.error,undefined)
    }else{
             callback(undefined,body.currently.summary+"."+"It is currently "+body.currently.temperature+" degrees out.There is "
                +body.currently.precipProbability+"% chance of rain")
    }
    
   
})

}

module.exports=forecast