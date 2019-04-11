function FoodDetailMenu(food) {
	this.grayOutBox = document.createElement("DIV");
	this.grayOutBox.classList.add("grayOutBox");

	this.el = document.createElement("DIV");
	this.el.classList.add("foodDetailMenu");

	this.img = document.createElement("IMG");
	this.img.classList.add("foodDetailImg");



	this.title = document.createElement("DIV");
	this.title.classList.add("foodDetailTitle");

	this.description = document.createElement("DIV");
	this.description.classList.add("foodDetailDescription");

	this.togglebleIngredients = document.createElement("DIV");
	this.togglebleIngredients.classList.add("toggleableIngredients");


	if(food.toggleble_ingredients.length > 0){
		let togglebleTitle = document.createElement("DIV");
		togglebleTitle.appendChild(document.createTextNode("Acompanhamentos:"));
		togglebleTitle.classList.add("togglebleTitle");
		this.togglebleIngredients.appendChild(togglebleTitle);
	}


	this.checkboxes = new Array();
	let checkboxes = this.checkboxes;
	for(let i = 0; i < food.toggleble_ingredients.length; ++i) {
		let container = document.createElement("DIV");
		container.classList.add("container");
		let checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = true;
		let label = document.createElement("label");
		label.appendChild(document.createTextNode(food.toggleble_ingredients[i]));
		this.checkboxes.push(checkbox);
		container.appendChild(checkbox);
		container.appendChild(label);
		this.togglebleIngredients.appendChild(container);

		//this.togglebleIngredients.appendChild(document.createElement("BR"));
	}

//	this.description.classList.add("foodDetailToggleable");

	this.price = document.createElement("DIV");
	this.price.classList.add("foodDetailPrice");


	this.title.appendChild(document.createTextNode(food.name));
	this.descriptionText = document.createElement("P");

	this.descriptionText.appendChild(this.img);
	this.descriptionText.appendChild(document.createTextNode(food.description))
	if(checkFood(food) != 0){
		let dangerIcon = document.createElement("IMG");
		dangerIcon.classList.add("dangerIcon");
		dangerIcon.src = "images/dangerIcon.png";
		this.description.appendChild(dangerIcon);

		var bold = document.createElement("b");
		var str = " Aviso: esta comida tem "
		var fCount = 0;
		for(var i = 0; i<currentUser.foodRestrictions.length && i<food.allergenics.length; i++){
			if(currentUser.foodRestrictions[i] != 0 && food.allergenics[i] == true){
				fCount++;
			}
		}

		var j = 0;
		for(var i = 0; i<currentUser.foodRestrictions.length && i<food.allergenics.length; i++){
			if(currentUser.foodRestrictions[i] != 0 && food.allergenics[i] == true){
				switch(i){
					case 0:
						str+= "frutos secos";
						break;
					case 1: 
						str+= "ovos";
						break;
					case 2:
						str+= "lacticínios";
						break;
					case 3:
						str+="elevado teor de sal";
						break;
					case 4:
						str+="glúten";
						break;
					default: break;
				}
				if(j<fCount-2){
					str+=", ";
				} else if(j==fCount-2){
					str+=" e ";
				} else {
					str+=".";
				}
				
				j++;
			}
				
		}
		bold.appendChild(document.createTextNode(str));
		this.descriptionText.appendChild(bold);
	}
	this.description.appendChild(this.descriptionText);
	this.img.src = food.image;


	this.price.priceLabel = document.createElement("DIV");
	this.price.priceLabel.appendChild(document.createTextNode("Preço:"));
	this.price.actualPrice = document.createElement("DIV");
	this.price.actualPrice.appendChild(document.createTextNode(food.price.toFixed(2) + " €"));
	this.price.appendChild(this.price.priceLabel);
	this.price.appendChild(this.price.actualPrice);

	var menu = this;

	this.cancelButton = document.createElement("DIV");
	this.cancelButton.appendChild(document.createTextNode("CANCELAR"));
	this.cancelButton.classList.add("foodDetailCancelButton");
	this.addButton = document.createElement("DIV");
	this.addButton.appendChild(document.createTextNode("ADICIONAR"));
	this.addButton.classList.add("foodDetailAddButton");

	this.cancelButton.onclick = function(){
		scene.lLDocker.buttonSlots[0].menu.bill.show();
		menu.delete();
	}

	this.addButton.onclick = function() {
		let checked = new Array();
		for(let i = 0; i < checkboxes.length; ++i) {
			checked.push(checkboxes[i].checked);
		}
		scene.lLDocker.buttonSlots[0].menu.bill.addFood(new OrderedFood(food, checked));
		scene.lLDocker.buttonSlots[0].menu.bill.show();
		menu.delete();
	}

	this.el.appendChild(this.title);
	this.el.appendChild(this.description);
	this.el.appendChild(this.togglebleIngredients)
	this.el.appendChild(this.price);
	this.el.appendChild(this.cancelButton);
	this.el.appendChild(this.addButton);
	scene.el.appendChild(this.el);
	scene.el.appendChild(this.grayOutBox);

	this.delete = function(){
		scene.el.removeChild(this.el);
		scene.el.removeChild(this.grayOutBox);
	}
}

function FoodAlterMenu(orderedFood){
	FoodDetailMenu.call(this, orderedFood.dish);


	for(let i = 0; i<this.checkboxes.length; i++){
		this.checkboxes[i].checked = orderedFood.toggled[i];
	}

	let checkboxes = this.checkboxes;

	var menu = this;

	this.addButton.onclick = function() {
		let checked = new Array();
		for(let i = 0; i < checkboxes.length; ++i) {
			checked.push(checkboxes[i].checked);
		}

		orderedFood.toggled = checked;
		scene.lLDocker.buttonSlots[0].menu.bill.show();
		menu.delete();
	}

  while(this.addButton.childNodes.length >= 1) {
    this.addButton.removeChild(this.addButton.firstChild);
  }
  this.addButton.appendChild(document.createTextNode("ALTERAR"));


}


