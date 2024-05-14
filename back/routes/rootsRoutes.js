const router = require("express").Router();

const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

const RestaurantController = require("../restaurants/controllers/RestaurantController");
const UserController = require("../users/controllers/UserController");
const AuthorizationController = require("../autorization/controllers/AutorizationController");

const createRestaurantPayload = require("../restaurants/schemas/createRestaurantPayload");
const registerUserPayload = require("../autorization/schemas/registerPayload");

const { roles } = require("../config");

router.get(
  "/panel/restaurants",
  [IsAuthenticatedMiddleware.check],
  RestaurantController.getAllRestaurants
);

router.get(
  "/panel/users",
  [IsAuthenticatedMiddleware.check],
  UserController.getAllUsers
);

router.post(
  "/panel/restaurants/create",
  [SchemaValidationMiddleware.verify(createRestaurantPayload)],
  RestaurantController.createRestaurant
);

router.post(
  "/panel/users/create",
  [SchemaValidationMiddleware.verify(registerUserPayload)],
  AuthorizationController.register
);

module.exports = router;
