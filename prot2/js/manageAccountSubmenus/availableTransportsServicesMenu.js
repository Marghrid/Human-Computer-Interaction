function AvailableTransportsServicesMenu() {
	UpperMenu.call(this, "Adicionar transporte");

	var text = document.createElement("P");
	text.style.marginLeft = "20px";
	text.appendChild(document.createTextNode("Serviços disponíveis:"));

	this.transports = new Array();
	var transports_div = document.createElement("div");

	for(var i = 0; i < availableTransports.length; ++i) {
		if(currentUserDoesntHaveTransport(availableTransports[i])) {
			var service = availableTransports[i];
			var img_cap = new ImageWCaption("images/" + service + ".png", service);
			img_cap.el.classList.add("transport_img");
			transports_div.appendChild(img_cap.el);

			img_cap.el.service = service; //this is ugly but necessary later on
			this.transports.push(img_cap.el);
		}
	}

	this.bottomButtons = new BottomButtons(1, 0, 0);
	this.el.appendChild(text);
	this.el.appendChild(transports_div);
	this.el.appendChild(this.bottomButtons.el);
}

function currentUserDoesntHaveTransport(service) {
	for (var i = 0; i < currentUser.transportsAccounts.length; ++i) {
		if(currentUser.transportsAccounts[i].service == service)
			return false;
	}
	return true;
}