function LoginTransportsAccountMenu(service) {
	Menu.call(this);

	var currentUsername = "";
	var currentPassword = "";
	if(currentUser != null) {
		for(var i = 0; i < currentUser.transportsAccounts.length; ++i) {
			if(currentUser.transportsAccounts[i].service == service) {
				currentUsername = currentUser.transportsAccounts[i].username;
				currentPassword = currentUser.transportsAccounts[i].password;
			}
		}
	}

	var title = document.createElement("P");
	title.classList.add("title");
	title.appendChild(document.createTextNode("Iniciar sessão na conta " + service));

	var image = document.createElement("IMG");
	image.src = "images/" + service + ".png";

	var form = document.createElement("form");

	form.appendChild(document.createTextNode("Username:"));
	this.inputUsername = document.createElement("input");
	
	this.inputUsername.addEventListener("focusin", keyboardFocus);
	this.inputUsername.addEventListener("focusout", keyboardDefocus);
	
	this.inputUsername.type = "text";
	this.inputUsername.classList.add("textInput");
	this.inputUsername.value = currentUsername;
	form.appendChild(this.inputUsername);

	form.appendChild(document.createElement("BR"));
	form.appendChild(document.createTextNode("Password:"));
	this.inputPassword = document.createElement("input");
	
	this.inputPassword.addEventListener("focusin", keyboardFocus);
	this.inputPassword.addEventListener("focusout", keyboardDefocus);
	
	this.inputPassword.type = "password";
	this.inputPassword.classList.add("textInput");
	form.appendChild(this.inputPassword);

	this.callButton = new BottomButton("CHAMAR >>");
	this.callButton.el.classList.add("callButton");
	this.callButton.el.classList.add("saveButton");

	this.bottomButtons = new BottomButtons(1, 0, 0);

	this.bottomButtons.el.appendChild(this.callButton.el);

	var butt = this.callButton;
	var iu = this.inputUsername;
	var ip = this.inputPassword;
	butt.toggle();

	this.inputUsername.onkeyup = this.inputPassword.onkeyup = function() {
		if(iu.value.length > 0 && ip.value.length > 0){
			if(butt.disabled)
				butt.toggle();
		} else if (!butt.disabled) {
				butt.toggle();
		}
	}

	this.el.classList.add("loginTransportsAccountMenu");
	this.el.appendChild(title);
	this.el.appendChild(image);
	this.el.appendChild(form);
	this.el.appendChild(this.bottomButtons.el);
}