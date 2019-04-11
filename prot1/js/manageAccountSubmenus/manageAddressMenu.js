function ManageAddressMenu() {
	UpperMenu.call(this, "Moradas e transportes");

	// Moradas:
	var addresses = document.createElement("TABLE");
	addresses.id = "addresses_table";

	for(var i = 0; i < currentUser.addresses.length; ++i) {
		var tr = document.createElement("TR");
		var td = document.createElement("TD");
		td.classList.add("addresses_names");
		td.appendChild(document.createTextNode(currentUser.addresses[i].name));
		tr.appendChild(td);

		var td = document.createElement("TD");
		td.classList.add("addresses_locals");
		td.appendChild(document.createTextNode(currentUser.addresses[i].local));
		tr.appendChild(td);

		addresses.appendChild(tr);
	}

	var tr = document.createElement("TR");
	this.addNewAddress = document.createElement("TD");
	var addNewImg = document.createElement("IMG");
	addNewImg.src = "images/addNew.png"
	this.addNewAddress.appendChild(addNewImg);
	this.addNewAddress.id = "newAddress";
	tr.appendChild(this.addNewAddress);
	addresses.appendChild(tr);


	//Transportes:
	var transports = document.createElement("div");
	this.addNewTransport = null;
	var i;
	for(i = 0; i < currentUser.transportsAccounts.length; ++i) {
		var transport = currentUser.transportsAccounts[i].service;
		var img_cap = new ImageWCaption("images/" + transport + ".png", transport);
		img_cap.el.classList.add("transport_img");
		transports.appendChild(img_cap.el);
	}

	if(i < availableTransports.length) {
		this.addNewTransport = new ImageWCaption("images/addNewWBorder.png", "Adicionar novo");
		this.addNewTransport.el.classList.add("transport_img");
		transports.appendChild(this.addNewTransport.el);
	}

	this.bottomButtons = new BottomButtons(1, 0, 0);

	this.el.appendChild(addresses);
	this.el.appendChild(transports);
	this.el.appendChild(this.bottomButtons.el);
}