function lowerRightDocker(docker) {
	docker.clean();
	docker.addButtonSlot(new ButtonSlot("TRANSPORTES"));
	docker.addButtonSlot(new ButtonSlot("TERMINAR REFEIÇÃO"));
	docker.addButtonSlot(new ButtonSlot("PAGAR"));
	initialTransportsMenu(docker, "");
}

function initialTransportsMenu(docker, address) {
	docker.buttonSlots[0].menu.clean();
	//docker.buttonSlots[0].setMenu(new transportsMenu());
	docker.buttonSlots[0].setMenu(new TransportsMenu2(address));
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
		docker.toggleMenu(0);
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