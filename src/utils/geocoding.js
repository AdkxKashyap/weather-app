const request=require('request')

const geoCode=(address,callback)=>{
    const geoCodeURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYWRreCIsImEiOiJjanV0bGYweXEwNnE0M3lxdHhuNzJ0aXo2In0.7cAUqvAbEd94rJFUfYgM2Q"
    request({url:geoCodeURL,json:true},(error,{body})=>{//Using destructuring
            if(error)
            {
                    callback("Connection Error",undefined)
            }
            else if(body.features.length==0){
                callback("Invalid Location",undefined)
            }else{
                
                const res=body
                callback(undefined,{
                    latitude:res.features[0].center[1],
                    longitude:res.features[0].center[0],
                    place:res.features[0].place_name
                })
            }
            
        })
        
}
// geoCode('q123',(err,res)=>{
//     console.log(err)
//     console.log(res)
// })
module.exports=geoCode