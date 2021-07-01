const Restaurant = require("../model/restaurant");

//-----Create Schema
exports.create = (req, res) => {
  // Validate request

  if (!req.body.name) {
    return res.status(400).send({
      message: "",
    });
  }

  // Create a Restaurant
  const rest = new Restaurant({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    openingtime: req.body.openingtime,
    closingtime: req.body.closingtime,
    menu: req.body.menu,
    active: req.body.active,
  });

  // Save Restaurant in the database
  rest
    .save()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restaurant.",
      });
    });
};

//---------------Find All-------------
exports.findAll = (req, res) => {
  Restaurant.find()
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Restaurant.",
      });
    });
};

//--------------Delete

exports.delete = (req, res) => {
  Restaurant.findByIdAndRemove(req.params.restId) //
    .then((rest) => {
      if (!rest) {
        return res.status(404).send({
          message: "Restaurant not found with id " + req.params.restId,
        });
      }
      res.send({ message: "Restaurant deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Restaurant not found with id " + req.params.restId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Restaurant with id " + req.params.restId,
      });
    });
};

//--------------Update

exports.update = (req, res) => {
  // Find Restaurant and update it with the request body
  Restaurant.findByIdAndUpdate(
    req.params.restId,
    {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      openingtime: req.body.openingtime,
      closingtime: req.body.closingtime,
      active: req.body.active,
    },
    { new: true }
  )
    .then((rest) => {
      if (!rest) {
        return res.status(404).send({
          message: "Restaurant not found with id " + req.params.restId,
        });
      }
      res.send(rest);
      console.log(rest);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Restaurant not found with id " + req.params.restId,
        });
      }
      return res.status(500).send({
        message: "Error updating Restaurant with id " + req.params.restId,
      });
    });
};

// Single Record

exports.findOne = (req, res) => {
  Restaurant.findById(req.params.restId)
    .then((rest) => {
      if (!rest) {
        return res.status(404).send({
          message: "Restaurant not found with id " + req.params.restId,
        });
      }
      res.send(rest);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Restaurant not found with id " + req.params.restId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Restaurant with id " + req.params.restId,
      });
    });
};

//-------------For active /unactive restaurant

exports.findAllProjection = (req, res) => {
  Restaurant.find({ active: "true" }, { _id: 1, active: 0 })
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Restaurant.",
      });
    });
};
