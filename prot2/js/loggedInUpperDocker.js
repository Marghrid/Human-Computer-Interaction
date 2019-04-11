function loggedInUpperDocker(docker) {
	docker.clean();

	docker.addButtonSlot(new ButtonSlot("Olá " + currentUser.name + "!"));
	docker.buttonSlots[0].el.style.textAlign = "center";
	docker.buttonSlots[0].setMenu(new ManageAccountMenu());

	docker.buttonSlots[0].menu.moradas.el.onclick = function() {
		manageAddress(docker);
	}

	docker.buttonSlots[0].menu.pagamentos.el.onclick = function() {
		managePaymentMethods(docker);
	}

	docker.buttonSlots[0].menu.faturas.el.onclick = function() {
		manageInvoiceInfo(docker);
	}

	docker.buttonSlots[0].menu.login.el.onclick = function() {
		manageLoginMethods(docker);
	}

	docker.buttonSlots[0].menu.restricoes.el.onclick = function() {
		manageFoodRestrictions(docker);
	}

	docker.buttonSlots[0].menu.favoritos.el.onclick = function() {
		manageFavouriteDishes(docker);
	}

	docker.addButtonSlot(new ButtonSlot("Logout"));
	var currentDocker = docker;

	docker.buttonSlots[1].el.style.textAlign = "center";
	docker.buttonSlots[1].butt.el.onclick = function() {
	currentUser = null;
		reactLogout();
	}
}

function manageAddress(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new ManageAddressMenu());
	docker.buttonSlots[0].menu.toggleVisibility();


	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}

	for(var i = 0; i < docker.buttonSlots[0].menu.addresses_tr.length; ++i) {
		docker.buttonSlots[0].menu.addresses_tr[i].onclick = function() {
			editAddress(docker, this.address);
		}
	}

	docker.buttonSlots[0].menu.addNewAddress.onclick = function() {
		addNewAddress(docker);
	}

	if(docker.buttonSlots[0].menu.addNewTransport != null) {
		docker.buttonSlots[0].menu.addNewTransport.el.onclick = function() {
			availableTransportsServices(docker);
		}
	}
	for(var i = 0; i < docker.buttonSlots[0].menu.transports.length; ++i) {
		docker.buttonSlots[0].menu.transports[i].onclick = function() {
			editTransportsAccount(docker, this.service);
		}
	}
}

function editAddress(docker, address) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new EditAddressMenu(address));
	docker.buttonSlots[0].menu.toggleVisibility();


	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		manageAddress(docker)
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		console.log("BATATA");
		address.name = docker.buttonSlots[0].menu.inputName.value;
		address.local =  docker.buttonSlots[0].menu.inputLocal.value;
		alterationsSavedSuccessfullyZero(docker);
	}
}

function addNewAddress(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddNewAddressMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		manageAddress(docker)
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var name = docker.buttonSlots[0].menu.inputName.value;
		var local = docker.buttonSlots[0].menu.inputLocal.value;
		currentUser.addresses.push(new Address(name, local));
		alterationsSavedSuccessfullyZero(docker);
	}
}

function editTransportsAccount(docker, service) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new EditTransportsAccountMenu(service));
	docker.buttonSlots[0].menu.toggleVisibility();

	var transportsAccountIndex = null;

	for(var i = 0; i < currentUser.transportsAccounts.length; ++i)
		if(currentUser.transportsAccounts[i].service == service)
			transportsAccountIndex = i;

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		manageAddress(docker);
	}

	var next = function() {
		currentUser.transportsAccounts.splice(transportsAccountIndex, 1);
		alterationsSavedSuccessfullyZero(docker);
	}

	docker.buttonSlots[0].menu.removeButton.onclick = function() {
		areYouSure(docker, "Tem a certeza de que pertende remover permanentemente a conta " + service + "?" ,
			next, docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick);
	}


	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var username = docker.buttonSlots[0].menu.inputUsername.value;
		var password = docker.buttonSlots[0].menu.inputPassword.value;
		currentUser.transportsAccounts[transportsAccountIndex].username = username;
		currentUser.transportsAccounts[transportsAccountIndex].password = password;
		alterationsSavedSuccessfullyZero(docker);
	}
}

function availableTransportsServices(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AvailableTransportsServicesMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		manageAddress(docker);
	}

	for(var i = 0; i < docker.buttonSlots[0].menu.transports.length; ++i) {
		docker.buttonSlots[0].menu.transports[i].onclick = function() {
			addNewTransportsAccount(docker, this.service);
		}
	}
}

