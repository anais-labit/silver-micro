const router = require("express").Router();
const UserController = require("./controllers/UserController");
const { roles } = require("../config");

router.get("/", UserController.getUser);

router.get("/all", UserController.getAllUsers);

router.post('/register', UserController.createUser);

module.exports = router;