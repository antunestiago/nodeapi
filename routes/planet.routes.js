module.exports = app => {
    const planet = require("../controllers/planet.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Planet
    router.post("/", planet.create);
  
    // Retrieve all Planets
    router.get("/", planet.findAll);
  
    // Retrieve all Star Wars Planets 
    router.get("/star-wars-planet", planet.getSWPlanets);

    // Retrieve a single Planet with id
    router.get("/:id", planet.findOne);
  
    // Delete a Planet with id
    router.delete("/:id", planet.delete);

    // Delete all Planets
    router.delete("/", planet.deleteAll);
  
    app.use('/api/planets', router);
  };