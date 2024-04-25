const router = require("express").Router();

const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

const UserController = require("../users/controllers/UserController");

const updateUserPayload = require("../users/schemas/updateUserPayload");
const changeRolePayload = require("../users/schemas/changeRolePayload");
const { roles } = require("../config");

// router.get("/", UserController.getUser);

// router.post('/register', UserController.createUser);

router.get("/", [IsAuthenticatedMiddleware.check], UserController.getUser);

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
