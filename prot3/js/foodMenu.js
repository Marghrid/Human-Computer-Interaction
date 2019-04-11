function FoodMenu() {

	Menu.call(this);

	this.el.classList.add("foodMenu");


	this.menus = new Array();
	this.menus.push(new FoodChoiceMenu("Entrada"));
	this.menus.push(new FoodChoiceMenu("Carne"));
	this.menus.push(new FoodChoiceMenu("Peixe"));
	this.menus.push(new FoodChoiceMenu("Bebida"));
	this.menus.push(new FoodChoiceMenu("Sobremesa"));


	this.currentTab = "Entrada";

	this.sidebar = new Sidebar();

	this.sidebar.addTab(new Tab("Entrada", this));
	this.sidebar.addTab(new Tab("Carne", this));
	this.sidebar.addTab(new Tab("Peixe", this));
	this.sidebar.addTab(new Tab("Bebida", this));
	this.sidebar.addTab(new Tab("Sobremesa", this));

	this.getMenu = function(menuName){
		for(var i = 0; i<this.menus.length; i++){
			if(this.menus[i].title == menuName){
				return this.menus[i].el;
			}
		}
	}

	this.toggleTab = function(tabName){
		for(var i=0; i<this.sidebar.tabs.length; i++){
			if(this.sidebar.tabs[i].name == this.currentTab){
				this.sidebar.tabs[i].el.classList.remove("selected");
			}
			if(this.sidebar.tabs[i].name == tabName){
				this.sidebar.tabs[i].el.classList.add("selected");
			}
			
		}
		this.el.removeChild(this.getMenu(this.currentTab));
		this.el.appendChild(this.getMenu(tabName));

		this.currentTab = tabName;
	}

	this.el.appendChild(this.sidebar.el);
	this.sidebar.tabs[0].el.classList.add("selected");
	this.el.appendChild(this.menus[0].el);

	new Bill(new Array(), this);

	this.updateFoodRestrictions = function(){
		var prevMenu;
		for(var i = 0; i<this.sidebar.tabs.length; i++){
			if(this.currentTab == this.sidebar.tabs[i].name){
				prevMenu = this.menus[i].el;
			}
		}

		this.menus = new Array();
		this.menus.push(new FoodChoiceMenu("Entrada"));
		this.menus.push(new FoodChoiceMenu("Carne"));
		this.menus.push(new FoodChoiceMenu("Peixe"));
		this.menus.push(new FoodChoiceMenu("Bebida"));
		this.menus.push(new FoodChoiceMenu("Sobremesa"));
		for(var i = 0; i<this.sidebar.tabs.length; i++){
			if(this.currentTab == this.sidebar.tabs[i].name){
				this.el.removeChild(prevMenu);
				this.el.appendChild(this.menus[i].el);
			}
		}
	}
}



function Sidebar() {
	this.el = document.createElement("DIV");

	this.tabs = new Array();

	this.el.style.position = "absolute";
	//this.el.zIndex = 2;
	this.el.style.left = "0%";
	this.el.style.top = "0%";
	this.el.style.width = "10%";
	this.el.style.height = "100%";
	this.el.style.overflow = "hidden";

	this.buttons = new Array();	

	this.addTab = function(tab) {
		this.tabs.push(tab);
		this.el.appendChild(this.tabs[this.tabs.length -1].el);
	}
}

function Tab(name, menu) {
	this.name = name;
	this.menu = menu;
	this.el =  document.createElement("DIV"); 
	var title = document.createElement("DIV");
	title.appendChild(document.createTextNode(name));	
	this.el.appendChild(title);

	this.el.classList.add("tab");
	this.el.menu = menu;

	this.el.onclick = function() {
		this.menu.toggleTab(name);
	}
}

