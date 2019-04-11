function ManageInvoiceInfoMenu() {
	UpperMenu.call(this, "Informação de faturação");

	var form = document.createElement("form");
	form.id = "invoiceForm";

	form.appendChild(document.createTextNode("NIF: "));
	this.inputNIF = document.createElement("input");
	this.inputNIF.type = "number";
	this.inputNIF.classList.add("numberInput");
	this.inputNIF.id = "NIFinput";
	form.appendChild(this.inputNIF);

	form.appendChild(document.createElement("BR"));
	form.appendChild(document.createTextNode("Nome: "));
	this.el.appendChild(form);
	this.inputName = document.createElement("input");
	this.inputName.type = "text";
	this.inputName.classList.add("invoiceTextInput");
	this.inputName.classList.add("textInput");
	form.appendChild(this.inputName);

	form.appendChild(document.createElement("BR"));
	form.appendChild(document.createTextNode("Morada: "));
	this.el.appendChild(form);
	this.inputAddress = document.createElement("input");
	this.inputAddress.type = "text";
	this.inputAddress.classList.add("invoiceTextInput");
	this.inputAddress.classList.add("textInput");
	form.appendChild(this.inputAddress);

	this.bottomButtons = new BottomButtons(1, 0, 1);

	butt = this.bottomButtons.saveButton;
	butt.toggle();


	this.inputNIF.onkeyup = function() {

		if(this.value > 0) {
			if(butt.disabled)
				butt.toggle();
		} else if (!butt.disabled)
			butt.toggle();
	}

	this.el.appendChild(form);
	this.el.appendChild(this.bottomButtons.el);
}
