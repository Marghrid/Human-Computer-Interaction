function ManageLoginMethodsMenu() {
	UpperMenu.call(this, "Métodos de login");

	var loginMethods = document.createElement("div");
	this.addNewLogin = null;
	var userHas = 0;

	if(currentUser.loginFingerprint == true) {
		var img_cap = new ImageWCaption("images/fingerprint.png", "Reconhecimento da impressão digital");
		img_cap.el.classList.add("login_method_img");
		loginMethods.appendChild(img_cap.el);
		userHas++;
	}

	if(currentUser.loginSmartphone == true) {
		var img_cap = new ImageWCaption("images/smartphone.png", "Reconhecimento do smartphone");
		img_cap.el.classList.add("login_method_img");
		loginMethods.appendChild(img_cap.el);
		userHas++;
	}

	if(currentUser.loginClientCard > 0) {
		var img_cap = new ImageWCaption("images/bistroCard.png", "Cartão cliente");
		img_cap.el.classList.add("login_method_img");
		loginMethods.appendChild(img_cap.el);
		userHas++;
	}

	if(currentUser.loginUsername != "" && currentUser.loginPassword != "") {
		var img_cap = new ImageWCaption("images/usernamePassword.png", "Nome de utilizador e palavra passe");
		img_cap.el.classList.add("login_method_img");
		loginMethods.appendChild(img_cap.el);
		userHas++;
	}

	if(userHas < 4) {
		this.addNewLogin = new ImageWCaption("images/addNewWBorder.png", "Adicionar novo");
		this.addNewLogin.el.classList.add("login_method_img");
		loginMethods.appendChild(this.addNewLogin.el);
	}

	this.bottomButtons = new BottomButtons(1, 0, 0);
	this.el.appendChild(loginMethods);
	this.el.appendChild(this.bottomButtons.el);
}