const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./models");
let planets = [];

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/planet.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.on('ready', function() { 
  app.listen(PORT, function(){ 
      console.log(`Server is running on port ${PORT}.`);
  }); 
}); 

// Retrieve all planets from swapi
const fetch = require("node-fetch");

// code adapted from https://dev.to/andre347/how-to-use-a-do-while-loop-for-api-pagination-375b 

async function getPages(planets) {
  // set some variables
  const baseUrl = `https://swapi.dev/api/planets/?page=`;
  let page = 1;
  // create empty array where we want to store the people objects for each loop
  
  // create a lastResult array which is going to be used to check if there is a next page
  let lastResult = [];
  do {
    // try catch to catch any errors in the async api call
    try {
      // use node-fetch to make api call
      const resp = await fetch(`${baseUrl}${page}`);
      const data = await resp.json();
      lastResult = data;
      data.results.forEach(p => {
        // destructure the person object and add to array
        const plnt = {"name": p.name , "films": p.films.length} ;
        planets.push(plnt);
      });
      // increment the page with 1 on each loop
      page++;
    } catch (err) {
      console.error(`Oeps, something is wrong ${err}`);
    }
    // keep running until there's no next page
  } while (lastResult.next !== null);
  // let's log out our new people array
  return planets;
}

const getPlanets = async () => { 
  await getPages(planets); 
  exports.SWPlanets = planets;
  console.log("Connected to the database!");
  app.emit('ready'); 
}


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    getPlanets();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


module.exports = app;
