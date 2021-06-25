module.exports.messages = {
    LaunchRequestHandler: {
      spechoutput:
        "Willkommen bei My Thai Star.",
    },
    ReserveIntentHandler: {
      buildReservedTableAwnser: (email, date, time) =>
        `Es wurde ein Tisch reserviert für: ${email} am ${date} um ${time} Uhr.`,
      askForDate: "An welchem Tag möchtests du den Tisch reservieren?",
      askForTime: "Um wie viel Uhr möchtest du den Tisch reservieren?",
      askForNumberOfPeople: "Wie viele Personen werden da sein?",
      addAnOrderQuestion: "Möchtest du deiner Reservierung eine Bestellung hinzufügen.",
      askForItem: "Welches Gericht möchtes du hinzufügen?",
      homeRestriction: "Entschuldigung aber Sie können einen Tisch nur reservieren wenn Sie von Zuhause den Skill starten.",
    },
    OrderIntentHandler: {
      didNotUnderstandDish:
        "Entschuldigung, ich habe das nicht verstanden. Bitte bestelle ein Gericht das auf der Karte steht.",
      askForItem: "Welches Gericht möchtes du hinzufügen?",
      askForItemCount: "Wie oft möchtest du das Gericht hinzufügen?",
      askOneMore: "Möchtest du ein weiteres Gericht der Karte hinzufügen?",
      askRepeatOrder: "Soll ich deine Bestellung wiederholen?",
      deliveryConfirmation:
        "Deine Bestellung wurde aufgegeben. Danke, dass du bei uns bestellt hast.",
      orderConfirmation:
        "Deine Reservierung wurde getätigt. Wir erwarten dich.",
      orderInhouseConfirmation:
        "Deine Bestellung wurde erfasst. Ein Kellner sollte bald mit dem Essen bei Ihnen sein.",
      orderNotConfirmed:
        "Das ist schade. Wenn du eine Bestellung aufgeben möchtests rufe bitte nocheinmal den My Thai Star Skill auf.",
      buildCurrentOrderContents: (orders) => {
        var speakOutput = "Deine Bestellung ist: ";
        speakOutput += orders
          .map((orders) => `${orders.amount} mal das ${orders.dish.name}. `)
          .join("");
        return (speakOutput += "Ist das richtig?");
      },
    },
    OrderStateHandler: {
      buildOpenOrders: (orders) => {
        let res =
          "Du hast derzeit " + orders.length + " offene Bestellungen. \n";
        const states = ["bestellt", "Zubereitung", "Auslieferung"];
        for (const order of orders) {
          state = states[order.orders[0].stateId];
          var t = new Date(1970, 0, 1);
          t.setSeconds(parseInt(order.creationDate) + 7200);
          var date =
            t.toDateString() + " um " + t.getHours() + ":" + t.getMinutes();
          res +=
            orders.length == 1
              ? `Deine Bestellung befindet sich derzeit im Status: ${state}. Sie wurde am: ${date} aufgegeben.`
              : `Deine ${
                  i + 1
                }th Bestellung befindet sich derueit im Status: ${state}. Sei wurde am: ${date} aufgegeben.`;
        }
        return res;
      },
      homeRestriction: "Entschuldigung aber Sie können den Bestellstatus nur abrufen wenn Sie von Zuhause den Skill starten."
    },
    AddressIntentHandler: {
      address:
        "Die Addresse des Restaurants lautet: Place de l'Étoile - 11 rue de Tilsitt - 75017 Paris.",
      homeRestriction: "Entschuldigung aber Sie können die Addresse nur abrufen wenn Sie von Zuhause den Skill starten.",
    },
    WaiterIntentHandler: {
      waiterWasCalled:
        "Es wurde ein Kellner informiert das Hilfe benötigt wird.",
      inhouseRestriction: "Sie können nur dann einen Kellner rufen wenn Sie sich im Restaurant befinden.",
    },
    BillIntentHandler: {
      billRequested:
        "Es wurde ein Kellner informiert das dieser Tisch zahlen möchte.",
        inhouseRestriction: "Sie können nur dann nach der Rechnung fragen wenn Sie sich im Restaurant befinden.",
    },
    MenuIntentHandler: {
      whatIsOnTheMenu: "Auf unserer Karte sind derzeit: ",
      askMoreDishes: "Möchtest du noch weitere Gerichte von der Karte hören? ",
      noMoreDishes: "Es gibt keine weiteren Gerichte auf der Karte. ",
      endOfMenu: "Das ist alles was auf der Karte steht. ",
      endingPhrase: "Ich hoffe es war etwas nach deinem Geschmack dabei. ",
      askForItem: "Welches Gericht möchtes du hinzufügen? ",
      askForItemCount: "Wie oft möchtest du das Gericht hinzufügen? ",
      askOneMore: "Möchtest du ein weiteres Gericht der Karte hinzufügen? ",
    },
    HelpIntentHandler: {
        helpMessageHome: "Ich kann folgende Befehle ausführen: Karte, Bestellen, Reservieren, Bestellstatus und Addresse.",
        helpMessageInhouse: "Ich kann folgende Befehle ausführen: Karte, Bestellen, Kellner rufen und Rechnung erbitten."
    },
    CancelAndStopIntentHandler:{
      bye:"Auf Wiedersehen!"
    },
    error: {
      genericError:"Entschuldigung, Ich habe Probleme die gefragte Aktion auszuführen. Bitte versuche es erneut.",
      NOTIFY_MISSING_PERMISSIONS:
        "Bitte erlaube den Zugriff auf die Nutzer Profilinformationen in der Amazon Alexa App.",
      NAME_MISSING:
        "Du kannst deinen Namen entweder in der Alexa App unter Mein Profil oder bei Amazon.de unter Anmelden und Sicherheit setzen.",
      EMAIL_MISSING:
        "Du kannst deine Email-Addresse bei Amazon.de unter Anmelden und Sicherheit setzen.",
      NUMBER_MISSING:
        "Du kannst deine Telefonnummer bei Amazon.de unter Anmelden und Sicherheit setzen.",
    },
  };
  