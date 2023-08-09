const request = require("request")

const forecast=(long,lat,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=6eeba8e9396e9b672803e1d26283cd20&query="+encodeURIComponent(lat)+","+encodeURIComponent(long)+"&units=m"

    request({url:url, json:true},(error,{body})=>{
        if (error){
            callback("Unable to connect to weather services",undefined)
        } else if(body.error){
            callback("Unable to find location, try another search",url)
        }else{
            callback(undefined,{
                description : body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })

}

module.exports=forecast