function addNewTransportsAccount(docker, service) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddNewTransportsAccountMenu(service));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		availableTransportsServices(docker);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var username = docker.buttonSlots[0].menu.inputUsername.value;
		var password = docker.buttonSlots[0].menu.inputPassword.value;
		if(username != "" && password != "")
			currentUser.transportsAccounts.push(new TransportsAccount(service, username, password));
		alterationsSavedSuccessfullyZero(docker);
	}
}

function managePaymentMethods(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new ManagePaymentMethodsMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}

	if(docker.buttonSlots[0].menu.addNewPayment != null) {
		docker.buttonSlots[0].menu.addNewPayment.el.onclick = function() {
			availablePaymentServices(docker);
		}
	}

	for(var i = 0; i < docker.buttonSlots[0].menu.cardPayments.length; ++i) {
		docker.buttonSlots[0].menu.cardPayments[i].onclick = function() {
			editCardPaymentMethod(docker, this.service);
		}
	}

	for(var i = 0; i < docker.buttonSlots[0].menu.otherPayments.length; ++i) {
		docker.buttonSlots[0].menu.otherPayments[i].onclick = function() {
			editOtherPaymentMethod(docker, this.service);
		}
	}
}

function editCardPaymentMethod(docker, service) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new EditCardPaymentMethodMenu(service));
	docker.buttonSlots[0].menu.toggleVisibility();

	var paymentMethodIndex = null;

	for(var i = 0; i < currentUser.paymentMethods.length; ++i)
		if(currentUser.paymentMethods[i].service == service)
			paymentMethodIndex = i;

		
	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		managePaymentMethods(docker);
	}

	var next = function() {
		currentUser.paymentMethods.splice(paymentMethodIndex, 1);
		alterationsSavedSuccessfullyZero(docker);
	}

	docker.buttonSlots[0].menu.removeButton.onclick = function() {
		areYouSure(docker, "Tem a certeza de que pertende remover permanentemente o cartão " + service + "?",
			next, docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick);
	}


	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var n1 = docker.buttonSlots[0].menu.inputN1.value;
		var n2 = docker.buttonSlots[0].menu.inputN2.value;
		var n3 = docker.buttonSlots[0].menu.inputN3.value;
		var n4 = docker.buttonSlots[0].menu.inputN4.value;
		var sn = docker.buttonSlots[0].menu.inputSN.value;
		currentUser.paymentMethods[paymentMethodIndex].n1 = n1;
		currentUser.paymentMethods[paymentMethodIndex].n2 = n2;
		currentUser.paymentMethods[paymentMethodIndex].n3 = n3;
		currentUser.paymentMethods[paymentMethodIndex].n4 = n4;
		currentUser.paymentMethods[paymentMethodIndex].sn = sn;
		alterationsSavedSuccessfullyZero(docker);
	}
}

function editOtherPaymentMethod(docker, service) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new EditOtherPaymentMethodMenu(service));
	docker.buttonSlots[0].menu.toggleVisibility();

	var paymentMethodIndex = null;

	for(var i = 0; i < currentUser.paymentMethods.length; ++i)
		if(currentUser.paymentMethods[i].service == service)
			paymentMethodIndex = i;

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		managePaymentMethods(docker);
	}


	var next = function() {
		currentUser.paymentMethods.splice(paymentMethodIndex, 1);
		alterationsSavedSuccessfullyZero(docker);
	}

	docker.buttonSlots[0].menu.removeButton.onclick = function() {
		areYouSure(docker, "Tem a certeza de que pertende remover permanentemente a conta " + service + "?" ,
			next, docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var username = docker.buttonSlots[0].menu.inputUsername.value;
		var password = docker.buttonSlots[0].menu.inputPassword.value;
		currentUser.paymentMethods[paymentMethodIndex].username = username;
		currentUser.paymentMethods[paymentMethodIndex].password = password;
		
		alterationsSavedSuccessfullyZero(docker);
	}
}

function availablePaymentServices(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AvailablePaymentServicesMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		managePaymentMethods(docker);
	}

	for(var i = 0; i < docker.buttonSlots[0].menu.cardPayments.length; ++i) {
		docker.buttonSlots[0].menu.cardPayments[i].onclick = function() {
			addNewCardPaymentMethod(docker, this.service);
		}
	}

	for(var i = 0; i < docker.buttonSlots[0].menu.otherPayments.length; ++i) {
		docker.buttonSlots[0].menu.otherPayments[i].onclick = function() {
			addNewOtherPaymentMethod(docker, this.service);
		}
	}
}

function addNewCardPaymentMethod(docker, service) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddNewCardPaymentMethodMenu(service));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		availablePaymentServices(docker);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var n1 = docker.buttonSlots[0].menu.inputN1.value;
		var n2 = docker.buttonSlots[0].menu.inputN2.value;
		var n3 = docker.buttonSlots[0].menu.inputN3.value;
		var n4 = docker.buttonSlots[0].menu.inputN4.value;
		var sn = docker.buttonSlots[0].menu.inputSN.value;
		currentUser.paymentMethods.push(new CardPayment(service, n1, n2, n3, n4, sn));
		alterationsSavedSuccessfullyZero(docker);
	}
}

