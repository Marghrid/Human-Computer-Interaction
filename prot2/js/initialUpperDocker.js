function initialUpperDocker(docker) {
	docker.clean();

	docker.addButtonSlot(new ButtonSlot("INICIAR SESSÃO"));
	docker.buttonSlots[0].el.style.textAlign = "center";
	docker.buttonSlots[0].setMenu(new LoginMenu());
	addLogin0(docker);
	docker.toggleMenu(0);

	docker.addButtonSlot(new ButtonSlot("CRIAR CONTA"));
	docker.buttonSlots[1].el.style.textAlign = "center";
	docker.buttonSlots[1].setMenu(new SignUpMenu());

	docker.buttonSlots[1].menu.fingerprint.clickFunction = function() {
		currentUser = new User(docker.buttonSlots[1].menu.inputName.value);
		addFingerprintLogin1(docker);
	}

	docker.buttonSlots[1].menu.smartphone.clickFunction = function() {
		currentUser = new User(docker.buttonSlots[1].menu.inputName.value);
		addSmartphoneLogin1(docker);
	}

	docker.buttonSlots[1].menu.clientCard.clickFunction = function() {
		currentUser = new User(docker.buttonSlots[1].menu.inputName.value);
		addClientCardLoginDesign1(docker);
	}

	docker.buttonSlots[1].menu.usernamePassword.clickFunction = function() {
		currentUser = new User(docker.buttonSlots[1].menu.inputName.value);
		addUsernameLogin1(docker);
	}
}

function addLogin0(docker){

	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new LoginMenu());
	docker.toggleMenu(0);

	docker.buttonSlots[0].menu.fingerprint.onclick = function() {
		currentUser = margarida;
		reactLogin();
	}

	docker.buttonSlots[0].menu.bottomButtons.proceedButton.clickFunction = function() {
		if(userPassValid(docker.buttonSlots[0].menu.inputUsername.value, docker.buttonSlots[0].menu.inputPassword.value)) {
			currentUser = users[userIndex(docker.buttonSlots[0].menu.inputUsername.value)]
			reactLogin();
		} else {
			failureMessageZero(docker, addLogin0,
				"O username introduzido não existe, ou a palavra-passe está errada.");
		}
	}

}

function addFingerprintLogin1(docker) {
	docker.buttonSlots[1].menu.clean();
	docker.buttonSlots[1].setMenu(new AddFingerprintLoginMenu());
	docker.buttonSlots[1].menu.toggleVisibility();

	docker.buttonSlots[1].menu.fingerprint.onclick = function() {
		currentUser.loginFingerprint = true;
		alterationsSavedSuccessfullyOne(docker);
	}

	docker.buttonSlots[1].menu.bottomButtons.backButton.el.onclick = function() {	
		initialUpperDocker(docker);
		docker.toggleMenu(1);
	}

}

function addSmartphoneLogin1(docker) {
	docker.buttonSlots[1].menu.clean();
	docker.buttonSlots[1].setMenu(new AddSmartphoneLoginMenu());
	docker.buttonSlots[1].menu.toggleVisibility();

	docker.buttonSlots[1].menu.bottomButtons.backButton.el.onclick = function() {	
		initialUpperDocker(docker);
		docker.toggleMenu(1);
	}

	docker.buttonSlots[1].menu.bottomButtons.saveButton.el.onclick = function() {	
		currentUser.loginSmartphone = true;
		alterationsSavedSuccessfullyOne(docker);
	}
}

function addClientCardLoginDesign1(docker) {
	docker.buttonSlots[1].menu.clean();
	docker.buttonSlots[1].setMenu(new AddClientCardLoginDesignMenu());
	docker.buttonSlots[1].menu.toggleVisibility();

	docker.buttonSlots[1].menu.bottomButtons.backButton.el.onclick = function() {	
		currentUser.loginClientCard = 0;
		initialUpperDocker(docker);
		docker.toggleMenu(1);
	}

	docker.buttonSlots[1].menu.bottomButtons.proceedButton.clickFunction = function() {	
		addClientCardLoginName1(docker);
	}
}

function addClientCardLoginName1(docker) {
	docker.buttonSlots[1].menu.clean();
	docker.buttonSlots[1].setMenu(new AddClientCardLoginNameMenu());
	docker.buttonSlots[1].menu.toggleVisibility();

	docker.buttonSlots[1].menu.bottomButtons.backButton.el.onclick = function() {	
		currentUser.loginClientCard = 0;
		addClientCardLoginDesign1(docker);
	}

	docker.buttonSlots[1].menu.bottomButtons.saveButton.el.onclick = function() {	
		alterationsSavedSuccessfullyOne(docker);
	}
}

function usernameExists(username){
	for(var i = 0; i<users.length; i++){
		if(users[i].loginUsername == username){
			return true;
		}
	}

	return false;
}

function userPassValid(username, password){
	for(var i = 0; i<users.length; i++){
		if(users[i].loginUsername == username){
			if(users[i].loginPassword == password)
				return true;
			return false;
		}
	}
	return false;
}

function userIndex(username){
	for(var i = 0; i<users.length; i++){
		if(users[i].loginUsername == username){
			return i;
		}
	}

	return -1;
}


function addUsernameLogin1(docker) {
	docker.buttonSlots[1].menu.clean();
	docker.buttonSlots[1].setMenu(new AddUsernameLoginMenu());
	docker.buttonSlots[1].menu.toggleVisibility();


	docker.buttonSlots[1].menu.bottomButtons.backButton.el.onclick = function() {	
		initialUpperDocker(docker);
		docker.toggleMenu(1);
	}

	docker.buttonSlots[1].menu.bottomButtons.saveButton.clickFunction = function() {	
		currentUser.loginUsername = docker.buttonSlots[1].menu.inputUsername.value;
		currentUser.loginPassword = docker.buttonSlots[1].menu.inputPassword.value;
		if(usernameExists(currentUser.loginUsername)){
			failureMessageOne(docker, addUsernameLogin1, "O username introduzido já existe no sistema. Tente de novo.");
		} else {
			alterationsSavedSuccessfullyOne(docker);
		}
	}
}

function alterationsSavedSuccessfullyOne(docker) {
	docker.buttonSlots[1].menu.clean();
	docker.buttonSlots[1].setMenu(new SuccessMessage("As suas informações foram guardadas com sucesso"));
	docker.buttonSlots[1].menu.toggleVisibility();
	users.push(currentUser);
	docker.buttonSlots[1].menu.bottomButtons.proceedButton.el.onclick = function() {	
		reactLogin();
	}
}

function failureMessageOne(docker, f_back, msg) {
	docker.buttonSlots[1].menu.clean();
	docker.buttonSlots[1].setMenu(new FailureMessage(msg));
	docker.buttonSlots[1].menu.toggleVisibility();

	docker.buttonSlots[1].menu.bottomButtons.backButton.el.onclick = function() {
		docker.toggleMenu(1);
		f_back(docker);
	}
}

function failureMessageZero(docker, f_back, msg) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new FailureMessage(msg));
	docker.buttonSlots[0].menu.toggleVisibility();

	docker.buttonSlots[0].menu.bottomButtons.backButton.el.onclick = function() {
		docker.toggleMenu(0);
		f_back(docker);
	}
}