module.exports.messages = {
  LaunchRequestHandler: {
    spechoutput:
      "Welcome to My Thai Star. If you want to know what i can do for you please say Help",
  },
  ReserveIntentHandler: {
    buildReservedTableAwnser: (email, date, time) =>
      `Reserved Table for: ${email} for ${date} at ${time}`,
    askForDate: "On what date do you want to reserve the table?",
    askForTime: "On what time do you want to reserve the table?",
    askForNumberOfPeople: "With how many people are you going to come?",
    addAnOrderQuestion: "Do you want to add an order to your reservation?",
    askForItem: "What item do you want to add to your order?",
    homeRestriction: "Sorry but you can only reserve a table when you use the Skill at home.",
  },
  OrderIntentHandler: {
    didNotUnderstandDish:
      "Sorry, i did not understand you, please order an item from the menu",
    askForItem: "What item do you want to add to your order?",
    askForItemCount: "How many times would you like to order that item",
    askOneMore: "Do you want to add another item from the Menu?",
    askRepeatOrder: "Do you want to hear your Order again?",
    deliveryConfirmation:
      "Your delivery has been placed. Thank you for ordering from us.",
    orderConfirmation:
      "Your Order has been placed. Thank you for your booking.",
    orderInhouseConfirmation:
      "Your Order has been placed. A waiter should be soon with you to bring you the food.",
    orderNotConfirmed:
      "I'm Sorry to hear that. If you want to make a new Order please call the My Thai Star Skill again.",
    buildCurrentOrderContents: (orders) => {
      var speakOutput = "Your Order is: ";
      speakOutput += orders
        .map((orders) => `${orders.amount} times the ${orders.dish.name}. `)
        .join("");
      return (speakOutput += "Is that correct?");
    },
  },
  OrderStateHandler: {
    buildOpenOrders: (orders) => {
      let res =
        "you currently have " + orders.length + " open orders. \n";
      const states = ["ordered", "preperation", "delivery"];
      for (const order of orders) {
        state = states[order.orders[0].stateId];
        var t = new Date(1970, 0, 1);
        t.setSeconds(parseInt(order.creationDate) + 7200);
        var date =
          t.toDateString() + " at " + t.getHours() + ":" + t.getMinutes();
        res +=
          orders.length == 1
            ? `Your order is currently in the state: ${state}. It was placed on: ${date}`
            : `Your ${
                i + 1
              }th order is currently in the state: ${state}. It was placed on: ${date}.`;
      }
      return res;
    },
    homeRestriction: "Sorry but you can only ask for the order state when you use the Skill at home.",
  },
  AddressIntentHandler: {
    address:
      "The restaurants address is Place de l'Étoile - 11 rue de Tilsitt - 75017 Paris.",
    homeRestriction: "Sorry but you can only ask for the address when you use the Skill at home.",
  },
  WaiterIntentHandler: {
    waiterWasCalled:
      "The waiter for your table was informed that you need help.",
    inhouseRestriciton: "Sorry but you can only call for a waiter when you are at the restaurant.",
  },
  BillIntentHandler: {
    billRequested:
      "The waiter for your table was informed that you want to pay and need the bill.",
      inhouseRestriciton: "Sorry but you can only ask for the bill when you are at the restaurant.",
  },
  MenuIntentHandler: {
    whatIsOnTheMenu: "The current Items on the Menu are: ",
    askMoreDishes: "do you want to hear more dishes?",
    noMoreDishes: "Sorry there are no more dishes on the menu",
    endOfMenu: "Thats everything that is on the menu.",
    endingPhrase: "Hope you heared something you liked",
  },
  HelpIntentHandler: {
      helpMessageHome: "I currently have following commands: order food, reserve a table and whats the state of my order.",
      helpMessageInhouse: "I currently have following commands: order, menu, bill and waiter."
  },
  CancelAndStopIntentHandler:{
    bye:"Goodbye!"
  },
  error: {
    genericError:"Sorry, I had trouble doing what you asked. Please try again.",
    NOTIFY_MISSING_PERMISSIONS:
      "Please enable Customer Profile permissions in the Amazon Alexa app.",
    NAME_MISSING:
      "You can set your name either in the Alexa app under calling and messaging, or you can set it at Amazon.com, under log-in and security.",
    EMAIL_MISSING:
      "You can set your email at Amazon.com, under log-in and security.",
    NUMBER_MISSING:
      "You can set your phone number at Amazon.com, under log-in and security.",
  },
};
