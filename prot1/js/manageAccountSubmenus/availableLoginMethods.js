function AvailableLoginMethodsMenu() {
	UpperMenu.call(this, "Adicionar novo método de login");

	this.fingerprint = null;
	this.smartphone  = null;
	this.clientCard  = null;
	this.username    = null;

	var loginMethods = document.createElement("DIV");

	if(currentUser.loginFingerprint == false) {
		this.fingerprint = new ImageWCaption("images/fingerprint.png", "Reconhecimento da impressão digital");
		this.fingerprint.el.classList.add("login_method_img");
		loginMethods.appendChild(this.fingerprint.el);
	}

	if(currentUser.loginSmartphone == false) {
		this.smartphone = new ImageWCaption("images/smartphone.png", "Reconhecimento do smartphone");
		this.smartphone.el.classList.add("login_method_img");
		loginMethods.appendChild(this.smartphone.el);
	}

	if(currentUser.loginClientCard == 0) {
		this.clientCard = new ImageWCaption("images/bistroCard.png", "Cartão cliente");
		this.clientCard.el.classList.add("login_method_img");
		loginMethods.appendChild(this.clientCard.el);
	}

	if(currentUser.loginUsername == "" || currentUser.loginPassword == "") {
		this.username = new ImageWCaption("images/usernamePassword.png", "Nome de utilizador e palavra passe");
		this.username.el.classList.add("login_method_img");
		loginMethods.appendChild(this.username.el);
	}

	this.bottomButtons = new BottomButtons(1, 0, 0);
	this.el.appendChild(loginMethods);
	this.el.appendChild(this.bottomButtons.el);
}