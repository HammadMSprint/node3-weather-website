const request = require("request")

const forecast=(long,lat,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=6eeba8e9396e9b672803e1d26283cd20&query="+encodeURIComponent(lat)+","+encodeURIComponent(long)+"&units=m"

    request({url, json:true},(error,{body})=>{
        if (error){
            callback("Unable to connect to weather services",undefined)
        } else if(body.error){
            callback("Unable to find location, try another search",url)
        }else{
            console.log(body.current)
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently: " +body.current.temperature + " degrees out. It feels like " +body.current.feelslike+ " degrees. The humidity today is: "+body.current.humidity)
        }
    })

}

module.exports=forecast