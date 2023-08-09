const path=require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

//console.log(__dirname)
//console.log(path.join(__dirname,"../public"))

const app=express()//starting express

//define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public")//getting path to html files
const viewPath = path.join(__dirname,"../templates/views")//used for when the file isn't called "views"
const partialPath = path.join(__dirname,"../templates/partials")

//setting up handlebars engine and views location
app.set("view engine", "hbs")//setting up handlebars
app.set("views",viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))//used to access all html files that deal with web page content

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name: "Hammad Mardani"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Hammad Mardani"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        message:"This is the help page",
        title:"Help",
        name:"Hammad Mardani"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must input valid address"
        })
    }

    geocode(req.query.address,(error,{location, latitude, longitude}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                address:req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=>{ //for people looking for help but can't find it
    res.render("404",{
        title:"404",
        name:"Hammad Mardani",
        errorMessage:"Help not found"
    })
})

app.get("*",(req,res)=>{ //use "*" for any URLs that haven't been defined, this needs to come last
    res.render("404",{
        title:"404",
        name:"Hammad Mardani",
        errorMessage:"URL not found"
    })
})

app.listen(3000,()=>{
    console.log("server is up on port 3000")
}) //starts the server