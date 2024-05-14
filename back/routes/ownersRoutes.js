const router = require("express").Router();

const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const RestaurantController = require("../restaurants/controllers/RestaurantController");

const { roles } = require("../config");
const BookingController = require("../bookings/controllers/BookingController");

router.get(
  "/panel/restaurants",
  [IsAuthenticatedMiddleware.check],
  RestaurantController.getAllRestaurants
);

router.get(
  "/panel/bookings",
  [IsAuthenticatedMiddleware.check],
  BookingController.getOwnerBookings
);



module.exports = router;
