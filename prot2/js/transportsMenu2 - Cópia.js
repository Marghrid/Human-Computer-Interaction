function transportsMenu2() {
	Menu.call(this);

	var searchBox = document.createElement("input");
	searchBox.type = "text";

	var mapAddresses = document.createElement("DIV");
	var map = document.createElement("DIV");

	mapAddresses.appendChild(map);

    /* REPLACE MARGARIDA WITH CURRENT USER! */
	if(margarida != null) {
		var addresses = document.createElement("TABLE");
		
		for(var i = 0; i < margarida.addresses.length; ++i) {
			var tr = document.createElement("TR");
			var td = document.createElement("TD");
			td.classList.add("addresses_names");
			td.appendChild(document.createTextNode(margarida.addresses[i].name));
			tr.appendChild(td);
	
			addresses.appendChild(tr);
		}

		mapAddresses.appendChild(addresses);
	}

	this.el.appendChild(searchBox);
	this.el.appendChild(mapAddresses);
}