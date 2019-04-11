function AvailablePaymentServicesMenu() {
	UpperMenu.call(this, "Adicionar método de pagamento");

	var text = document.createElement("P");
	text.style.marginLeft = "20px";
	text.appendChild(document.createTextNode("Serviços disponíveis:"));

	this.cardPayments = new Array();
	var payments_div = document.createElement("div");

	for(var i = 0; i < availableCardPayments.length; ++i) {
		if(currentUserDoesntHavePayment(availableCardPayments[i])) {
			var payment = availableCardPayments[i];
			var img_cap = new ImageWCaption("images/" + payment + ".png", payment);
			img_cap.el.classList.add("transport_img");
			payments_div.appendChild(img_cap.el);

			img_cap.el.payment = payment; //this is ugly but necessary later on
			this.cardPayments.push(img_cap.el);
		}
	}

	this.otherPayments = new Array();
	for(var i = 0; i < availableOtherPayments.length; ++i) {
		if(currentUserDoesntHavePayment(availableOtherPayments[i])) {
			var payment = availableOtherPayments[i];
			var img_cap = new ImageWCaption("images/" + payment + ".png", payment);
			img_cap.el.classList.add("transport_img");
			payments_div.appendChild(img_cap.el);

			img_cap.el.payment = payment; //this is ugly but necessary later on
			this.otherPayments.push(img_cap.el);
		}
	}

	this.bottomButtons = new BottomButtons(1, 0, 0);
	this.el.appendChild(text);
	this.el.appendChild(payments_div);
	this.el.appendChild(this.bottomButtons.el);
}

function currentUserDoesntHavePayment(payment) {
	for (var i = 0; i < currentUser.paymentMethods.length; ++i) {
		if(currentUser.paymentMethods[i].service == payment)
			return false;
	}
	return true;
}