INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (0,0,'ordered');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (1,0,'preparation');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (2,0,'delivery');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (3,0,'delivered');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (4,0,'canceled');

INSERT INTO OrderPaid (id,modificationCounter,paidName) VALUES (0,0,'unpaid');
INSERT INTO OrderPaid (id,modificationCounter,paidName) VALUES (1,0,'paid');

INSERT INTO AddressTable (id,modificationCounter,stateOrRegion,city,countryCode,postalCode,addressLine1,addressLine2,addressLine3,districtOrCounty) VALUES (0,0,'WA','Seattle','US','98109','410','Terry','Ave North',' ');
INSERT INTO AddressTable (id,modificationCounter,stateOrRegion,city,countryCode,postalCode,addressLine1,addressLine2,addressLine3,districtOrCounty) VALUES (1,0,'NYS','New York','US','10125','Bedell PI',' ',' ',' ');;

INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (0,0,1, 1, 0, null, 0, null, 'OR_dbg1');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (1,0,1, 1, 3, 0, null, null, 'OR_dbg2');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (2,0,0, 1, 3, 1, null, null, 'OR_dbg3');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (3,1,0, 1, 3, 2, null, null, 'OR_dbg4');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (4,1,0, 1, 3, 3, null, null, 'OR_dbg5');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (5,2,1, 1, 3, 4, null, null, 'OR_dbg6');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (6,3,1, 1, 4, 8, null, null, 'OR_dbg7');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (7,4,0, 1, 4, 9, null, null, 'OR_dbg8');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (8,2,1, 1, 6, null, null, 0, 'OR_dbg9');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (9,2,1, 1, 6, null, null, 1, 'OR_dbg10');

-- for Alexa call waiter
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (10,3,1, 1, 8, null, null, null, 'OR_dbg11');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (11,3,1, 1, 8, null, null, null, 'OR_dbg12');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (12,0,0, 1, 9, null, null, null, 'OR_dbg13');
INSERT INTO Orders (id,idState,idPaid, modificationCounter, idBooking, idInvitedGuest, idHost, idAddress, orderToken) VALUES (13,0,0, 1, 9, null, null, null, 'OR_dbg14');

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (0, 1, 0, 2, 'please not too spicy', 0);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (1, 1, 4, 1, null, 0);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (2, 1, 2, 1, null, 0);

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (3, 1, 4, 2, null, 1);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (4, 1, 2, 1, null, 1);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (5, 1, 3, 1, null, 1);

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (6, 1, 2, 1, null, 2);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (7, 1, 5, 1, null, 3);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (8, 1, 5, 1, null, 4);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (9, 1, 3, 1, null, 5);

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (10, 1, 5, 2, null, 6);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (11, 1, 3, 1, null, 7);

INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (12, 1, 5, 2, null, 8);
INSERT INTO OrderLine (id, modificationCounter, idDish, amount, comment, idOrder) VALUES (13, 1, 3, 1, null, 9);

INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (0, 1, 0, 1);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (1, 1, 1, 1);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (2, 1, 2, 0);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (3, 1, 2, 1);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (4, 1, 4, 0);
INSERT INTO OrderDishExtraIngredient (id, modificationCounter, idOrderLine, idIngredient) VALUES (5, 1, 5, 0);