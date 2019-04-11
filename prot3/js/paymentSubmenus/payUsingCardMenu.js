function PayUsingUserCardMenu(price, service) {
	Menu.call(this);

	var img = document.createElement("IMG");
	img.src = "images/" + service + ".png";

	let bitOfCardNumber = 6666;

	for(let i = 0; i < currentUser.paymentMethods.length; ++i) {
		if(currentUser.paymentMethods[i].service == service)
			bitOfCardNumber = currentUser.paymentMethods[i].n4;
	}

	let infoText = document.createElement("P");
	infoText.appendChild(document.createTextNode("Deseja pagar " + price.toFixed(2) +
		"€ com o cartão " + service + ", com nº ****\u00a0****\u00a0****\u00a0" + bitOfCardNumber +
		", associado à sua conta de utilizador?"));

	this.bottomButtons = new BottomButtons(0, 0, 0);
	this.cancelButton  = new BottomButton("CANCELAR");
	this.payButton     = new BottomButton("PAGAR");
	this.cancelButton.el.classList.add("backButton");
	this.payButton.el.classList.add("saveButton");
	this.bottomButtons.el.appendChild(this.cancelButton.el);
	this.bottomButtons.el.appendChild(this.payButton.el);

	this.el.classList.add("payUsingUserCardMenu");
	this.el.appendChild(img);
	this.el.appendChild(infoText);
	this.el.appendChild(this.bottomButtons.el);
}

function PayUsingNewCardMenu(price, service) {
	UpperMenu.call(this, "Pagar " + price.toFixed(2) + "€ com cartão " + service);

	var img = document.createElement("IMG");
	img.src = "images/" + service + ".png";

	this.form = document.createElement("form");

	this.form.appendChild(document.createTextNode("Número do cartão:"));
	this.form.appendChild(document.createElement("BR"));
	this.inputN1 = document.createElement("input");
	this.inputN1.type = "number";
	this.inputN1.maxLength = "4";
	this.inputN1.classList.add("numberInput");
	this.inputN1.classList.add("cardNumber");
	this.form.appendChild(this.inputN1);

	this.form.appendChild(document.createTextNode(" - "));
	this.inputN2 = document.createElement("input");
	this.inputN2.type = "number";
	this.inputN2.maxLength = "4";
	this.inputN2.classList.add("numberInput");
	this.inputN2.classList.add("cardNumber");
	this.form.appendChild(this.inputN2);

	this.form.appendChild(document.createTextNode(" - "));
	this.inputN3 = document.createElement("input");
	this.inputN3.type = "number";
	this.inputN3.maxLength = "4";
	this.inputN3.classList.add("numberInput");
	this.inputN3.classList.add("cardNumber");
	this.form.appendChild(this.inputN3);

	this.form.appendChild(document.createTextNode(" - "));
	this.inputN4 = document.createElement("input");
	this.inputN4.type = "number";
	this.inputN4.maxLength = "4";
	this.inputN4.classList.add("numberInput");
	this.inputN4.classList.add("cardNumber");
	this.form.appendChild(this.inputN4);

	this.form.appendChild(document.createElement("BR"));

	this.form.appendChild(document.createTextNode("Número de segurança: "));
	this.inputSN = document.createElement("input");
	this.inputSN.type = "number";
	this.inputSN.maxLength = "3";
	this.inputSN.classList.add("numberInput");
	this.inputSN.classList.add("cardSafetyNumber");
	this.form.appendChild(this.inputSN);
	
	this.inputN1.addEventListener("focusin", keyboardFocus);
	this.inputN1.addEventListener("focusout", keyboardDefocus);
	this.inputN2.addEventListener("focusin", keyboardFocus);
	this.inputN2.addEventListener("focusout", keyboardDefocus);
	this.inputN3.addEventListener("focusin", keyboardFocus);
	this.inputN3.addEventListener("focusout", keyboardDefocus);
	this.inputN4.addEventListener("focusin", keyboardFocus);
	this.inputN4.addEventListener("focusout", keyboardDefocus);
	this.inputSN.addEventListener("focusin", keyboardFocus);
	this.inputSN.addEventListener("focusout", keyboardDefocus);	

	this.bottomButtons = new BottomButtons(0, 0, 0);
	this.cancelButton  = new BottomButton("CANCELAR");
	this.payButton     = new BottomButton("PAGAR");
	this.cancelButton.el.classList.add("backButton");
	this.payButton.el.classList.add("saveButton");
	this.bottomButtons.el.appendChild(this.cancelButton.el);
	this.bottomButtons.el.appendChild(this.payButton.el);

	var n1 = this.inputN1;
	var n2 = this.inputN2;
	var n3 = this.inputN3;
	var n4 = this.inputN4;
	var sn = this.inputSN;

	var butt = this.payButton;
	butt.toggle();

	this.inputN1.onkeyup
		= this.inputN2.onkeyup
		= this.inputN3.onkeyup
		= this.inputN4.onkeyup
		= this.inputSN.onkeyup 
		= function() {

		if(n1.value > 0 && n2.value > 0 && n3.value > 0 && n4.value > 0 && sn.value > 0) {
			if(butt.disabled)
				butt.toggle();
		} else if (!butt.disabled)
				butt.toggle();
	}

	this.el.classList.add("payUsingNewCardMenu");
	this.el.appendChild(img);
	this.el.appendChild(this.form);
	this.el.appendChild(this.bottomButtons.el);
}