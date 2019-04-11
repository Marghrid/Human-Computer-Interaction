function ChooseTransportMenu(address) {
	Menu.call(this);


	title = document.createElement("P");
	title.appendChild(document.createTextNode("Transportes disponíveis para " + address + ":"));
	title.classList.add("chooseTransportTitle");

	var table = document.createElement("TABLE");
	table.classList.add("chooseTransportTable");

	this.transportServices = new Array();

	var basePrice = mod(stringHash(address), 10) + 4;
	var footTime = mod(stringHash(address), 50) + 10;

	// "On foot" row: 
	this.footRow = document.createElement("TR");
	var img = document.createElement("IMG");
	img.src = "images/onFoot.png";
	var td = document.createElement("TD");
	td.appendChild(img);
	td.appendChild(document.createElement("BR"));
	td.appendChild(document.createTextNode("A pé"));
	td.classList.add("firstColumn");
	this.footRow.appendChild(td);
	td = document.createElement("TD");
	td.appendChild(document.createTextNode(footTime.toFixed(0) + " minutos"));
	td.classList.add("secondColumn");
	this.footRow.appendChild(td);
	td = document.createElement("TD");
	td.appendChild(document.createTextNode(""));
	td.classList.add("thirdColumn");
	this.footRow.appendChild(td);
	table.appendChild(this.footRow);

	// "Available transports" rows:
	for(var i = 0; i < availableTransports.length; ++i) {
		var tr = document.createElement("TR");
		var img = document.createElement("IMG");
		img.src = "images/" + availableTransports[i] + ".png";
		var td = document.createElement("TD");
		td.classList.add("firstColumn");
		td.appendChild(img);
		td.appendChild(document.createElement("BR"));
		td.appendChild(document.createTextNode(availableTransports[i]));
		tr.appendChild(td);
		td = document.createElement("TD");
		var timeVariation = Math.random() * 2 - 1;
		var time = footTime/4 + timeVariation * footTime/8;
		td.appendChild(document.createTextNode(time.toFixed(0) + " minutos"));
		td.classList.add("secondColumn");
		tr.appendChild(td);
		td = document.createElement("TD");
		var priceVariation = Math.random() * 2 - 1;
		var price = basePrice + priceVariation * basePrice/4;
		td.appendChild(document.createTextNode(price.toFixed(2) + " €"));
		td.classList.add("thirdColumn");
		tr.appendChild(td);

		var trWName = new Object();
		trWName.name = availableTransports[i];
		trWName.tr = tr
		this.transportServices.push(trWName);
		
		table.appendChild(tr);
	}

	this.bottomButtons = new BottomButtons(1, 0, 0);


	this.el.appendChild(title);
	this.el.appendChild(table);
	this.el.appendChild(this.bottomButtons.el);
}