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
  "/panel/restaurants/:restaurantId",
  [IsAuthenticatedMiddleware.check],
  RestaurantController.getRestaurant
);


router.get(
  "/panel/bookings",
  [IsAuthenticatedMiddleware.check],
  BookingController.getUserBookings
);

router.patch(
  "/panel/update-restaurant/:restaurantId",
  [IsAuthenticatedMiddleware.check],
  RestaurantController.updateRestaurant
);

module.exports = router;
