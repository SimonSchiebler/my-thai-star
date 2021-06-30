const AWS = require("aws-sdk");
const config = require("./config");
const http = require("http");

const dishes = require("./mockdata/dishes");
const tables = require("./mockdata/tables");
const orders = require("./mockdata/orders");
const dishes_last = require("./mockdata/dishes_last")

module.exports.createReservation = (name, email) => {
  return Promise.resolve(() => {});
};

module.exports.createDelivery = (name, email, orderlines, address) => {
  return Promise.resolve(() => {});
};

module.exports.createOrder = (
  name,
  email,
  orderlines,
  combinedDate,
  assistants
) => {
  return Promise.resolve(() => {});
};

module.exports.addOrderInhouse = (orderlines, deviceId) => {
  return Promise.resolve(() => {});
};

module.exports.getTableByDeviceId = (deviceId) => {
  return new Promise((resolve,reject)=>{
    if(deviceId = "testId"){
    resolve(tables)
    } else {
      resolve({})
    }
})
};

module.exports.getDishes = (size, number) => {
  return new Promise((resolve,reject)=>{
    if(number < 2){
      resolve(dishes)
    } else if (number = 2) {
      resolve(dishes_last)
    }
  })
};

module.exports.getActiveOrders = (email) => {
  return new Promise((resolve,reject)=>{
    resolve(orders)
  })
}

module.exports.setWaiterState = (state, deviceId) => {
  return Promise.resolve(() => {});
};