
const AWS = require("aws-sdk");
const config = require("./config");
const http = require("http");

const dishes = require("./mockdata/dishes");

module.exports.createReservation = (name, email) => {
  return Promise.resolve(()=>{})
};

module.exports.getTableByDeviceId = (deviceId) => {
  return Promise.resolve(()=>{})
};

module.exports.addOrderInhouse = (orderlines, deviceId) => {
  return Promise.resolve(()=>{})
};


module.exports.getTableByDeviceId = (deviceId) => {
  return Promise.resolve(()=>{})
};


module.exports.getDishes = (size, number) => {
  return Promise.resolve(()=>dishes)
};

module.exports.getTableByDeviceId = (deviceId) => {
  return Promise.resolve(()=>{})
};

module.exports.getTableByDeviceId = (deviceId) => {
  return Promise.resolve(()=>{})
};
