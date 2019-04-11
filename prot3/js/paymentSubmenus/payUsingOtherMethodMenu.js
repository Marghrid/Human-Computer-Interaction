function PayUsingOtherMethodMenu(price, service) {
	UpperMenu.call(this, "Pagar " + price.toFixed(2) + "€ com " + service);

	var currentUsername = "";
	if(currentUser != null) {
		for(var i = 0; i < currentUser.paymentMethods.length; ++i) {
			if(currentUser.paymentMethods[i].service == service) {
				currentUsername = currentUser.paymentMethods[i].username;
			}
		}
	}

	var img = document.createElement("IMG");
	img.src = "images/" + service + ".png";

	var form = document.createElement("form");

	form.appendChild(document.createTextNode("Username:"));
	this.inputUsername = document.createElement("input");
	this.inputUsername.type = "text";
	this.inputUsername.value = currentUsername;
	this.inputUsername.classList.add("textInput");
	
	this.inputUsername.addEventListener("focusin", keyboardFocus);
	this.inputUsername.addEventListener("focusout", keyboardDefocus);
	form.appendChild(this.inputUsername);

	form.appendChild(document.createElement("BR"));
	form.appendChild(document.createTextNode("Password:"));
	this.inputPassword = document.createElement("input");
	this.inputPassword.type = "password";
	this.inputPassword.classList.add("textInput");
	
	this.inputPassword.addEventListener("focusin", keyboardFocus);
	this.inputPassword.addEventListener("focusout", keyboardDefocus);
	form.appendChild(this.inputPassword);

	this.bottomButtons = new BottomButtons(0, 0, 0);
	this.cancelButton  = new BottomButton("CANCELAR");
	this.payButton     = new BottomButton("PAGAR");
	this.cancelButton.el.classList.add("backButton");
	this.payButton.el.classList.add("saveButton");
	this.bottomButtons.el.appendChild(this.cancelButton.el);
	this.bottomButtons.el.appendChild(this.payButton.el);

	var butt = this.payButton;
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

	this.el.classList.add("editOtherPaymentMethodMenu");
	this.el.appendChild(img);
	this.el.appendChild(form);
	this.el.appendChild(this.bottomButtons.el);
}