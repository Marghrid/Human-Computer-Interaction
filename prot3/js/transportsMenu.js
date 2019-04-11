function TransportsMenu(addr) {
	Menu.call(this);

	this.searchBox = new SearchBox();
	this.mapBox = document.createElement("DIV");
	this.mapBox.classList.add("mapBox");
	this.mapBox.classList.add("noTabSelected");
	this.el.appendChild(this.searchBox.el);

	this.currentAddress = new Address("", addr);
	this.currentMap = new Map(this.currentAddress);

	this.areThereTabs = false;

    /* REPLACE MARGARIDA WITH CURRENT USER! */
	if(currentUser != null && currentUser.addresses.length!=0) {
		this.mapSidebar = new MapSidebar();

		for(var i = 0; i<currentUser.addresses.length; i++) {
			this.mapSidebar.addTab(new MapTab(currentUser.addresses[i], this));
		}

		var xtraTab = new MapTab(new Address("",""));
		xtraTab.el.removeChild(xtraTab.span);
		xtraTab.img = document.createElement("IMG");
		xtraTab.img.src = "images/addNew.png";
		xtraTab.el.appendChild(xtraTab.img);
		xtraTab.el.onclick = function(){}

		this.plusTab = xtraTab.el;

		this.mapSidebar.addTab(xtraTab);


		this.areThereTabs = true;
		this.mapBox.appendChild(this.mapSidebar.el);
	}

	if(!this.areThereTabs){
		this.el.classList.add("noTabs");
	}
	
	this.bottomButtons = new BottomButtons(0,1,0);
	this.bottomButtons.proceedButton.el.classList.add("disabled");
	this.mapBox.appendChild(this.currentMap.el);

	this.el.appendChild(this.mapBox);

	this.el.appendChild(this.bottomButtons.el);

	this.toggleTab = function(address){
		if(this.areThereTabs){
			for(var i=0; i<this.mapSidebar.tabs.length-1; i++){
				if(this.mapSidebar.tabs[i].addr.name == this.currentAddress.name){
					this.mapSidebar.tabs[i].el.classList.remove("selected");
				}
				if(this.mapSidebar.tabs[i].addr.name == address.name){
					this.mapSidebar.tabs[i].el.classList.add("selected");
				}
			}
			this.searchBox.input.value = address.local;
	    }

		this.swapMap(address);

		/* WE MUST NEVER ALLOW THIS TO HAPPEN WITH AN EMPTY ADDRESS*/

		this.bottomButtons.proceedButton.el.classList.remove("disabled");
		
		

	}

	this.swapMap = function(address){
		this.mapBox.removeChild(this.currentMap.el);
		this.currentMap = new Map(address);
		this.mapBox.appendChild(this.currentMap.el);

		this.currentAddress = address;
	}

	var menu = this;

	this.searchBox.searchButton.onclick = function(){
		if(menu.searchBox.input.value.length != 0){
			var addr = new Address("", menu.searchBox.input.value);
			menu.mapBox.classList.add("noTabSelected");
			menu.toggleTab(addr);
		}
		
	}

}

function Map(address){
	if(address.local.length != 0){
		this.el = document.createElement("DIV");
		this.el.classList.add("Map");
		this.img = document.createElement("IMG");
		this.sel = mod(stringHash(address.local), 5);
		this.img.src = "images/map" + (this.sel+1) + ".png";
		this.el.appendChild(this.img);
		this.textLabel = document.createElement("DIV");
		this.textLabel.appendChild(document.createTextNode(address.local));
		this.textLabel.classList.add("mapTextLabel");
		this.textLabel.style.textAlign = "left";
		this.textLabel.style.position = "absolute";
		switch(this.sel){
			case 0:
				this.textLabel.style.top = "200px";
				this.textLabel.style.left = "80px";
				break;
			case 1:
				this.textLabel.style.top = "170px";
				this.textLabel.style.left = "100px";
				break;
			case 2:
				this.textLabel.style.top = "150px";
				this.textLabel.style.left = "70px";
				break;
			case 3:
				this.textLabel.style.top = "182px";
				this.textLabel.style.left = "90px";
				break;
			case 4:
				this.textLabel.style.top = "230px";
				this.textLabel.style.left = "50px";
				break;
		}
		this.el.appendChild(this.textLabel);
	}
	else {
		this.el = document.createElement("DIV");
		this.el.classList.add("Map");
		this.img = document.createElement("IMG");
		this.img.src = "images/mapEmpty.png";
		this.el.appendChild(this.img);
	}

}

function MapSidebar() {
	this.el = document.createElement("DIV");

	this.tabs = new Array();
	this.el.classList.add("mapSidebar");

	

	this.addTab = function(tab) {
		this.tabs.push(tab);
		this.el.appendChild(this.tabs[this.tabs.length -1].el);
	}

}

function MapTab(addr, menu) {
	this.addr = addr;
	this.menu = menu;
	this.el =  document.createElement("DIV"); 
	this.span = document.createElement("SPAN");
	this.span.appendChild(document.createTextNode(addr.name));
	this.el.appendChild(this.span);

	this.el.classList.add("mapTab");
	this.el.menu = menu;

	this.el.onclick = function(){
		this.menu.mapBox.classList.remove("noTabSelected");
		this.menu.toggleTab(addr);
	}
}

function SearchBox() {
	this.el = document.createElement("DIV");
	this.el.classList.add("searchBox");

	this.icon = document.createElement("IMG");
	this.icon.src = "images/lupa.png";

	this.input = document.createElement("input");
	this.input.type = "text";
	
	this.input.addEventListener("focusin", keyboardFocus);
	this.input.addEventListener("focusout", keyboardDefocus);


	this.searchButton = document.createElement("DIV");
	this.searchButton.appendChild(document.createTextNode("\u27a5"));
	this.searchButton.classList.add("searchButton");
	this.searchButton.classList.add("disabled");

	var sb = this.searchButton;

	this.input.onkeyup = function(){
		if(this.value.length != 0){
			sb.classList.remove("disabled");
		} else {
			sb.classList.add("disabled");
		}
	}

	this.el.appendChild(this.icon);
	this.el.appendChild(this.input);
	this.el.appendChild(this.searchButton);
}

function stringHash(str) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function mod(n, m) {
        return ((n % m) + m) % m;
}