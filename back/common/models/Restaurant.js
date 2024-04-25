const { DataTypes } = require("sequelize");
const { roles } = require("../../config");

const RestaurantModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  pax_capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descritpion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  menu: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("restaurants", RestaurantModel);
  },

  createRestaurant: (restaurant) => {
    return this.model.create(restaurant);
  },

  findRestaurant: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateRestaurant: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllRestaurants: (query) => {
    return this.model.findAll({
      where: query,
    });
  },

  deleteRestaurant: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
