const router = require("express").Router();

const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

const RestaurantController = require("../restaurants/controllers/RestaurantController");
const UserController = require("../users/controllers/UserController");

const updateRestaurantPayload = require("../restaurants/schemas/updateRestaurantPayload");
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

module.exports = router;
