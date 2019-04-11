function ManageFoodRestrictionsMenu() {
	UpperMenu.call(this, "Restrições alimentares");

	this.informativeText = document.createElement("P");
	this.informativeText.appendChild(document.createTextNode("Evitar comidas:"));
	this.informativeText.classList.add("food_restrictions_text");

	this.bottomButtons = new BottomButtons(1, 0, 0);

	this.bottomButtons.saveButton = new SaveButton();
	this.bottomButtons.el.appendChild(this.bottomButtons.saveButton.el);
	this.el.appendChild(this.bottomButtons.el);
	this.el.appendChild(this.informativeText);
	
	this.checkboxes = new Array();

	this.checkboxes.push(new Checkbox("Com frutos secos"));
	this.checkboxes.push(new Checkbox("Com ovos"));
	this.checkboxes.push(new Checkbox("Com lacticínios"));
	this.checkboxes.push(new Checkbox("Com elevado Teor de Sal"));
	this.checkboxes.push(new Checkbox("Não vegetarianas"));
	this.checkboxes.push(new Checkbox("Não veganas"));

	for(var i = 0; i < this.checkboxes.length; i++){
		this.el.appendChild(this.checkboxes[i].el);
		this.checkboxes[i].input.checked = currentUser.foodRestrictions[i];
	}
}

function Checkbox(name){

	this.el = document.createElement("DIV");
	this.el.classList.add("checkbox");

	this.el.style.textAlign = "left";

	this.name = name;
	this.input = document.createElement("input");
	this.input.type = "checkbox"
	this.label = document.createElement("label");
	this.label.appendChild(document.createTextNode(name));



	this.el.appendChild(this.input);
	this.el.appendChild(this.label);
}