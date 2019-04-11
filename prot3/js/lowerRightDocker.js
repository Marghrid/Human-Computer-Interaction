function lowerRightDocker(docker) {
	docker.clean();
	docker.addButtonSlot(new ButtonSlot("TRANSPORTES"));
	docker.buttonSlots[0].el.style.textAlign = "center";
	docker.addButtonSlot(new ButtonSlot("CHAMAR EMPREGADO"));
	docker.buttonSlots[1].el.style.textAlign = "center";
	docker.addButtonSlot(new ButtonSlot("PAGAR"));
	docker.buttonSlots[2].el.style.textAlign = "center";
	initialTransportsMenu(docker, "");
	waiterIsComing1(docker);
	whatToPay(docker);
}

function initialTransportsMenu(docker, address) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new TransportsMenu(address));
	docker.buttonSlots[0].menu.bottomButtons.proceedButton.el.onclick = function() {
		chooseTransport(docker, docker.buttonSlots[0].menu.currentAddress.local);
	}
	

	if(docker.buttonSlots[0].menu.areThereTabs){
		docker.buttonSlots[0].menu.plusTab.onclick = function() {
			addNewAddressLowerDocker(docker, address);
		}
	}
}

function addNewAddressLowerDocker(docker, address) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new AddNewAddressMenu());
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		initialTransportsMenu(docker, address)
		docker.buttonSlots[0].menu.toggleVisibility();
	}

	docker.buttonSlots[0].menu.bottomButtons.saveButton.clickFunction = function() {
		var name = docker.buttonSlots[0].menu.inputName.value;
		var local = docker.buttonSlots[0].menu.inputLocal.value;
		currentUser.addresses.push(new Address(name, local));
		savedAddress(docker, address);
	}
}

function savedAddress(docker, address) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new SuccessMessage("As nova morada foi guardada com sucesso"));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.proceedButton.el.onclick = function() {	
		initialTransportsMenu(docker, address);
		docker.buttonSlots[0].menu.toggleVisibility();
	}
}

function chooseTransport(docker, address) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new ChooseTransportMenu(address));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		initialTransportsMenu(docker, "");
		docker.buttonSlots[0].menu.toggleVisibility();
	}
		
	docker.buttonSlots[0].menu.footRow.onclick = function() {
		initialTransportsMenu(docker, address);
		docker.buttonSlots[0].menu.toggleVisibility();
	}

	docker.buttonSlots[0].menu.transportServices[0].tr.onclick = function() {
		callTransport(docker, docker.buttonSlots[0].menu.transportServices[0].name, address);
	}

	docker.buttonSlots[0].menu.transportServices[1].tr.onclick = function() {
		callTransport(docker, docker.buttonSlots[0].menu.transportServices[1].name, address);
	}

	docker.buttonSlots[0].menu.transportServices[2].tr.onclick = function() {
		callTransport(docker, docker.buttonSlots[0].menu.transportServices[2].name, address);
	}
}

function callTransport(docker, service, address) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new CallTransportMenu(service));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.proceedButton.el.onclick = function() {
		loginTransportsAccount(docker, service, address);
	}


	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		chooseTransport(docker, address);
	}
}

function loginTransportsAccount(docker, service, address) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new LoginTransportsAccountMenu(service));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		callTransport(docker, service, address);
	}

	var transportIndex = -1;
	if(currentUser != null) {
		for(var i = 0; i < currentUser.transportsAccounts.length; ++i) {
			if(currentUser.transportsAccounts[i].service == service)
				transportIndex = i;
		}
	}

	if(transportIndex == -1) {
		docker.buttonSlots[0].menu.callButton.clickFunction = function() {
			carCalled(docker, service);
		}
	} else {
		docker.buttonSlots[0].menu.callButton.clickFunction = function() {
			inputUsername = docker.buttonSlots[0].menu.inputUsername.value;
			inputPassword = docker.buttonSlots[0].menu.inputPassword.value;
			
			if(currentUser.transportsAccounts[transportIndex].username == inputUsername) {
				if(currentUser.transportsAccounts[transportIndex].password == inputPassword)
					carCalled(docker, service);
				else
					wrongPassword(docker, service, address);
			}

		}
	}
}

function carCalled(docker, service) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new SuccessMessage("O seu carro " + service + " já vem a caminho."));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.proceedButton.el.onclick = function() {
		initialTransportsMenu(docker, "");
		docker.buttonSlots[0].menu.toggleVisibility();
	}
}

function wrongPassword(docker, service, address) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new FailureMessage("A password está errada."));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		loginTransportsAccount(docker, service, address);
	}
}

function waiterIsComing1(docker) {
	docker.buttonSlots[1].menu.clean();
	docker.buttonSlots[1].setMenu(new WaiterIsComing());

	docker.buttonSlots[1].menu.cancelButton.el.onclick = function() {
		docker.toggleMenu(1);
	}
}

