const router = require("express").Router();

const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

const UserController = require("../users/controllers/UserController");
const BookingController = require("../bookings/controllers/BookingController");

const updateUserPayload = require("../users/schemas/updateUserPayload");
const changeRolePayload = require("../users/schemas/changeRolePayload");
const { roles } = require("../config");
const RestaurantController = require("../restaurants/controllers/RestaurantController");

router.get("/", [IsAuthenticatedMiddleware.check], UserController.getUser);
router.get("/bookings", [IsAuthenticatedMiddleware.check], BookingController.getUserBookings);

router.get(
  "/restaurants/:title",
  [IsAuthenticatedMiddleware.check],
  RestaurantController.getRestaurantByName
);


router.post(
  "/restaurants/:title/books",
  [IsAuthenticatedMiddleware.check],
  BookingController.createUserBooking
);



// router.patch('/update/:userId', [IsAuthenticatedMiddleware.check], UserController.updateUser)

// router.patch(
//     "/",
//     [
//       IsAuthenticatedMiddleware.check,
//       SchemaValidationMiddleware.verify(updateUserPayload),
//     ],
//     UserController.updateUser
//   );


module.exports = router;
