const { DataTypes } = require("sequelize");

const BookingModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  id_restaurant: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "restaurants",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pax: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("bookings", BookingModel);
  },

  createBooking: (booking) => {
    return this.model.create(booking);
  },

  findBooking: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateBooking: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  // findAllBookings: (query) => {
  //   return this.model.findAll({
  //     where: query,
  //   });
  // },

  deleteBooking: (query) => {
    return this.model.destroy({
      where: query,
    });
  },

  findUserBookings: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
};


