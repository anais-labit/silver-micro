const express = require("express");
const cors = require("cors");

const app = express();
const { Sequelize } = require("sequelize");

// port is defined in the config.js file
const { port } = require("./config");
const AuthRoute = require("./autorization/routes");
const { username, password, db_port, host } = require("./dbConnect");

// Importing the Routes
const UserRoutes = require("./users/routes");

// Importing the UserModel
const UserModel = require("./common/models/User");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Database Connection
const sequelize = new Sequelize({
  dialect: "mysql",
  database: "silver-micro",
  username: `${username}`,
  password: `${password}`,
  host: `${host}`,
  port: `${db_port}`,
  logging: false,
});

// test the connection
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully. TOTO");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Initialising the UserModel
UserModel.initialise(sequelize);

//Syncing the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    app.get("/", (req, res) => {
      res.send("<p class='underline'>Bienvenue sur la page d'accueil !</p>");
    });

    app.use("/auth", AuthRoute);

    app.use("/user", UserRoutes);

    app.listen(port, () => {
      console.log(`Le serveur écoute sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Sequelize Initialisation threw an error:", err);
  });
