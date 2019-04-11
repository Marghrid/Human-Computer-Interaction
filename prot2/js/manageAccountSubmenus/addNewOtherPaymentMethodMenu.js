function AddNewOtherPaymentMethodMenu(payment) {
	UpperMenu.call(this, "Adicionar conta " + payment);

	var img = document.createElement("IMG");
	img.src = "images/" + payment + ".png";

	var form = document.createElement("form");

	form.appendChild(document.createTextNode("Username:"));
	this.inputUsername = document.createElement("input");
	
	this.inputUsername.type = "text";
	this.inputUsername.classList.add("textInput");
	form.appendChild(this.inputUsername);

	form.appendChild(document.createElement("BR"));
	form.appendChild(document.createTextNode("Password:"));
	this.inputPassword = document.createElement("input");

	this.inputPassword.type = "password";
	this.inputPassword.classList.add("textInput");
	form.appendChild(this.inputPassword);


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

	this.el.classList.add("addNewOtherPaymentMethodMenu");
	this.el.appendChild(img);
	this.el.appendChild(form);
	this.el.appendChild(this.bottomButtons.el);
}
