INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (0, 1, 'Customer', true);
INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (1, 1, 'Waiter', true);
INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (2, 1, 'Manager', true);
INSERT INTO UserRole(id, modificationCounter, name, active) VALUES (3, 1, 'Admin', true);

INSERT INTO User(id, modificationCounter, username, password, twoFactorStatus, email, idRole) VALUES (3, 1, 'admin', '{bcrypt}$2a$10$fhcb1hvSNRRXBnoRocxLU.S85hoEH2UgBfnF4NP0G8PuFy6eD6cle', false, 'admin@gmail.com', 3);

INSERT INTO WaitersHelp (id,modificationCounter,waitersHelpName) VALUES (0,0,'good');
INSERT INTO WaitersHelp (id,modificationCounter,waitersHelpName) VALUES (1,0,'bill');
INSERT INTO WaitersHelp (id,modificationCounter,waitersHelpName) VALUES (2,0,'waiter');

INSERT INTO "Table"(id, modificationCounter, seatsNumber, deviceId) VALUES (0, 1, 0, null);
INSERT INTO "Table"(id, modificationCounter, seatsNumber, deviceId) VALUES (1, 1, 4, 'Alexa1');
INSERT INTO "Table"(id, modificationCounter, seatsNumber, deviceId) VALUES (2, 1, 4, 'Alexa2');
INSERT INTO "Table"(id, modificationCounter, seatsNumber, deviceId) VALUES (3, 1, 4, 'Alexa3');
INSERT INTO "Table"(id, modificationCounter, seatsNumber, deviceId) VALUES (4, 1, 6, 'Alexa4');
INSERT INTO "Table"(id, modificationCounter, seatsNumber, deviceId) VALUES (5, 1, 6, 'Alexa5');
INSERT INTO "Table"(id, modificationCounter, seatsNumber, deviceId) VALUES (6, 1, 6, 'Alexa6');
INSERT INTO "Table"(id, modificationCounter, seatsNumber, deviceId) VALUES (7, 1, 8, 'Alexa7');
INSERT INTO "Table"(id, modificationCounter, seatsNumber, deviceId) VALUES (8, 1, 8, 'amzn1.ask.device.AEZH4V2LDGIAUH5NR7GAFGFHMLQEH3VHV4YKWHVZ3RGTWJHMZX56YIWS7YD56PRCFYRSJMCUFVZ2YCPFZGELLD5ZER4ZVH5X3O5TAF7TAR4WWQOGS7C6YTISIQOGYMHZJGMS5M327YOGA3OXAOAIZLGQ2EZE3QEVNX4JKWFRQAVRUQCQUXHKY');
