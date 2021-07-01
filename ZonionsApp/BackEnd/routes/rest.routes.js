
module.exports = (app) => {
    const restaurant = require('../controller/rest.controller');
    const verify = require('../controller/admin.controller');
    // Create a new Restaurant
    app.post('/restaurants', restaurant.create);

    // Retrieve all Restaurant
    app.get('/restaurants',verify.Verify,restaurant.findAll);

    // // Retrieve a single Restaurant with Restaurant ID
    app.get('/restaurants/:restId', restaurant.findOne);

    // // Update a Restaurant with Restaurant id
    app.put('/restaurants/:restId', restaurant.update);

    // // Delete a Restaurant with Restaurant id
    app.delete('/restaurants/:restId', restaurant.delete);

    // retrive required using projection
    
    app.get('/restaurants/all/all', restaurant.findAllProjection);


}

