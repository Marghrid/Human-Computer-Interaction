function AddUsernameLoginMenu() {
	UpperMenu.call(this, "Adicionar Username");

	var info_text = document.createElement("P");
	info_text.appendChild(document.createTextNode("Escolha o seu username:"));

	this.form = document.createElement("form");

	this.form.appendChild(document.createTextNode("Username:"));
	this.inputUsername = document.createElement("input");
	
	this.inputUsername.addEventListener("focusin", keyboardFocus);
	this.inputUsername.addEventListener("focusout", keyboardDefocus);
	this.inputUsername.classList.add("textInput");
	this.inputUsername.type = "text";
	this.form.appendChild(this.inputUsername);

	this.form.appendChild(document.createTextNode("Password:"));
	this.inputPassword = document.createElement("input");
	
	this.inputPassword.addEventListener("focusin", keyboardFocus);
	this.inputPassword.addEventListener("focusout", keyboardDefocus);
	
	this.inputPassword.classList.add("textInput");
	this.inputPassword.type = "password";
	this.form.appendChild(this.inputPassword);

	this.bottomButtons = new BottomButtons(1, 0, 1);


	var butt = this.bottomButtons.saveButton;
	var iu = this.inputUsername;
	var ip = this.inputPassword;
	butt.toggle();

	this.inputUsername.onkeyup = this.inputPassword.onkeyup = function() {
		if(iu.value.length > 0 && ip.value.length > 0){
			if(butt.disabled)
				butt.toggle();
		} else {
			if (!butt.disabled){
				butt.toggle();
			}
		}
	}

	this.el.appendChild(this.form);
	this.el.appendChild(this.bottomButtons.el);

}