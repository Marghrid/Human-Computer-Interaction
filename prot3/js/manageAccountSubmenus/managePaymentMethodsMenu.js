function ManagePaymentMethodsMenu() {
	UpperMenu.call(this, "Métodos de pagamento");

    this.cardPayments  = new Array();
    this.otherPayments = new Array();
	var payments = document.createElement("div");
	this.addNewPayment = null;
	var i;
	for(i = 0; i < currentUser.paymentMethods.length; ++i) {
		var service = currentUser.paymentMethods[i].service;
		var img_cap = new ImageWCaption("images/" + service + ".png", service);
		img_cap.el.classList.add("payment_img");
		payments.appendChild(img_cap.el);

        img_cap.el.service = service; //this is ugly but necessary later on

        if(isACardPayment(service)) 
            this.cardPayments.push(img_cap.el);
        else
			this.otherPayments.push(img_cap.el);

	}

	if(i < (availableCardPayments.length + availableOtherPayments.length)) {
		this.addNewPayment = new ImageWCaption("images/addNewWBorder.png", "Adicionar novo");
		this.addNewPayment.el.classList.add("payment_img");
		payments.appendChild(this.addNewPayment.el);
	}


	this.bottomButtons = new BottomButtons(1, 0, 0);

	this.el.appendChild(payments);
	this.el.appendChild(this.bottomButtons.el);
}

function isACardPayment(service) {
    for(var i = 0; i < availableCardPayments.length; ++i) {
        if(availableCardPayments[i] == service) return true;
    }
    return false;
}