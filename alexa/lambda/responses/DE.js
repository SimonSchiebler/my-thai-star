module.exports.messages = {
    LaunchRequestHandler: {
      spechoutput:
        "Willkommen bei My Thai Star.",
    },
    ReserveIntentHandler: {
      buildReservedTableAwnser: (email, date, time) =>
        `Es wurde ein Tisch reserviert für: ${email} am ${date} um ${time} Uhr.`,
      askForDate: "An welchem Tag möchten Sie den Tisch reservieren?",
      askForTime: "Um wie viel Uhr möchten Sie den Tisch reservieren",
      askForNumberOfPeople: "Wie viele Personen werden da sein?",
      addAnOrderQuestion: "Möchten Sie der Reservierung eine Bestellung hinzufügen?",
      askForItem: "Welches Gericht möchten Sie Ihrer Bestellung hinzufügen?",
      homeRestriction: "Entschuldigung, aber Sie können nur dann einen Tisch reservieren wenn Sie den Skill von Zuhause nutzen.",
    },
    OrderIntentHandler: {
      didNotUnderstandDish:
        "Entschuldigung, ich habe das nicht verstanden. Bitte bestellen Sie ein Gericht von der Karte.",
      askForItem: "Welches Gericht möchten Sie Ihrer Bestellung hinzufügen?",
      askForItemCount: "Wie oft möchten Sie das Gericht der Bestellung hinzufügen?",
      askOneMore: "Möchten Sie ein weiteres Gericht von der Karte Ihrer Bestellung hinzufügen?",
      askRepeatOrder: "Soll ich Ihre Bestellung nochmal aufzählen?",
      deliveryConfirmation:
        "Ihre Bestellung wurde aufgegeben. Vielen Dank, dass Sie bei uns bestellt haben.",
      orderConfirmation:
        "Ihre Reservierung wurde getätigt. Wir freuen uns auf Ihren Besuch.",
      orderInhouseConfirmation:
        "Ihre Bestellung wurde erfasst. Ein Kellner sollte bald mit dem Essen bei Ihnen seien.",
      orderNotConfirmed:
        "Das ist Schade. Wenn Sie eine Bestellung aufgeben möchten rufen Sie den Skill nochmal auf.",
      buildCurrentOrderContents: (orders) => {
        var speakOutput = "Ihre Bestellung ist: ";
        speakOutput += orders
          .map((orders) => `${orders.amount} mal das ${orders.dish.name}. `)
          .join("");
        return (speakOutput += "Ist das richtig?");
      },
    },
    OrderStateHandler: {
      buildOpenOrders: (orders) => {
        let res =
          "Sie haben derzeit " + orders.length + " offene Bestellungen. \n";
        const states = ["bestellt", "Zubereitung", "Auslieferung"];
        var i = 1;
        for (const order of orders) {
          state = states[order.orders[0].stateId];
          var t = new Date(1970, 0, 1);
          t.setSeconds(parseInt(order.creationDate) + 7200);
          var date =
            t.toDateString() + " um " + t.getHours() + ":" + t.getMinutes();
          res +=
            orders.length == 1
              ? `Ihre Bestellung befindet sich derzeit im Status: ${state}. Sie wurde am: ${date} aufgegeben. `
              : `Ihre ${
                  i
                }te Bestellung befindet sich derzeit im Status: ${state}. Sie wurde am: ${date} aufgegeben. `;
          i++;
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
      askMoreDishes: "Möchten Sie noch weitere Gerichte von der Karte hören?",
      noMoreDishes: "Es gibt keine weiteren Gerichte auf der Karte.",
      endOfMenu: "Das ist alles was auf der Karte steht.",
      endingPhrase: "Ich hoffe es war etwas nach Ihrem Geschmack dabei.",
    },
    HelpIntentHandler: {
        helpMessageHome: "Ich kann folgende Befehle ausführen: Menü, Bestellen, Reservieren, Bestellstatus und Addresse.",
        helpMessageInhouse: "Ich kann folgende Befehle ausführen: Menü, Bestellen, Kellner rufen und Rechnung erbitten."
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
  