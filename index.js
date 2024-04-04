const express = require('express');
const app = express();
const { Sequelize } = require("sequelize");

// port is defined in the config.js file
const { port } = require("./config");
const PORT = port;

// Importing the Routes
const UserRoutes = require("./users/routes");

// Importing the UserModel
const UserModel = require("./common/models/User");


app.use(express.json());

// Database Connection
const sequelize = new Sequelize({
  dialect: "mysql",
  database: "silver-micro",
  username: "root",
  password: "root",
  host: "localhost",
  port: 8888,
  logging : false
});

// test the connection
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully. TOTO");
}
catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Initialising the UserModel
UserModel.initialise(sequelize);

//Syncing the model with the database

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");
  
  app.get('/', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil !');
  });
  app.use("/user", UserRoutes);
  
  app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
  });
})
  .catch((err) => {
    console.log("Sequelize Initialisation threw an error:", err);
  });