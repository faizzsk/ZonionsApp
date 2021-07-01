const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },

  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  openingtime: {
    type: String,
    required: true,
  },

  closingtime: {
    type: String,
    required: true,
  },

  menu: {
    type: String,
    required: true,
  },

  active: {
    type: String,
    default: "false",
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },

  // timestamps: true
});

module.exports = mongoose.model("restaurant", RestaurantSchema);
