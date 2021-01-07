"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

module.exports = function (sequelize, DataTypes) {
  var Accommodation = sequelize.define('Accommodation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    locationID: {
      allowNull: true,
      type: DataTypes.UUID
    },
    propertyType: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    typeOfBed: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    photos: DataTypes.STRING
  });

  Accommodation.associate = function (models) {
    var _Accommodation$hasMan;

    Accommodation.hasOne(models.Amenity, {
      foreignKey: 'AccommodationId',
      as: 'Amenity',
      onDelete: 'cascade'
    });
    Accommodation.hasMany(models.Booking, (_Accommodation$hasMan = {
      foreignKey: 'accommodationId'
    }, (0, _defineProperty2["default"])(_Accommodation$hasMan, "foreignKey", 'AccommodationId'), (0, _defineProperty2["default"])(_Accommodation$hasMan, "as", 'Booking'), (0, _defineProperty2["default"])(_Accommodation$hasMan, "onDelete", 'cascade'), _Accommodation$hasMan));
  };

  return Accommodation;
};