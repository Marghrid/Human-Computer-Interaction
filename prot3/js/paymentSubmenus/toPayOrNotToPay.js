function ToPayOrNotToPay() {
	
	if(unpayedItems.length > 0) {
		Menu.call(this);
		this.bottomButtons = new BottomButtons(0, 1, 0);
		let checkboxes = new Array();
		let list = document.createElement("UL");
		var menu= this;
		this.price = 0;
		
		let beingPayed = Array();
		for(let i = 0; i < unpayedItems.length; ++i) {
			beingPayed.push(i);
		}

		let infoText = document.createElement("P");
		infoText.appendChild(document.createTextNode("Selecione os pedidos que deseja pagar:"));
		infoText.classList.add("infoText");
	
		let total = document.createElement("DIV");
		total.classList.add("totalDiv");
		let totalWord = document.createElement("SPAN");
		totalWord.appendChild(document.createTextNode("Total:"));
		total.appendChild(totalWord);
		let totalNumber = document.createElement("SPAN");
		totalNumber.classList.add("priceSpan");
	
		
		let butt = this.bottomButtons.proceedButton;

		for(let i = 0; i < unpayedItems.length; ++i) {
			let li = document.createElement("LI");
			let checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = true;
			menu.price += unpayedItems[i].price;
			checkbox.onchange = function() {
				if(checkbox.checked) {
					menu.price += unpayedItems[i].price;
					beingPayed.push(i);
				}
				else {
					menu.price -= unpayedItems[i].price;
					beingPayed.splice(beingPayed.indexOf(i), 1);
				}
				totalNumber.removeChild(totalNumber.lastChild);
				totalNumber.appendChild(document.createTextNode("" + menu.price.toFixed(2) + "€"));
				if(menu.price > 0 && butt.disabled)    butt.toggle();
				if(menu.price <= 0 && !butt.disabled)  butt.toggle();
			}
			li.appendChild(checkbox);
			let label = document.createElement("label");
			let nameSpan = document.createElement("SPAN");
			let priceSpan = document.createElement("SPAN");
			nameSpan.appendChild(document.createTextNode(unpayedItems[i].name));
			priceSpan.appendChild(document.createTextNode("" + unpayedItems[i].price.toFixed(2) + "€"));
			priceSpan.classList.add("priceSpan");
			label.appendChild(nameSpan);
			label.appendChild(priceSpan);
			li.appendChild(label);
			list.appendChild(li);
		}
	
		totalNumber.appendChild(document.createTextNode("" + menu.price.toFixed(2) + "€"));
		total.appendChild(totalNumber);
	
		this.beingPayed = beingPayed;
		this.beingPayed.sort(function(a, b){return b-a;});
		this.el.appendChild(infoText);
		this.el.appendChild(list);
		this.el.appendChild(total);
		this.el.appendChild(this.bottomButtons.el);
	}

	else {
		SuccessMessage.call(this, "Não há nada para pagar!");
		this.bottomButtons = new BottomButtons(0, 1, 0);
	}
	this.el.classList.add("toPayOrNotToPay");
}