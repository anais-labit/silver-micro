const router = require("express").Router();


const IsAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("./../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("./../common/middlewares/CheckPermissionMiddleware");

const RestaurantController = require("./controllers/RestaurantController");

const updateRestaurantPayload = require("./schemas/updateRestaurantPayload");
const { roles } = require("../config");

router.get(
  "/panel/restaurants",
  [IsAuthenticatedMiddleware.check],
  RestaurantController.getAllRestaurants
);

module.exports = router;