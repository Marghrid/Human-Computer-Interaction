function initialFoodMenu(docker) {
	var fm = new FoodMenu();
	docker.buttonSlots[0].setMenu(fm);
}

function FoodMenu() {

	Menu.call(this);

	this.el.classList.add("foodMenu");


	this.menus = new Array();
	this.menus.push(new FoodChoiceMenu("Entradas"));
	this.menus.push(new FoodChoiceMenu("Carnes"));
	this.menus.push(new FoodChoiceMenu("Peixe"));
	this.menus.push(new FoodChoiceMenu("Bebidas"));
	this.menus.push(new FoodChoiceMenu("Sobremesa"));


	this.currentTab = "Entradas";

	this.sidebar = new Sidebar();

	this.sidebar.addTab(new Tab("Entradas", this));
	this.sidebar.addTab(new Tab("Carnes", this));
	this.sidebar.addTab(new Tab("Peixe", this));
	this.sidebar.addTab(new Tab("Bebidas", this));
	this.sidebar.addTab(new Tab("Sobremesa", this));

	this.getMenu = function(menuName){
		for(var i = 0; i<this.menus.length; i++){
			console.log(this.menus[i].title + " Lolada");
			if(this.menus[i].title == menuName){
				console.log(this.menus[i].title);
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

	this.buttons = new Array();	

	this.addTab = function(tab){
		this.tabs.push(tab);
		this.el.appendChild(this.tabs[this.tabs.length -1].el);
	}

}

function Tab(name, menu){
	this.name = name;
	this.menu = menu;
	this.el =  document.createElement("DIV"); 

	this.el.classList.add("tab");
	this.el.menu = menu;

	this.el.onclick = function(){
		this.menu.toggleTab(name);
	}
}

function FoodChoiceMenu(food){
	this.title = food;
	this.el = document.createElement("DIV");
	this.el.classList.add("foodChoiceMenu");
	this.name = document.createElement("DIV");
	this.name.classList.add("foodChoiceName");

	this.name.appendChild(document.createTextNode(food));

	this.el.appendChild(this.name);

	fillFoodMenu(food, this);

}

function fillFoodMenu(food, foodMenu){

	foodMenu.foods = new Array();

	var foods;
	if(food == "Entradas"){
		foods = entradas;
	} else if(food == "Carnes"){
		foods = carnes;
	} else if (food == "Peixe"){
		foods = peixe;
	} else if (food == "Bebidas") {
		foods = bebidas;
	} else if (food == "Sobremesa"){
		foods = sobremesas;
	}

	for(var i = 0; i<foods.length; i++){
		foodMenu.foods[i] = new FoodIcon(foods[i]);
		foodMenu.foods[i].el.style.top = 40 + Math.floor(i/2)*163 + "px";
		foodMenu.foods[i].el.style.left = 30 + (i%2)*160 + "px";
		foodMenu.el.appendChild(foodMenu.foods[i].el);
	}
	
	
}

function FoodIcon(food){
	this.el = document.createElement("DIV");
	this.image = document.createElement("IMG");
	this.image.src = food.image;
	this.name = document.createElement("P");
	this.name.appendChild(document.createTextNode(food.name))
	this.price = document.createElement("P");
	this.price.appendChild(document.createTextNode(food.price.toFixed(2) + " €"));

	this.el.appendChild(this.image);
	this.el.appendChild(this.name);
	this.el.appendChild(this.price);

	this.el.classList.add("foodIcon");
}