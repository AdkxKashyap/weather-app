const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geoCode=require("./utils/geocoding")//Address->Latitude/longitude
const forecast=require("./utils/forecast")//Lat/long->forecast
//These were used to create static web pages,to create dynamic web apps we are using handlebars.js.Hbs is a express plugin for handlebars.js
const publicDirectoryPath = path.join(__dirname, "../public"); //path module is used to manage directory paths
const port=process.env.PORT || 3000
const viewDir = path.join(__dirname, "../templates/views"); //by default the location of the hbs views are set to view folder.
const partialPath = path.join(__dirname, "../templates/partials");
app.use(express.static(publicDirectoryPath)); //since index.html is a special name.The is serving the public directory.Consists of css and js files

app.set("view engine", "hbs"); //Using hbs for dynamic websites
app.set("views", viewDir); //changing view location

hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Akash"
  });
});
app.get("/help", (req, res) => {
  res.render("HELP", {
    title:"Help",
    helpText: "This is the help section",
    name:"Akash"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather",
    name: "Akash"
  });

});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      errorMessage:"Provide an address"
    })
  }
  var address=req.query.address
  

  geoCode(address,(error,{latitude,longitude,place}={})=>{
    if(error){
      return res.send({
        errorMessage:error
      })      
    }
    forecast(latitude,longitude,(error,response)=>{
        if(error){
          res.send({
            errorMessage:error
          })
        }

        res.send({
          place,
          forecast:response
        })
    })
  })
});
app.get("/help/*",(req,res)=>{
  res.render("404",{
    title:"404",
    name:"akash",
    errorMessage:"Help article not found"
  })
})
app.get("*",(req,res)=>{
  res.render("404",{
    title:"404",
    name:"akash",
    errorMessage:"Not Found"
  })
})
app.listen(port, () => {
  console.log("server is up on port"+port);
});
