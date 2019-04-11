var state = stateEnum.INITIAL;


function init2(){
	scene = new Scene();

	var welcome = document.createElement("DIV");
	welcome.appendChild(document.createTextNode("Bem-vindo ao"))
	welcome.classList.add("welcome")
	var logo = new Logo;
	logo.el.classList.add("initial");

	var bgVideo = document.createElement("VIDEO");
	bgVideo.src = "videos/bg.ogv";
	bgVideo.autoplay = true;
	bgVideo.loop = true;
	bgVideo.style.width = "100%";
	bgVideo.style.position = "absolute";
	bgVideo.style.left = "0px";
	bgVideo.style.top = "0px";
	bgVideo.style.zIndex = "-400";
	scene.el.appendChild(bgVideo);
	var videoCover = document.createElement("DIV");
	videoCover.classList.add("videoCover");
	scene.el.appendChild(videoCover);

	var pressToClick = document.createElement("DIV");
	pressToClick.appendChild(document.createTextNode("(Toque para continuar)"));
	pressToClick.classList.add("pressToClick");
	var clickableArea = document.createElement("DIV");
	clickableArea.classList.add("clickableArea");

	scene.el.appendChild(welcome);
	scene.el.appendChild(logo.el);
	scene.el.appendChild(pressToClick);
	scene.el.appendChild(clickableArea);

	clickableArea.onclick = function() {
		logo.el.classList.remove("initial");
		scene.hide();
		scene.el.removeChild(clickableArea);
		setTimeout(function() {

		scene.el.removeChild(welcome);
		scene.el.removeChild(pressToClick);
		scene.el.removeChild(videoCover);
		scene.el.removeChild(bgVideo);

		state++;

		let bfm = new BigFoodMenu();
		scene.bfm = bfm;

		scene.uLDocker = new UpperDocker();
		scene.uLDocker.move(150, 3);
		scene.el.appendChild(scene.uLDocker.el);

		scene.lRDocker = new RightDocker();
		scene.lRDocker.move(150, 3);
		scene.el.appendChild(scene.lRDocker.el);

		scene.lLDocker = new LeftDocker();
		scene.lLDocker.move(3, 3);
		scene.lLDocker.addButtonSlot(new Keyboard());
		scene.el.appendChild(scene.lLDocker.el);


		scene.lRDocker.toggleMenu = function(n) {
			if(!this.isOpen[n]) {
				for(var i = 0; i < this.nMenus; i++) {
					if(this.isOpen[i]) {
						this.toggleMenu(i);
					}
				}
				for(var i = 0; i < scene.uLDocker.nMenus; i++) {
					if(scene.uLDocker.isOpen[i]) {
						scene.uLDocker.toggleMenu(i);
					}
				}
				if(bfm.bill.isVisible) {
					bfm.bill.toggleVisibility();
				}
			}

			this.isOpen[n] = !this.isOpen[n];
			this.buttonSlots[n].menu.toggleVisibility();
		}

		scene.uLDocker.toggleMenu = function(n) {
			if(!this.isOpen[n]) {
				for(var i = 0; i < this.nMenus; i++) {
					if(this.isOpen[i]) {
						this.toggleMenu(i);
					}
				}
				for(var i = 0; i < scene.lRDocker.nMenus; i++) {
					if(scene.lRDocker.isOpen[i]) {
						scene.lRDocker.toggleMenu(i);
					}
				}
				if(bfm.bill.isVisible) {
					bfm.bill.toggleVisibility();
				}
			}

			this.isOpen[n] = !this.isOpen[n];
			this.buttonSlots[n].menu.toggleVisibility();
		}

		initialUpperDocker(scene.uLDocker);
		initialLowerDocker(scene.lRDocker);

		scene.show();
	}, 1000);
	}
	scene.show();

}

