const BookingModel = require("../../common/models/Booking");

module.exports = {
  createUserBooking: (req, res) => {
    const { body: booking } = req;
    BookingModel.createBooking(booking)
      .then((booking) => {
        return res.status(200).json({
          status: true,
          data: booking.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
  getUserBookings: (req, res) => {
    const {
      user: { userId },
    } = req;

    BookingModel.findAllBookings({ id_user: userId })
      .then((bookings) => {
        return res.status(200).json({
          status: true,
          data: bookings,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getRestaurantBookings: (req, res) => {
    const {
      restaurant: { restaurantId },
    } = req;

    BookingModel.findAllBookings({ id_restaurant: restaurantId })
      .then((bookings) => {
        return res.status(200).json({
          status: true,
          data: bookings,
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
