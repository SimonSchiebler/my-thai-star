// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require("ask-sdk-core");

const util = process.env.DEBUG ? require("./utilMock") : require("./util");

let responsesDE = require("./responses/DE");
let responsesEN = require("./responses/EN");

const getResponseObject = (requestEnvelope) =>{
  //TODO select based on lang
  //switch (requestEnvelope.something)
  //{
  //case DE:
  //  return responsesDE;
  //case EN:
  //  return responsesEN;
  //default:
  //  return responsesDE;
  //}
  return responsesDE;
}

const PERMISSIONS = [
  "read::alexa:device:all:address",
  "alexa::profile:name:read",
  "alexa::profile:email:read",
  "alexa::profile:mobile_number:read",
];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  async handle(handlerInput) {
    const messages = getResponseObject(handlerInput.requestEnvelope).LaunchRequestHandler;
    const speakOutput = messages.sppechoutput;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const ReserveIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ReserveIntent"
    );
  },
  async handle(handlerInput) {
    const messages = getResponseObject(handlerInput.requestEnvelope).ReserveIntentHandler;
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    const lastAction = sessionAttributes.lastAction;

    switch (lastAction) {
      case "setDate":
        sessionAttributes.date =
          handlerInput.requestEnvelope.request.intent.slots.date.value;
        break;
      case "setTime":
        sessionAttributes.time =
          handlerInput.requestEnvelope.request.intent.slots.time.value;
        break;
      case "setAssistants":
        sessionAttributes.assistants =
          handlerInput.requestEnvelope.request.intent.slots.assistants.value;
        break;
      case "setWantsToOrder":
        sessionAttributes.wantsToOrder =
          handlerInput.requestEnvelope.request.intent.slots.wantsToOrder.value;
        break;
      default:
        break;
    }

    const date = sessionAttributes.date;
    const time = sessionAttributes.time;
    const assistants = sessionAttributes.assistants;
    const wantsToOrder = sessionAttributes.wantsToOrder;

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    if (wantsToOrder == "no") {
      const client = handlerInput.serviceClientFactory.getUpsServiceClient();
      const email = await client.getProfileEmail();
      const name = await client.getProfileName();

      const combinedDate = date + "T" + time + ":00";

      util.createReservation(name, email, combinedDate, assistants, false);
      return handlerInput.responseBuilder
        .speak(messages.buildReservedTableAwnser (email, date, time))
        .getResponse();
    } else if (!date && wantsToOrder === undefined) {
      sessionAttributes.lastAction = "setDate";
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("date")
        .speak(messages.askForDate)
        .getResponse();
    } else if (!time && wantsToOrder === undefined) {
      sessionAttributes.lastAction = "setTime";
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("time")
        .speak(messages.askForTime)
        .getResponse();
    } else if (!assistants && wantsToOrder === undefined) {
      sessionAttributes.lastAction = "setAssistants";
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("assistants")
        .speak(messages.askForNumberOfPeople)
        .getResponse();
    } else if (date && time && assistants && wantsToOrder === undefined) {
      sessionAttributes.lastAction = "setWantsToOrder";

      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("wantsToOrder")
        .speak(messages.addAnOrderQuestion)
        .getResponse();
    } else if (date && time && assistants && wantsToOrder === "yes") {
      sessionAttributes.lastAction = "setDish";

      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .addElicitSlotDirective("dish", {
          name: "OrderIntent",
          confirmationStatus: "CONFIRMED",
          slots: {},
        })
        .speak(messages.askForItem)
        .getResponse();
    }
  },
};

const OrderIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" && request.intent.name === "OrderIntent"
    );
  },
  async handle(handlerInput) {
    const messages = getResponseObject(handlerInput.requestEnvelope).OrderIntentHandler;
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    if (!sessionAttributes.orderlist) sessionAttributes.orderlist = [];

    const lastAction = sessionAttributes.lastAction;

    switch (lastAction) {
      case "setDish":
        if (
          handlerInput.requestEnvelope.request.intent.slots.dish.resolutions
            .resolutionsPerAuthority[0].values
        ) {
          if (handlerInput.requestEnvelope.request.intent.slots.amount.value) {
            sessionAttributes.amount =
              handlerInput.requestEnvelope.request.intent.slots.amount.value;
          }
          sessionAttributes.dish =
            handlerInput.requestEnvelope.request.intent.slots.dish.resolutions.resolutionsPerAuthority[0].values[0].value;
        } else {
          return handlerInput.responseBuilder
            .addElicitSlotDirective("dish")
            .speak(messages.didNotUnderstandDish)
            .getResponse();
        }
        break;
      case "setAmount":
        sessionAttributes.amount =
          handlerInput.requestEnvelope.request.intent.slots.amount.value;
        break;
      case "setCompletedOrder":
        sessionAttributes.oneMoreOrder =
          handlerInput.requestEnvelope.request.intent.slots.completedOrder.value;
        break;
      default:
        break;
    }

    const amount = sessionAttributes.amount;
    const dish = sessionAttributes.dish;
    const oneMoreOrder = sessionAttributes.oneMoreOrder;

    const client = handlerInput.serviceClientFactory.getUpsServiceClient();
    const email = await client.getProfileEmail();
    const name = await client.getProfileName();
    const { deviceId } = handlerInput.requestEnvelope.context.System.device;
    const deviceAddressServiceClient =
      handlerInput.serviceClientFactory.getDeviceAddressServiceClient();
    const address = await deviceAddressServiceClient.getFullAddress(deviceId);

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    if (
      handlerInput.requestEnvelope.request.intent.slots.confirmation.value ===
      undefined
    ) {
      if (!dish && (oneMoreOrder === "yes" || oneMoreOrder === undefined)) {
        sessionAttributes.lastAction = "setDish";
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("dish")
          .speak(messages.askForItem)
          .getResponse();
      } else if (
        !amount &&
        (oneMoreOrder === "yes" || oneMoreOrder === undefined)
      ) {
        sessionAttributes.lastAction = "setAmount";
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("amount")
          .speak(messages.askForItemCount)
          .getResponse();
      } else if (
        amount &&
        dish &&
        (oneMoreOrder === "yes" || oneMoreOrder === undefined)
      ) {
        sessionAttributes.lastAction = "setCompletedOrder";

        sessionAttributes.orderlist.push({ dish, amount });

        delete sessionAttributes.amount;
        delete sessionAttributes.dish;
        delete sessionAttributes.completedOrder;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("completedOrder")
          .speak(messages.askOneMore)
          .getResponse();
      } else if (amount && dish && oneMoreOrder === "no") {
        return handlerInput.responseBuilder
          .addElicitSlotDirective("confirmation")
          .speak(messages.askRepeatOrder)
          .getResponse();
      }
      if (!dish && (oneMoreOrder === "yes" || oneMoreOrder === undefined)) {
        sessionAttributes.lastAction = "setDish";
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("dish")
          .speak(messages.askForItem)
          .getResponse();
      } else if (
        !amount &&
        (oneMoreOrder === "yes" || oneMoreOrder === undefined)
      ) {
        sessionAttributes.lastAction = "setAmount";
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("amount")
          .speak(messages.askForItemCount)
          .getResponse();
      } else if (
        amount &&
        dish &&
        (oneMoreOrder === "yes" || oneMoreOrder === undefined)
      ) {
        sessionAttributes.lastAction = "setCompletedOrder";

        sessionAttributes.orderlist.push({ dish, amount });

        delete sessionAttributes.amount;
        delete sessionAttributes.dish;
        delete sessionAttributes.completedOrder;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
          .addElicitSlotDirective("completedOrder")
          .speak(messages.askOneMore)
          .getResponse();
      } else if (oneMoreOrder === "no") {
        return handlerInput.responseBuilder
          .addElicitSlotDirective("confirmation")
          .speak(messages.askRepeatOrder)
          .getResponse();
      }
    } else if (
      handlerInput.requestEnvelope.request.intent.slots.confirmation.value &&
      oneMoreOrder === "no"
    ) {
      if (
        handlerInput.requestEnvelope.request.intent.slots.confirmation.value ===
          "yes" &&
        handlerInput.requestEnvelope.request.intent.slots.correct.value ===
          undefined
      ) {
        
        const speakOutput = messages.buildCurrentOrderContents(sessionAttributes.orderlist)
        return handlerInput.responseBuilder
          .addElicitSlotDirective("correct")
          .speak(speakOutput)
          .getResponse();
      } else if (
        (handlerInput.requestEnvelope.request.intent.slots.confirmation
          .value === "yes" &&
          handlerInput.requestEnvelope.request.intent.slots.correct.value ===
            "yes") ||
        handlerInput.requestEnvelope.request.intent.slots.confirmation.value ===
          "no"
      ) {
        if (sessionAttributes.wantsToOrder === undefined) {
          await util.createDelivery(
            name,
            email,
            sessionAttributes.orderlist,
            address
          );
          return handlerInput.responseBuilder
            .speak(
              messages.deliveryConfirmation
            )
            .getResponse();
        } else if (sessionAttributes.wantsToOrder === "yes") {
          const date = sessionAttributes.date;
          const time = sessionAttributes.time;
          const assistants = sessionAttributes.assistants;

          const combinedDate = date + "T" + time + ":00";

          util.createOrder(
            name,
            email,
            sessionAttributes.orderlist,
            combinedDate,
            assistants
          );
          return handlerInput.responseBuilder
            .speak(messages.orderConfirmation)
            .getResponse();
        }
      } else if (
        handlerInput.requestEnvelope.request.intent.slots.confirmation.value ===
          "yes" &&
        handlerInput.requestEnvelope.request.intent.slots.correct.value === "no"
      ) {
        return handlerInput.responseBuilder
          .speak(
            messages.orderNotConfirmed
          )
          .getResponse();
      }
    }
  },
};

const OrderStateHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "OrderStateIntent"
    );
  },
  async handle(handlerInput) {
    const messages = getResponseObject(handlerInput.requestEnvelope).OrderStateHandler
    const client = handlerInput.serviceClientFactory.getUpsServiceClient();
    const email = await client.getProfileEmail();
    const orders = await util.getActiveOrders(email);
    let res = messages.buildOpenOrders(orders.content);

    return handlerInput.responseBuilder.speak(res).getResponse();
  },
};

const AddressIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AddressIntent"
    );
  },

  async handle(handlerInput) {
    const messages = getResponseObject(handlerInput.requestEnvelope).AddressIntentHandler

    return handlerInput.responseBuilder.speak(messages.address).getResponse();
  },
};

const WaiterIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "WaiterIntent"
    );
  },
  async handle(handlerInput) {
    const messages = getResponseObject(handlerInput.requestEnvelope).WaiterIntentHandler;
    const { deviceId } = handlerInput.requestEnvelope.context.System.device;
    
    await util.setWaiterState(2, deviceId);

    return handlerInput.responseBuilder
      .speak(messages.waiterWasCalled)
      .getResponse();
  }
};

const BillIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "BillIntent"
    );
  },
  async handle(handlerInput) {
    const messages = getResponseObject(handlerInput.requestEnvelope).BillIntentHandler;
    const { deviceId } = handlerInput.requestEnvelope.context.System.device;
    console.log(deviceId);

    await util.setWaiterState(1, deviceId);

    return handlerInput.responseBuilder
      .speak(message.billRequested)
      .getResponse();
  }
};

const MenuIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "MenuIntent"
    );
  },
  async handle(handlerInput) {
    messages = getResponseObject(handlerInput.requestEnvelope).MenuIntentHandler;
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    if (!sessionAttributes.page) sessionAttributes.page = 0;

    var page = sessionAttributes.page;
    const size = 3;

    if (
      handlerInput.requestEnvelope.request.intent.slots.hearMore.value ===
      undefined
    ) {
      var speakOutput = messages.whatIsOnTheMenu;
      const dishes = await util.getDishes(size, page);
      page++;
      sessionAttributes.page = page;
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      var i;
      for (i = 0; i < dishes.content.length; i++) {
        speakOutput += dishes.content[i].dish.name + ", ";
      }
      speakOutput += messages.askMoreDishes;

      return handlerInput.responseBuilder
        .addElicitSlotDirective("hearMore")
        .speak(speakOutput)
        .getResponse();
    } else if (
      handlerInput.requestEnvelope.request.intent.slots.hearMore.value === "yes"
    ) {
      const dishes = await util.getDishes(size, page);
      page++;
      sessionAttributes.page = page;
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

      if (dishes === undefined) {
        return handlerInput.responseBuilder
          .speak(messages.noMoreDishes)
          .getResponse();
      } else if (dishes.content.length < size) {
        var i;
        var speakOutput = "";
        for (i = 0; i < dishes.content.length; i++) {
          speakOutput += dishes.content[i].dish.name + ", ";
        }
        speakOutput += messages.endOfMenu;
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
      } else if (dishes.content.length === size) {
        var i;
        var speakOutput = "";
        for (i = 0; i < dishes.content.length; i++) {
          speakOutput += dishes.content[i].dish.name + ", ";
        }
        speakOutput += message.askMoreDishes;
        return handlerInput.responseBuilder
          .addElicitSlotDirective("hearMore")
          .speak(speakOutput)
          .getResponse();
      }
    } else if (
      handlerInput.requestEnvelope.request.intent.slots.hearMore.value === "no"
    ) {
      return handlerInput.responseBuilder
        .speak(messages.endingPhrase)
        .getResponse();
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  async handle(handlerInput) {
    const messages = getResponseObject(handlerInput.requestEnvelope).HelpIntentHandler;

    return handlerInput.responseBuilder
      .speak(messages.helpMessage)
      .getResponse();
  },
};
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  async handle(handlerInput) {
    const messages = getResponseObject(handlerInput.requestEnvelope).CancelAndStopIntentHandler;
    const speakOutput = messages.bye;
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  async handle(handlerInput) {
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse();
  },
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  async handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
  canHandle() {
    return true;
  },
  async handle(handlerInput, error) {
    const messages = getResponseObject(handlerInput.requestEnvelope).error;
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = messages.genericError;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const ProfileError = {
  canHandle(handlerInput, error) {
    return error.name === "ServiceError";
  },
  handle(handlerInput, error) {
    const messages = getResponseObject(handlerInput.requestEnvelope).error;
    console.log(`~~~~ Error handled: ${error.stack}`);
    if (error.statusCode === 403) {
      return handlerInput.responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard(PERMISSIONS)
        .getResponse();
    }
    return handlerInput.responseBuilder
      .speak(messages.LOCATION_FAILURE)
      .reprompt(messages.LOCATION_FAILURE)
      .getResponse();
  },
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ReserveIntentHandler,
    OrderIntentHandler,
    OrderStateHandler,
    WaiterIntentHandler,
    BillIntentHandler,
    AddressIntentHandler,
    MenuIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  )
  .addErrorHandlers(ProfileError)
  .withApiClient(new Alexa.DefaultApiClient())
  .addErrorHandlers(ErrorHandler)
  .lambda();
