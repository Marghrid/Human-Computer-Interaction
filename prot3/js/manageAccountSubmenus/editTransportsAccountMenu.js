function EditTransportsAccountMenu(service) {
	UpperMenu.call(this, "Editar conta " + service);

	var currentUsername = "";
	var currentPassword = "";
	for(var i = 0; i < currentUser.transportsAccounts.length; ++i) {
		if(currentUser.transportsAccounts[i].service == service) {
			currentUsername = currentUser.transportsAccounts[i].username;
			currentPassword = currentUser.transportsAccounts[i].password;
		}
	}

	var img = document.createElement("IMG");
	img.src = "images/" + service + ".png";

	var form = document.createElement("form");
	form.classList.add("transportForm");

	form.appendChild(document.createTextNode("Username:"));
	this.inputUsername = document.createElement("input");
	this.inputUsername.type = "text";
	
	this.inputUsername.addEventListener("focusin", keyboardFocus);
	this.inputUsername.addEventListener("focusout", keyboardDefocus);
	
	this.inputUsername.value = currentUsername;
	this.inputUsername.classList.add("textInput");
	form.appendChild(this.inputUsername);

	form.appendChild(document.createElement("BR"));
	form.appendChild(document.createTextNode("Password:"));
	this.inputPassword = document.createElement("input");
	this.inputPassword.type = "password";
	this.inputPassword.value = currentPassword;
	this.inputPassword.classList.add("textInput");
	
	this.inputPassword.addEventListener("focusin", keyboardFocus);
	this.inputPassword.addEventListener("focusout", keyboardDefocus);
	
	form.appendChild(this.inputPassword);

    this.removeButton = document.createElement("DIV");
    this.removeButton.classList.add("removeButton");
    this.removeButton.appendChild(document.createTextNode("Remover conta " + service));

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

	this.el.classList.add("editTransportsAccountMenu");
	this.el.appendChild(img);
	this.el.appendChild(form);
	this.el.appendChild(this.removeButton);
	this.el.appendChild(this.bottomButtons.el);
}
