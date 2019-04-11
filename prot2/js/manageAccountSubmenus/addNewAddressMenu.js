function AddNewAddressMenu() {
	UpperMenu.call(this, "Adicionar morada");
	this.el.classList.add("newAddressMenu");

	/*var form = document.createElement("form");

	form.appendChild(document.createTextNode("Nome:"));
	this.inputName = document.createElement("input");
	
	this.inputName.type = "text";
	this.inputName.classList.add("textInput");
	form.appendChild(this.inputName);

	form.appendChild(document.createElement("BR"));
	form.appendChild(document.createTextNode("Morada:"));
	this.inputLocal = document.createElement("input");

	this.inputLocal.type = "password";
	this.inputLocal.classList.add("textInput");
	form.appendChild(this.inputLocal);*/

	var nameContainer = document.createElement("DIV");
	nameContainer.classList.add("nameContainer");
	nameContainer.appendChild(document.createTextNode("Nome:"));
	this.inputName = document.createElement("input");
	this.inputName.type = "text";
	this.inputName.classList.add("textInput");
	nameContainer.appendChild(this.inputName);



	var addrContainer = document.createElement("DIV");
	addrContainer.appendChild(document.createTextNode("Morada:"));
	this.inputLocal = document.createElement("input");
	addrContainer.classList.add("addrContainer");

	this.inputLocal.type = "text";
	this.inputLocal.classList.add("textInput");
	addrContainer.appendChild(this.inputLocal);

	this.currentAddress = new Address("", "");
	this.currentMap = new Map2(this.currentAddress);

	this.searchButton = document.createElement("DIV");
	this.searchButton.appendChild(document.createTextNode("\u27a5"));
	this.searchButton.classList.add("searchButton");
	this.searchButton.classList.add("disabled");

	var sb = this.searchButton;

	addrContainer.appendChild(this.searchButton);

	this.bottomButtons = new BottomButtons(1, 0, 1);

	var butt = this.bottomButtons.saveButton;
	var iName = this.inputName;
	var iLocal = this.inputLocal;
	var isThereMap = false;
	var menu = this;
	butt.toggle();

	this.inputName.onkeyup = function() {
		if(iName.value.length > 0 && isThereMap) {
			if(butt.disabled)
				butt.toggle();
		} else {
			if (!butt.disabled) {
				butt.toggle();
			}
		}
	}

	this.inputLocal.onkeyup = function(){
		if(this.value.length != 0){
			sb.classList.remove("disabled");
		} else {
			sb.classList.add("disabled");
		}
	}

	this.searchButton.onclick = function(){
		if(menu.inputLocal.value.length != 0){
			var addr = new Address("", menu.inputLocal.value);
			menu.swapMap(addr);
			isThereMap = true;
			if(iName.value.length > 0 && isThereMap) {
				if(butt.disabled)
					butt.toggle();
			} else {
				if (!butt.disabled) {
					butt.toggle();
				}
			}
		
		}
		
	}

	this.swapMap = function(address){
		this.el.removeChild(this.currentMap.el);
		this.currentMap = new Map2(address);
		this.el.appendChild(this.currentMap.el);

		this.currentAddress = address;
	}

	this.el.classList.add("addNewAddressMenu");
	this.el.appendChild(nameContainer);
	this.el.appendChild(addrContainer);
	this.el.appendChild(this.bottomButtons.el);
	this.el.appendChild(this.currentMap.el);
}

function Map2(address){
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
				this.textLabel.style.top = "160px";
				this.textLabel.style.left = "30px";
				break;
			case 1:
				this.textLabel.style.top = "130px";
				this.textLabel.style.left = "40px";
				break;
			case 2:
				this.textLabel.style.top = "110px";
				this.textLabel.style.left = "50px";
				break;
			case 3:
				this.textLabel.style.top = "142px";
				this.textLabel.style.left = "40px";
				break;
			case 4:
				this.textLabel.style.top = "180px";
				this.textLabel.style.left = "30px";
				break;
		}
		this.el.appendChild(this.textLabel);
	}
	else {
		this.el = document.createElement("DIV");
	}

}
