function HowToPayMenu(price) {
	Menu.call(this);

	var p = document.createElement("P");
	p.appendChild(document.createTextNode("Como deseja efetuar o pagamento?"));
	p.classList.add("text");

	var payments_div = document.createElement("div");

	var img_cap = new ImageWCaption("images/cash.png", "Dinheiro");
	payments_div.appendChild(img_cap.el);
	this.cashPayment = img_cap.el;

	var img_cap = new ImageWCaption("images/icon_multibanco.png", "Terminal Multibanco");
	payments_div.appendChild(img_cap.el);
	this.mbPayment = img_cap.el;

	this.cardPayments = new Array();

	for(var i = 0; i < availableCardPayments.length; ++i) {
		var service = availableCardPayments[i];
		var img_cap = new ImageWCaption("images/" + service + ".png", service);
		payments_div.appendChild(img_cap.el);

		img_cap.el.service = service; //this is ugly but necessary later on
		this.cardPayments.push(img_cap.el);
	}

	this.otherPayments = new Array();
	for(var i = 0; i < availableOtherPayments.length; ++i) {
		var service = availableOtherPayments[i];
		var img_cap = new ImageWCaption("images/" + service + ".png", service);
		payments_div.appendChild(img_cap.el);

		img_cap.el.service = service; //this is ugly but necessary later on
		this.otherPayments.push(img_cap.el);
	}

	var total = document.createElement("P");
	total.appendChild(document.createTextNode("Total a pagar: " + price.toFixed(2) + "€"));
	total.id = "totalToPay";

	this.bottomButtons = new BottomButtons(1, 0, 0);
	this.el.classList.add("howToPayMenu");
	this.el.appendChild(p);
	this.el.appendChild(payments_div);
	this.el.appendChild(total);
	this.el.appendChild(this.bottomButtons.el);
}