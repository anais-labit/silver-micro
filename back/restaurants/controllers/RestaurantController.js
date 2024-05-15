const RestaurantModel = require("../../common/models/Restaurant");

module.exports = {
  createRestaurant: (req, res) => {
    const { body: restaurant } = req;

    RestaurantModel.createRestaurant(restaurant)
      .then((restaurant) => {
        return res.status(200).json({
          status: true,
          data: restaurant.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
  // =======================================================================
  getRestaurant: (req, res) => {
    const {
      restaurant: { restaurantId },
    } = req;

    RestaurantModel.findRestaurant({ id: restaurantId })
      .then((restaurant) => {
        return res.status(200).json({
          status: true,
          data: restaurant.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
  // =======================================================================
  updateRestaurant: (req, res) => {
    const {
      params: { restaurantId },
      body: payload,
    } = req;

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the restaurant.",
        },
      });
    }

    RestaurantModel.updateRestaurant({ id: restaurantId }, payload)
      .then(() => {
        return RestaurantModel.findRestaurant({ id: restaurantId });
      })
      .then((restaurant) => {
        return res.status(200).json({
          status: true,
          data: restaurant.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // =======================================================================
  deleteRestaurant: (req, res) => {
    const {
      params: { restaurantId },
    } = req;

    RestaurantModel.deleteRestaurant({ id: restaurantId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfRestaurantsDeleted: numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
  // =======================================================================
  getAllRestaurants: (req, res) => {
    RestaurantModel.findAllRestaurants(req.query)
      .then((restaurants) => {
        return res.status(200).json({
          status: true,
          data: restaurants,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