function FoodChoiceMenu(food) {
	this.title = food;
	this.el = document.createElement("DIV");
	this.el.classList.add("foodChoiceMenu");
	this.name = document.createElement("DIV");
	this.name.classList.add("foodChoiceName");

	this.name.appendChild(document.createTextNode(food));

	this.el.appendChild(this.name);
	this.main = document.createElement("DIV");
	this.main.classList.add("main");
	this.el.appendChild(this.main);

	fillFoodMenu(food, this);

}

function fillFoodMenu(food, foodMenu){

	foodMenu.foods = new Array();

	var foods;
	if(food == "Entrada"){
		foods = entradas;
	} else if(food == "Carne"){
		foods = carnes;
	} else if (food == "Peixe"){
		foods = peixe;
	} else if (food == "Bebida") {
		foods = bebidas;
	} else if (food == "Sobremesa"){
		foods = sobremesas;
	}

	for(let i = 0, j = 0; i<foods.length; i++){
		if(checkFood(foods[i]) < 2){
			foodMenu.foods[i] = new FoodIcon(foods[i]);
			if(checkFood(foods[i]) == 1){
				let dangerIcon = document.createElement("IMG");
				dangerIcon.src = "images/dangerIcon.png";
				dangerIcon.classList.add("dangerIcon");
				foodMenu.foods[i].el.appendChild(dangerIcon)
			}

			foodMenu.foods[i].el.style.top = 10 + Math.floor(j/2)*205 + "px";
			foodMenu.foods[i].el.style.left = 30 + (j%2)*160 + "px";
			foodMenu.main.appendChild(foodMenu.foods[i].el);
			j++;
		}
	}	
}

function checkFood(food){
	if(!currentUser){
		return 0;
	}

	var retVal = 0;
	for(var i = 0; i<currentUser.foodRestrictions.length && i<food.allergenics.length; i++){
		if(currentUser.foodRestrictions[i] != 0 && food.allergenics[i] == true){
			if(retVal<currentUser.foodRestrictions[i])
				retVal = currentUser.foodRestrictions[i];
		}
	}

	return retVal;
}

function FoodIcon(food){
	this.el = document.createElement("DIV");
	this.el.onclick = function(){
		new FoodDetailMenu(food);
		scene.lLDocker.buttonSlots[0].menu.bill.hide();

	}
	this.image = document.createElement("IMG");
	this.image.src = food.image;
	this.name = document.createElement("DIV");
	this.name.classList.add("fiName");
	this.nameSpan = document.createElement("SPAN");
	this.nameSpan.appendChild(document.createTextNode(food.name));
	this.name.appendChild(this.nameSpan);
	this.price = document.createElement("DIV");
	this.price.appendChild(document.createTextNode(food.price.toFixed(2) + " €"));
	this.price.classList.add("fiPrice");

	this.el.appendChild(this.image);
	this.el.appendChild(this.name);
	this.el.appendChild(this.price);

	this.el.classList.add("foodIcon");
}