function whatToPay(docker) {
	docker.buttonSlots[2].menu.clean();
	docker.buttonSlots[2].setMenu(new ToPayOrNotToPay());

	docker.buttonSlots[2].menu.bottomButtons.proceedButton.clickFunction =
		docker.buttonSlots[2].menu.bottomButtons.proceedButton.el.onclick = function() {
		howToPay(docker, docker.buttonSlots[2].menu.price, docker.buttonSlots[2].menu.beingPayed);
	}
}

function howToPay(docker, price, beingPayed) {
	docker.buttonSlots[2].menu.clean();
	docker.buttonSlots[2].setMenu(new HowToPayMenu(price));
	docker.buttonSlots[2].menu.toggleVisibility();

	docker.buttonSlots[2].menu.cashPayment.onclick
		= docker.buttonSlots[2].menu.mbPayment.onclick
		= function() {
			waiterIsComing2(docker);
	}

	function userHasCard(service) {
		for(let i = 0; i < currentUser.paymentMethods.length; ++i) {
			if(currentUser.paymentMethods[i].service == service)
				return true;
		}
		return false;
	}
	
	for(let i = 0; i < docker.buttonSlots[2].menu.cardPayments.length; ++i) {
		if(currentUser != null && userHasCard(docker.buttonSlots[2].menu.cardPayments[i].service)) {
			docker.buttonSlots[2].menu.cardPayments[i].onclick = function() {
				payUsingUserCard(docker, this.service, price, beingPayed);
			}
		}
		else {
			docker.buttonSlots[2].menu.cardPayments[i].onclick = function() {
				payUsingNewCard(docker, this.service, price, beingPayed);
			}
		}
	}

	for(let i = 0; i < docker.buttonSlots[2].menu.otherPayments.length; ++i) {
		docker.buttonSlots[2].menu.otherPayments[i].onclick = function() {
				payUsingOtherMethod(docker, this.service, price, beingPayed);
		}
	}

	docker.buttonSlots[2].menu.bottomButtons.backButton.el.onclick = function() {
		whatToPay(docker);
		docker.buttonSlots[2].menu.toggleVisibility();

	}
}

function waiterIsComing2(docker) {
	docker.buttonSlots[2].menu.clean();
	docker.buttonSlots[2].setMenu(new WaiterIsComing());
	docker.buttonSlots[2].menu.toggleVisibility();

	docker.buttonSlots[2].menu.cancelButton.el.onclick = function() {
		whatToPay(docker);
	}
}

function payUsingUserCard(docker, service, price, beingPayed) {
	docker.buttonSlots[2].menu.clean();
	docker.buttonSlots[2].setMenu(new PayUsingUserCardMenu(price, service));
	docker.buttonSlots[2].menu.toggleVisibility();

	docker.buttonSlots[2].menu.payButton.el.onclick = function() {
		finalizePayment(docker, beingPayed);
	}

	docker.buttonSlots[2].menu.cancelButton.el.onclick = function() {
		howToPay(docker, price, beingPayed);
	}
}

function payUsingNewCard(docker, service, price, beingPayed) {
	docker.buttonSlots[2].menu.clean();
	docker.buttonSlots[2].setMenu(new PayUsingNewCardMenu(price, service));
	docker.buttonSlots[2].menu.toggleVisibility();

	docker.buttonSlots[2].menu.cancelButton.el.onclick = function() {
		howToPay(docker, price, beingPayed);
	}

	docker.buttonSlots[2].menu.payButton.clickFunction = function() {
		finalizePayment(docker, beingPayed);
	}
}

function payUsingOtherMethod(docker, service, price, beingPayed) {
	docker.buttonSlots[2].menu.clean();
	docker.buttonSlots[2].setMenu(new PayUsingOtherMethodMenu(price, service));
	docker.buttonSlots[2].menu.toggleVisibility();

	docker.buttonSlots[2].menu.cancelButton.el.onclick = function() {
		howToPay(docker, price, beingPayed);
	}

	docker.buttonSlots[2].menu.payButton.clickFunction = function() {
		finalizePayment(docker, beingPayed);
	}
}

function finalizePayment(docker, beingPayed) {
	docker.buttonSlots[2].menu.clean();
	docker.buttonSlots[2].setMenu(new SuccessMessage("O seu pagamento foi efetuado com sucesso."));
	docker.buttonSlots[2].menu.toggleVisibility();

	for(let i = 0; i < beingPayed.length; ++i) {
		unpayedItems.splice(beingPayed[i], 1);
	}

	docker.buttonSlots[2].menu.bottomButtons.proceedButton.el.onclick = function() {
		docker.toggleMenu(2);
		whatToPay(docker);
	}
}