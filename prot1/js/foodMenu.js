function initialFoodMenu(docker) {
	docker.buttonSlots[0].setMenu(new FoodMenu());
}

function FoodMenu() {

	Menu.call(this);


	this.menus = new Array();

	this.currentTab = "";

	this.sidebar = new Sidebar();

	this.sidebar.addTab(new Tab("Entradas", this));
	this.sidebar.addTab(new Tab("Carnes", this));
	this.sidebar.addTab(new Tab("Peixe", this));
	this.sidebar.addTab(new Tab("Bebidas", this));
	this.sidebar.addTab(new Tab("Sobremesa", this));


	this.toggleTab = function(tabName){
		for(var i=0; i<this.sidebar.tabs.length; i++){
			if(this.sidebar.tabs[i].name == this.currentTab){
				this.sidebar.tabs[i].el.classList.remove("selected");
			}
			if(this.sidebar.tabs[i].name == tabName){
				this.sidebar.tabs[i].el.classList.add("selected");
			}
			
		}
		this.currentTab = tabName;
	}

	this.el.appendChild(this.sidebar.el);
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
	this.el.style.backgroundColor = "black";

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

