module.exports = (app) => {
   
    const admin = require('../controller/admin.controller');
   // const verify = require("../controller/.controller")


   //Login ----
   app.post('/login', admin.Login);

   //--Register
    app.post('/register', admin.Register);

    //-----
    app.get('/login',admin.getUser)


}

