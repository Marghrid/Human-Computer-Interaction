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
		initialUpperDocker(docker);
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

	if(docker.buttonSlots[0].menu.addNewTransport != null) {
		docker.buttonSlots[0].menu.addNewTransport.el.onclick = function() {
			availableTransportsServices(docker);
		}
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
			addNewTransportsAccount(docker, this.transport);
		}
	}
}

function addNewTransportsAccount(docker, transport) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddNewTransportsAccountMenu(transport));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		availableTransportsServices(docker);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var username = docker.buttonSlots[0].menu.inputUsername.value;
		var password = docker.buttonSlots[0].menu.inputPassword.value;
		if(username != "" && password != "")
			currentUser.transportsAccounts.push(new TransportsAccount(transport, username, password));
		informationSavedSuccessfullyZero(docker);
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
			addNewCardPaymentMethod(docker, this.payment);
		}
	}

	for(var i = 0; i < docker.buttonSlots[0].menu.otherPayments.length; ++i) {
		docker.buttonSlots[0].menu.otherPayments[i].onclick = function() {
			addNewOtherPaymentMethod(docker, this.payment);
		}
	}
}

function addNewCardPaymentMethod(docker, payment) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddNewCardPaymentMethodMenu(payment));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		availablePaymentServices(docker);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var cardNumber = docker.buttonSlots[0].menu.inputCardNumber.value;
		currentUser.paymentMethods.push(new CardPayment(payment, cardNumber));
		informationSavedSuccessfullyZero(docker);
	}
}

function addNewOtherPaymentMethod(docker, payment) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddNewOtherPaymentMethodMenu(payment));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {	
		availablePaymentServices(docker);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var username = docker.buttonSlots[0].menu.inputUsername.value;
		var password = docker.buttonSlots[0].menu.inputPassword.value;
		if(username != "" && password != "")
			currentUser.paymentMethods.push(new OtherPayment(payment, username, password));
		informationSavedSuccessfullyZero(docker);
	}
}

function manageInvoiceInfo(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new ManageInvoiceInfoMenu());
	docker.buttonSlots[0].menu.toggleVisibility();


	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		console.log(currentUser.nif = docker.buttonSlots[0].menu.inputNIF.value);
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		currentUser.nif = docker.buttonSlots[0].menu.inputNIF.value;
		currentUser.invoiceName = docker.buttonSlots[0].menu.inputName.value;
		currentUser.invoiceAddress = docker.buttonSlots[0].menu.inputAddress.value;
		informationSavedSuccessfullyZero(docker);
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
		informationSavedSuccessfullyZero(docker);
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
		informationSavedSuccessfullyZero(docker);
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
		informationSavedSuccessfullyZero(docker);
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
		informationSavedSuccessfullyZero(docker);
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
		informationSavedSuccessfullyZero(docker);
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

function informationSavedSuccessfullyZero(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new InformationSavedSuccessfully());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.proceedButton.el.onclick = function() {	
		loggedInUpperDocker(docker);
		docker.toggleMenu(0);
	}
}
