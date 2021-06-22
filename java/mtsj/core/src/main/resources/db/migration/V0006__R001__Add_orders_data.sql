INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (0,0,'ordered');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (1,0,'preparation');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (2,0,'delivery');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (3,0,'delivered');
INSERT INTO OrderState (id,modificationCounter,stateName) VALUES (4,0,'canceled');

INSERT INTO OrderPaid (id,modificationCounter,paidName) VALUES (0,0,'unpaid');
INSERT INTO OrderPaid (id,modificationCounter,paidName) VALUES (1,0,'paid');