function addNewOtherPaymentMethod(docker, service) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddNewOtherPaymentMethodMenu(service));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		availablePaymentServices(docker);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var username = docker.buttonSlots[0].menu.inputUsername.value;
		var password = docker.buttonSlots[0].menu.inputPassword.value;
		if(username != "" && password != "")
			currentUser.paymentMethods.push(new OtherPayment(service, username, password));
		alterationsSavedSuccessfullyZero(docker);
	}
}

function manageInvoiceInfo(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new ManageInvoiceInfoMenu());
	docker.buttonSlots[0].menu.toggleVisibility();


	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		currentUser.nif = docker.buttonSlots[0].menu.inputNIF.value;
		currentUser.invoiceName = docker.buttonSlots[0].menu.inputName.value;
		currentUser.invoiceAddress = docker.buttonSlots[0].menu.inputAddress.value;
		alterationsSavedSuccessfullyZero(docker);
	}
}

function manageLoginMethods(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new ManageLoginMethodsMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}

	if(docker.buttonSlots[0].menu.addNewLogin != null) {
		docker.buttonSlots[0].menu.addNewLogin.el.onclick = function() {
			availableLoginMethods(docker);
		}
	}
}

function availableLoginMethods(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AvailableLoginMethodsMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		manageLoginMethods(docker);
	}

	if(docker.buttonSlots[0].menu.fingerprint != null) {
		docker.buttonSlots[0].menu.fingerprint.el.onclick = function() {
			addFingerprintLogin0(docker)
		}
	}

	if(docker.buttonSlots[0].menu.smartphone != null) {
		docker.buttonSlots[0].menu.smartphone.el.onclick = function() {
			addSmartphoneLogin0(docker)
		}
	}

	if(docker.buttonSlots[0].menu.clientCard != null) {
		docker.buttonSlots[0].menu.clientCard.el.onclick = function() {
			addClientCardLoginDesign0(docker)
		}
	}

	if(docker.buttonSlots[0].menu.username != null) {
		docker.buttonSlots[0].menu.username.el.onclick = function() {
			addUsernameLogin0(docker)
		}
	}
}

function addFingerprintLogin0(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddFingerprintLoginMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.fingerprint.onclick = function() {
		currentUser.loginFingerprint = true;
		alterationsSavedSuccessfullyZero(docker);
	}

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}
}

function addSmartphoneLogin0(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddSmartphoneLoginMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.el.onclick = function() {	
		currentUser.loginSmartphone = true;
		alterationsSavedSuccessfullyZero(docker);
	}
}

function addClientCardLoginDesign0(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddClientCardLoginDesignMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}

	docker.buttonSlots[0].menu.bottomButtons.proceedButton.clickFunction = function() {	
		addClientCardLoginName0(docker);
	}
}

function addClientCardLoginName0(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddClientCardLoginNameMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		currentUser.loginClientCard = 0;
		addClientCardLoginDesign0(docker);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.el.onclick = function() {	
		alterationsSavedSuccessfullyZero(docker);
	}
}

function addUsernameLogin0(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddUsernameLoginMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {	
		currentUser.loginUsername = docker.buttonSlots[0].menu.inputUsername.value;
		currentUser.loginPassword = docker.buttonSlots[0].menu.inputPassword.value;
		alterationsSavedSuccessfullyZero(docker);
	}
}

function manageFoodRestrictions(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new ManageFoodRestrictionsMenu());
	docker.buttonSlots[0].menu.toggleVisibility();


	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}


	docker.buttonSlots[0].menu.bottomButtons.saveButton.el.onclick = function() {
		for(var i = 0; i < docker.buttonSlots[0].menu.checkboxes.length; i++){
			currentUser.foodRestrictions[i] = docker.buttonSlots[0].menu.checkboxes[i].input.checked;
		}	
		alterationsSavedSuccessfullyZero(docker);
	}
}

function manageFavouriteDishes(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new ManageFavouriteDishesMenu());
	docker.buttonSlots[0].menu.toggleVisibility();


	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}
}

function alterationsSavedSuccessfullyZero(docker) {
	reactLogin();
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new SuccessMessage("As suas alterações foram guardadas com sucesso"));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.proceedButton.el.onclick = function() {	
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}
}

function areYouSure(docker, msg, yesFunction, noFunction) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AreYouSure(msg));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.noButton.el.onclick = function() {	
		noFunction();
	}

	docker.buttonSlots[0].menu.yesButton.el.onclick = function() {	
		yesFunction();
	}
}