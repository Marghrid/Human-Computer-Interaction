function SignUpMenu() {
	UpperMenu.call(this, "");

	this.el.removeChild(this.title);

	this.form = document.createElement("form");

	this.form.appendChild(document.createTextNode("Nome:"));
	this.inputName = document.createElement("input");
	this.inputName.type = "text";
	this.inputName.classList.add("textInput");
	this.form.appendChild(this.inputName);

	var first_row = document.createElement("DIV");

	this.fingerprint = new ImageWCaption("images/fingerprint.png", "Reconhecimento da impressão digital");
	this.smartphone = new ImageWCaption("images/smartphone.png", "Reconhecimento do smarthphone");

	this.fingerprint.el.classList.add("login_method_img");
	this.smartphone.el.classList.add("login_method_img");

	first_row.appendChild(this.fingerprint.el);
	first_row.appendChild(this.smartphone.el);

	var second_row = document.createElement("DIV");

	this.clientCard = new ImageWCaption("images/bistroCardGreyed.png", "Cartão cliente");
	this.clientCard.greyed = true;
	this.clientCard.swapImage = function() {
		if(this.greyed)
			this.image.src = "images/bistroCard.png";
		else
			this.image.src = "images/bistroCardGreyed.png";
		this.greyed = !this.greyed;
	}

	this.usernamePassword = new ImageWCaption("images/usernamePassword.png", "Nome de utilizador e palavra-passe");

	this.clientCard.el.classList.add("login_method_img");
	this.usernamePassword.el.classList.add("login_method_img");

	second_row.appendChild(this.clientCard.el);
	second_row.appendChild(this.usernamePassword.el);

	var fingerprint = this.fingerprint;
	var smartphone = this.smartphone;
	var clientCard = this.clientCard;
	var usernamePassword = this.usernamePassword

	var inputName = this.inputName;

	fingerprint.toggle();
	smartphone.toggle();
	clientCard.toggle();
	usernamePassword.toggle();

	this.inputName.onkeyup = function() {
		if(inputName.value.length > 0) {
			if(fingerprint.disabled && smartphone.disabled
				&& clientCard.disabled && usernamePassword.disabled) {
		
				fingerprint.toggle();
				smartphone.toggle();
				clientCard.toggle();
				clientCard.swapImage();
				usernamePassword.toggle();
		
			}
		} else if (!fingerprint.disabled && !smartphone.disabled
			&& !clientCard.disabled && !usernamePassword.disabled) {
				
			fingerprint.toggle();
			smartphone.toggle();
			clientCard.toggle();
			clientCard.swapImage();
			usernamePassword.toggle();
		}
	}

	this.el.appendChild(this.form);
	this.el.appendChild(first_row);
	this.el.appendChild(second_row);

}