function Bill(foods, menu){
	this.foods = foods;
	this.showing = true;
	this.cover = document.createElement("DIV");
	this.cover.classList.add("billCover");

	this.show = function(){
		if(!this.showing)
			this.el.removeChild(this.cover);
		this.showing = true;
	}

	this.hide = function(){
		if(this.showing)
			this.el.appendChild(this.cover);
		this.showing = false;
	}

	
	this.getTotalPrice = function(){
		var ret = 0;

		for(var i=0; i<this.foods.length; i++){
			ret+=this.foods[i].dish.price;
		}
		return ret;
	}


	this.removeFood = function(food){
		this.foods.splice(this.foods.indexOf(food), 1);
		this.deleteBill();
		new Bill(this.foods, menu);
	}

	this.addFood = function(food){
		this.foods.push(food);
		this.deleteBill();
		new Bill(this.foods, menu);
	}
	this.foodList = new Array();
	this.foodList.el = document.createElement("DIV");
	this.foodList.el.classList.add("foodList");

	var bill = this;

	for(let i = 0; i<this.foods.length; i++){
		foods[i].row.removeButton.onclick = function(){
			bill.removeFood(foods[i]);
		}
		this.foodList.el.appendChild(foods[i].row.el);
	}

	this.deleteBill = function(){
		menu.el.removeChild(this.el);
	}
	this.hBar = document.createElement("DIV");
	this.hBar.classList.add("hBar")
	this.price = document.createElement("DIV");

	this.price = document.createElement("DIV");
	this.price.classList.add("price");
	var name = document.createElement("DIV");
	name.text = document.createElement("SPAN");
	name.text.appendChild(document.createTextNode("TOTAL"));
	name.classList.add("priceTotal");
	name.appendChild(name.text);
	var priceLabel = document.createElement("DIV");
	priceLabel.text = document.createElement("SPAN");
	priceLabel.text.appendChild(document.createTextNode(this.getTotalPrice().toFixed(2) + " €"));
	priceLabel.classList.add("priceLabel");
	priceLabel.appendChild(priceLabel.text);

	this.price.appendChild(name);
	this.price.appendChild(priceLabel);

	this.el = document.createElement("DIV");
	this.el.classList.add("bill");
	this.el.appendChild(this.foodList.el);
	this.el.appendChild(this.hBar);
	this.el.appendChild(this.price);

	this.orderButton = document.createElement("DIV");
	this.orderButton.appendChild(document.createTextNode("PEDIR"));
	this.orderButton.classList.add("orderButton");


	let thisFoodMenu = this;

	this.orderButton.onclick = function() {

		for(let i = 0; i < foods.length; ++i) {
			unpayedItems.push(new FoodTabItem(foods[i].dish.name, foods[i].dish.price));
		}

		foods.splice(0, foods.length);
		thisFoodMenu.deleteBill();
		new Bill(foods, menu);

		reactOrder();
	}

	if(this.foods.length == 0){
		this.orderButton.classList.add("notShowing");
		this.orderButton.onclick = function(){}
	}

	/** TODO: orderButton.onclick 

	Needs to: for every orderedFood (in this.foods or foods), remove it (this.removeFood(food))
			  for every orderedFood, add the name and the price to the final bill.

	**/

	this.el.appendChild(this.orderButton);

	menu.bill = this;
	menu.el.appendChild(this.el);

}


function OrderedFood(dish, toggled) {
	this.row = new FoodBillItem(dish.name, dish.price);
	var food = this;
	this.row.editButton.onclick = function(){
		new FoodAlterMenu(food);
		scene.lLDocker.buttonSlots[0].menu.bill.hide();

	}
	this.row.removeButton.onclick = function(){

	}
	this.dish = dish;
	this.toggled = toggled;
}

function FoodBillItem(name, price){
	this.el = document.createElement("DIV");
	this.el.classList.add("foodBillItem");
	this.name = document.createElement("DIV");
	this.name.text = document.createElement("SPAN");
	this.name.text.appendChild(document.createTextNode(name));
	this.name.classList.add("foodBillName");

	this.name.appendChild(this.name.text);

	this.price = document.createElement("DIV");
	this.price.text = document.createElement("SPAN");
	this.price.text.appendChild(document.createTextNode(price.toFixed(2) + " €"));
	
	this.price.appendChild(this.price.text);
	this.price.classList.add("foodBillPrice");

	this.editButton = document.createElement("DIV");
	this.editButton.img = document.createElement("IMG");
	this.editButton.img.src = "images/editIcon.png"
	this.editButton.classList.add("billEditButton");
	
	this.editButton.appendChild(this.editButton.img);

	this.removeButton = document.createElement("DIV");
	this.removeButton.img = document.createElement("IMG");
	this.removeButton.img.src = "images/removeIcon.png";
	this.removeButton.classList.add("billRemoveButton");

	this.removeButton.appendChild(this.removeButton.img);





	this.el.appendChild(this.name);
	this.el.appendChild(this.price);
	this.el.appendChild(this.editButton);
	this.el.appendChild(this.removeButton);
}