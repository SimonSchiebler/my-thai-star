module.exports.messages = {
    LaunchRequestHandler: {
      sppechoutput:
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
      orderNotConfirmed:
        "I'm Sorry to hear that. If you want to make a new Order please call the My Thai Star Skill again.",
      buildCurrentOrderContents: (orders) => {
        var speakOutput = "Your Order is: ";
        speakOutput += order
          .map((order) => `${order.amount} times the ${order.dish.name}. `)
          .join("");
        return (speakOutput += "Is that correct?");
      },
    },
    OrderStateHandler: {
      buildOpenOrders: (orders) => {
        let res =
          "you currently have " + orders.content.length + " open orders. \n";
        const states = ["ordered", "preperation", "delivery"];
        for (const order of orders) {
          state = states[order.orders[0].stateId];
          var t = new Date(1970, 0, 1);
          t.setSeconds(parseInt(orders.content[i].creationDate) + 7200);
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
    },
    AddressIntentHandler: {
      address:
        "The restaurants address is Place de l'Étoile - 11 rue de Tilsitt - 75017 Paris.",
    },
    WaiterIntentHandler: {
      waiterWasCalled:
        "The waiter for your table was informed that you need help.",
    },
    BillIntentHandler: {
      billRequested:
        "The waiter for your table was informed that you want to pay and need the bill.",
    },
    MenuIntentHandler: {
      whatIsOnTheMenu: "The current Items on the Menu are: ",
      askMoreDishes: "do you want to hear more dishes?",
      noMoreDishes: "Sorry there are no more dishes on the menu",
      endOfMenu: "Thats everything that is on the menu.",
      endingPhrase: "Hope you heared something you liked",
    },
    HelpIntentHandler: {
        helpMessage: "I currently have following commands: order food, reserve a table and whats the state of my order"
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
  