function BigFoodMenu() {

	this.el = document.createElement("DIV")
	this.masterDiv = document.createElement("DIV");
	this.el.appendChild(this.masterDiv);
	this.masterDiv.classList.add("masterDiv");

	this.el.classList.add("foodMenu");
	this.el.classList.add("initial");
	this.title = document.createElement("DIV");
	this.title.appendChild(document.createTextNode("Escolha o seu pedido"));
	this.el.appendChild(this.title);
	this.title.classList.add("bigFoodTitle");


	this.menus = new Array();
	this.menus.push(new InitialFoodChoiceMenu("Entrada"));
	this.menus.push(new InitialFoodChoiceMenu("Carne"));
	this.menus.push(new InitialFoodChoiceMenu("Peixe"));
	this.menus.push(new InitialFoodChoiceMenu("Bebida"));
	this.menus.push(new InitialFoodChoiceMenu("Sobremesa"));

	this.currentTab = "Entrada";

	this.sidebar = new InitialSidebar();

	this.sidebar.addTab(new InitialTab("Entrada",  this));
	this.sidebar.addTab(new InitialTab("Carne",    this));
	this.sidebar.addTab(new InitialTab("Peixe",     this));
	this.sidebar.addTab(new InitialTab("Bebida",   this));
	this.sidebar.addTab(new InitialTab("Sobremesa", this));

	this.getMenu = function(menuName){
		for(var i = 0; i<this.menus.length; i++){
			if(this.menus[i].title == menuName){
				return this.menus[i].el;
			}
		}
	}

	this.toggleTab = function(tabName){
		for(var i = 0; i < this.sidebar.tabs.length; i++){
			if(this.sidebar.tabs[i].name == this.currentTab) {
				this.sidebar.tabs[i].el.classList.remove("selected");
			}
			if(this.sidebar.tabs[i].name == tabName) {
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


	new InitialBill(new Array(), this, true);
	this.updateFoodRestrictions = function(){
		var prevMenu;
		for(var i = 0; i<this.sidebar.tabs.length; i++){
			if(this.currentTab == this.sidebar.tabs[i].name){
				prevMenu = this.menus[i].el;
			}
		}

		this.menus = new Array();
		this.menus.push(new InitialFoodChoiceMenu("Entrada"));
		this.menus.push(new InitialFoodChoiceMenu("Carne"));
		this.menus.push(new InitialFoodChoiceMenu("Peixe"));
		this.menus.push(new InitialFoodChoiceMenu("Bebida"));
		this.menus.push(new InitialFoodChoiceMenu("Sobremesa"));
		for(var i = 0; i<this.sidebar.tabs.length; i++){
			if(this.currentTab == this.sidebar.tabs[i].name){
				this.el.removeChild(prevMenu);
				this.el.appendChild(this.menus[i].el);
			}
		}
	}

	scene.el.appendChild(this.el);
}

function InitialSidebar() {
	this.el = document.createElement("DIV");

	this.tabs = new Array();

	this.el.style.position = "absolute";
	//this.el.zIndex = 2;
	this.el.style.left = "0%";
	this.el.style.top = "100px";
	this.el.style.width = "200px";

	this.buttons = new Array();

	this.addTab = function(tab) {
		this.tabs.push(tab);
		this.el.appendChild(this.tabs[this.tabs.length -1].el);
	}
}


function InitialTab(name, menu) {
	Tab.call(this, name, menu);
	//this.el.appendChild(document.createTextNode(name));
	this.el.classList.remove("tab");
	this.el.classList.add("InitialTab");
}

function InitialBill(foods, menu, visibility) {
	Bill.call(this, foods, menu);
	this.el.classList.add("initial");
	this.isVisible = true;


	this.clickableArrow = document.createElement("DIV");
	this.clickableArrow.classList.add("clickableArrow");
	var span = document.createElement("SPAN");
	span.appendChild(document.createTextNode("\u25ba"));
	this.clickableArrow.appendChild(span);
	this.el.appendChild(this.clickableArrow);
	this.el.style.opacity = "1";



	let thisFoodMenu = this;

	this.orderButton.onclick = function() {
		scene.hide();
		setTimeout(function(){
			for(let i = 0; i < foods.length; ++i) {
				unpayedItems.push(new FoodTabItem(foods[i].dish.name, foods[i].dish.price));
			}

			foods.splice(0, foods.length);
			thisFoodMenu.deleteBill();
			scene.el.removeChild(scene.bfm.el);
			scene.bfm = null;
			state++;

			document.body.removeChild(scene.el);
			init();
		}, 1000);

		/* TO DO  !!!!!!*/
		//reactOrder();
	}


	if(foods.length == 0){
		this.orderButton.onclick = function(){}
	}

	this.removeFood = function(food){
		this.foods.splice(this.foods.indexOf(food), 1);
		this.deleteBill();
		new InitialBill(this.foods, menu, this.isVisible);

	}

	this.addFood = function(food){
		this.foods.push(food);
		this.deleteBill();
		var ib = new InitialBill(this.foods, menu, this.isVisible);
		if(!ib.isVisible){
			setTimeout( function() {
				ib.toggleVisibility();}, 10);
		}

	}

	this.toggleVisibility = function() {
		if(this.isVisible) {
			this.el.classList.add("behind");
			this.isVisible = !this.isVisible;
		} else {
			for(var i = 0; i < scene.uLDocker.nMenus; i++) {
				if(scene.uLDocker.isOpen[i]) {
					scene.uLDocker.toggleMenu(i);
				}
			}
			for(var i = 0; i < scene.lRDocker.nMenus; i++) {
				if(scene.lRDocker.isOpen[i]) {
					scene.lRDocker.toggleMenu(i);
				}
			}
			this.el.classList.remove("behind");
			this.isVisible = !this.isVisible;
		}
	}

	let thisBill = this;
	this.el.onclick = function() {
		if(!thisBill.isVisible)
			thisBill.toggleVisibility();
	}

	if(!visibility){
		this.toggleVisibility();
	}

}

function InitialFoodChoiceMenu(food) {
	this.title = food;
	this.el = document.createElement("DIV");
	this.el.classList.add("initialFoodChoiceMenu");
	this.name = document.createElement("DIV");
	this.name.classList.add("initialFoodChoiceName");

	this.name.appendChild(document.createTextNode(food));
	this.el.appendChild(this.name);

	this.main = document.createElement("DIV");
	this.main.classList.add("main");
	this.el.appendChild(this.main);

	fillInitialFoodMenu(food, this);

}

function fillInitialFoodMenu(food, foodMenu){

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

	for(var i = 0, j=0; i<foods.length; i++){
		if(checkFood(foods[i]) < 2){
			foodMenu.foods[i] = new InitialFoodIcon(foods[i]);
			if(checkFood(foods[i]) == 1){
				let dangerIcon = document.createElement("IMG");
				dangerIcon.src = "images/dangerIcon.png";
				dangerIcon.classList.add("dangerIcon");
				foodMenu.foods[i].el.appendChild(dangerIcon)
			}

			foodMenu.foods[i].el.style.top = 10 + Math.floor(j/2)*340 + "px";
			foodMenu.foods[i].el.style.left = 55 + (j%2)*260 + "px";
			foodMenu.main.appendChild(foodMenu.foods[i].el);
			j++;
		}
	}
}

function InitialFoodIcon(food){
	FoodIcon.call(this, food);
	this.el.classList.add("initial");
	this.el.onclick = function(){
		var foodDetail = new FoodDetailMenu(food);
		foodDetail.grayOutBox.classList.add("initial");
		scene.bfm.bill.hide();
		foodDetail.el.classList.add("initial");
		foodDetail.addButton.onclick = function() {
			let checked = new Array();
			for(let i = 0; i < foodDetail.checkboxes.length; ++i) {
				checked.push(foodDetail.checkboxes[i].checked);
			}
			let orderedFood = new OrderedFood(food, checked);
			orderedFood.row.editButton.onclick = function(){
				new InitialFoodAlterMenu(orderedFood);
			}
			scene.bfm.bill.addFood(orderedFood);
			scene.bfm.bill.show();
			foodDetail.delete();
		};

		foodDetail.cancelButton.onclick = function(){
			scene.bfm.bill.show();
			foodDetail.delete();
		}



	}

}



function initialLowerDocker(docker) {
	docker.addButtonSlot(new ButtonSlot("CHAMAR EMPREGADO"));
	docker.buttonSlots[0].el.style.textAlign = "center";
	docker.buttonSlots[0].setMenu(new WaiterIsComing());
}


function InitialFoodAlterMenu(orderedFood){
	FoodAlterMenu.call(this, orderedFood);
	this.grayOutBox.classList.add("initial");
	scene.bfm.bill.hide();
	this.el.classList.add("initial");
	var menu = this;
	let checkboxes = this.checkboxes;
	this.addButton.onclick = function() {
		let checked = new Array();
		for(let i = 0; i < checkboxes.length; ++i) {
			checked.push(checkboxes[i].checked);
		}

		orderedFood.toggled = checked;
		scene.bfm.bill.show();
		menu.delete();
	}

	this.cancelButton.onclick = function(){
		scene.bfm.bill.show();
		menu.delete();
	}
}
