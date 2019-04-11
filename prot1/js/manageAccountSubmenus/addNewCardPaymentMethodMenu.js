function AddNewCardPaymentMethodMenu(service) {
	UpperMenu.call(this, "Adicionar cartão " + service);

	var all_div = document.createElement("DIV");
	var img = document.createElement("IMG");
	img.src = "images/" + service + ".png";
	img.classList.add("newPayment_img");
	all_div.appendChild(img);

	this.form = document.createElement("form");

	this.form.appendChild(document.createTextNode("Número do cartão:"));
	this.inputCardNumber = document.createElement("input");
	this.inputCardNumber.type = "number";
	this.inputCardNumber.classList.add("numberInput");
	this.form.appendChild(this.inputCardNumber);

	all_div.appendChild(this.form);

	this.bottomButtons = new BottomButtons(1, 0, 1);


	var butt = this.bottomButtons.saveButton;
	var icn = this.inputCardNumber;
	butt.toggle();

	this.inputCardNumber.onkeyup = function() {
		if(this.value > 0) {
			if(butt.disabled)
				butt.toggle();
		} else if (!butt.disabled)
				butt.toggle();
	}

	this.el.appendChild(all_div);
	this.el.appendChild(this.bottomButtons.el);
}
