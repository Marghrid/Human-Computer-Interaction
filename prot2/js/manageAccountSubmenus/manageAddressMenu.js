function ManageAddressMenu() {
	UpperMenu.call(this, "Moradas e transportes");

	// Moradas:
	this.addresses_tr = new Array();
	var addresses_table = document.createElement("TABLE");
	addresses_table.id = "addresses_table";

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

		tr.address = currentUser.addresses[i];
		this.addresses_tr.push(tr);

		addresses_table.appendChild(tr);
	}

	var tr = document.createElement("TR");
	this.addNewAddress = document.createElement("TD");
	var addNewImg = document.createElement("IMG");
	addNewImg.src = "images/addNew.png"
	this.addNewAddress.appendChild(addNewImg);
	this.addNewAddress.id = "newAddress";
	tr.appendChild(this.addNewAddress);
	addresses_table.appendChild(tr);


	//Transportes:
	var transports_div = document.createElement("div");
	this.addNewTransport = null;
	this.transports = new Array();

	var i;
	for(i = 0; i < currentUser.transportsAccounts.length; ++i) {
		var service = currentUser.transportsAccounts[i].service;
		var img_cap = new ImageWCaption("images/" + service + ".png", service);
		img_cap.el.classList.add("transport_img");
		transports_div.appendChild(img_cap.el);

		img_cap.el.service = service; //this is ugly but necessary later on
		this.transports.push(img_cap.el);
	}

	if(i < availableTransports.length) {
		this.addNewTransport = new ImageWCaption("images/addNewWBorder.png", "Adicionar novo");
		this.addNewTransport.el.classList.add("transport_img");
		transports_div.appendChild(this.addNewTransport.el);
	}

	this.bottomButtons = new BottomButtons(1, 0, 0);

	this.tableContainer = document.createElement("DIV");
	this.tableContainer.classList.add("tableContainer");
	this.tableContainer.appendChild(addresses_table);

	this.el.appendChild(this.tableContainer);
	this.el.appendChild(transports_div);
	this.el.appendChild(this.bottomButtons.el);
}