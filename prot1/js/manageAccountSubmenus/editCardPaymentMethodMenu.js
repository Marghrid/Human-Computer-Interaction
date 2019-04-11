function AddNewCardPaymentMethodMenu(service) {
	UpperMenu.call(this, "Editar cartão " + service);

	var all_div = document.createElement("DIV");
	var img = document.createElement("IMG");
	img.src = "images/" + service + ".png";
	img.classList.add("newPayment_img");
	all_div.appendChild(img);

	this.form = document.createElement("form");

	this.form.appendChild(document.createTextNode("Número do cartão:"));
	this.inputCardNumber = document.createElement("input");
	this.inputCardNumber.type = "number";
    this.inputCardNumber.value = currentUserCardNumber(service);
	this.inputCardNumber.classList.add("numberInput");
	this.form.appendChild(this.inputCardNumber);

	all_div.appendChild(this.form);

    this.removeButton = document.createElement("DIV");
    this.removeButton.appendChild(document.createTextNode("Remover cartão " + service));
	
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
    this.el.appendChild(this.removeButton);
	this.el.appendChild(this.bottomButtons.el);
}

function currentUserCardNumber(service) {
    for(var i = 0; i < currentUser.paymentMethods.length; ++i) {
        if(currentUser.paymentMethods.service == service)
            return currentUser.paymentMethods.number;
    }
    return -1;
    
}
