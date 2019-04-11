function LoginMenu() {
	UpperMenu.call(this, "");

	this.el.classList.add("login");

	var fingerprint_card = document.createElement("div");
	fingerprint_card.classList.add("row");

	this.fingerprint     = document.createElement("img");
	this.fingerprint.id  = "fingerprint";
	this.fingerprint.src = "images/fingerprint.png";

	this.card    = document.createElement("div");
	this.card.id = "card";
	this.card.appendChild(document.createTextNode("Coloque aqui o seu"));
	this.card.appendChild(document.createElement("br"));
	this.card.appendChild(document.createTextNode("cartão cliente"));

	fingerprint_card.appendChild(this.fingerprint);
	fingerprint_card.appendChild(this.card);


	var form = document.createElement("form");

	form.appendChild(document.createTextNode("Username:"));
	this.inputUsername = document.createElement("input");
	this.inputUsername.classList.add("textInput");
	this.inputUsername.type = "text";
	form.appendChild(this.inputUsername);

	form.appendChild(document.createElement("BR"));
	form.appendChild(document.createTextNode("Password:"));
	this.inputPassword = document.createElement("input");
	this.inputPassword.classList.add("textInput");
	this.inputPassword.type = "password";
	form.appendChild(this.inputPassword);

	this.bottomButtons = new BottomButtons(0, 1, 0);

	var butt = this.bottomButtons.proceedButton;
	var iu = this.inputUsername;
	var ip = this.inputPassword;
	butt.toggle();

	this.inputUsername.onkeyup = this.inputPassword.onkeyup = function() {
		if(iu.value.length > 0) {
			if(ip.value.length > 0 && butt.disabled)
				butt.toggle();
		} else if (!butt.disabled)
			butt.toggle();
	}

	this.el.appendChild(fingerprint_card);
	this.el.appendChild(form);
	this.el.appendChild(this.bottomButtons.el);
}