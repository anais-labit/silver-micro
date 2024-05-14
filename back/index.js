const express = require("express");
const cors = require("cors");

const app = express();
const { Sequelize } = require("sequelize");

// port is defined in the config.js file
const { port } = require("./config");
const { username, password, db_port, host } = require("./dbConnect");

// Importing routes
const AuthRoute = require("./autorization/routes");
const UsersRoutes = require("./routes/usersRoutes");
const RootsRoutes = require("./routes/rootsRoutes");
const OwnerRoutes = require("./routes/ownersRoutes");

// Importing models
const UserModel = require("./common/models/User");
const RestaurantModel = require("./common/models/Restaurant");
const BookingModel = require("./common/models/Booking")

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

// Initialising models
UserModel.initialise(sequelize);
RestaurantModel.initialise(sequelize);
BookingModel.initialise(sequelize);


//Syncing the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    app.get("/", (req, res) => {
      res.send("<p class='underline'>Bienvenue sur la page d'accueil !</p>");
    });

    app.use("/auth", AuthRoute);
    app.use("/user", UsersRoutes);
    app.use("/root", RootsRoutes);
    app.use("/owner", OwnerRoutes);


    app.listen(port, () => {
      console.log(`Le serveur écoute sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Sequelize Initialisation threw an error:", err);
  });
