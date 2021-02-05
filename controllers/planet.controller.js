const db = require("../models");
const Planet = db.planets;
const server = require("../server.js")

// Create and Save a new Planet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.climate || !req.body.terrain) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Planet
  const planet = new Planet({
    name: req.body.name,
    climate: req.body.climate,
    terrain: req.body.terrain
  });

  // Save Planet in the database
  planet
    .save(planet)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Planet."
      });
    })
};

// Retrieve all Planet from the database.
const getPagination = (page, size) => {
    const defaultSize = 10;
    const limit = size ? +size : defaultSize;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  

exports.findAll = (req, res) => {
    const name = req.query.name;
    
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    Planet.paginate(condition, { offset, limit })
      .then(data => {
        res.send({
            totalItems: data.totalDocs,
            planets: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving planets."
        });
      });
};


// Delete all Planets

exports.deleteAll = (req, res) => {
  Planet.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Planets were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all planets."
      });
    });
};

// Find a single Planet with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Planet.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Planet with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Planet with id=" + id });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;

    Planet.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
        res.status(404).send({
            message: `Cannot delete Planet with id=${id}. Maybe Planet was not found!`
        });
        } else {
        res.send({
            message: "Planet was deleted successfully!"
        });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Could not delete Planet with id=" + id
        });
    });
}




exports.getSWPlanets = async (req, res) => {
    res.send(server.SWPlanets);
};

