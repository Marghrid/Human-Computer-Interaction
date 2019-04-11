function AddNewCardPaymentMethodMenu(service) {
	UpperMenu.call(this, "Adicionar cartão " + service);

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

	this.bottomButtons = new BottomButtons(1, 0, 1);

	var n1 = this.inputN1;
	var n2 = this.inputN2;
	var n3 = this.inputN3;
	var n4 = this.inputN4;
	var sn = this.inputSN;

	var butt = this.bottomButtons.saveButton;
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

	this.el.classList.add("addNewCardPaymentMethodMenu");
	this.el.appendChild(img);
	this.el.appendChild(this.form);
	this.el.appendChild(this.bottomButtons.el);
}
