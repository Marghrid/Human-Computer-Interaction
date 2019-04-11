function lowerLeftDocker(docker) {
	docker.clean();
	
	docker.addButtonSlot(new ButtonSlot("PEDIR MAIS"));
	docker.addButtonSlot(new ButtonSlot("ENTRETENIMENTO"));
	docker.addButtonSlot(new ButtonSlot("JOGOS & APPS"));
	docker.addButtonSlot(new Keyboard());

	initialFoodMenu(docker);
	entertainment(docker);
	games(docker);
}

function initialFoodMenu(docker) {
	docker.buttonSlots[0].menu.clean();
	docker.buttonSlots[0].setMenu(new FoodMenu());
}

function entertainment(docker) {
	docker.buttonSlots[1].menu.clean();
	docker.buttonSlots[1].setMenu(new EntertainmentMenu());
}
function games(docker) {
	docker.buttonSlots[2].menu.clean();
	docker.buttonSlots[2].setMenu(new GamesMenu());
}

function Keyboard(){
	this.el = document.createElement("DIV");
	this.el.classList.add("keyboardDiv");
	this.el.classList.add("hidden");
	this.menu = document.createElement("img");
	this.menu.div = this.el;
	this.menu.visible = false;
	this.menu.src = "images/keyboard.png";
	this.menu.classList.add("keyboard");
	this.menu.classList.add("hidden");

	this.menu.toggleVisibility = function() {
		if(this.visible) {
			this.div.classList.add("hidden");
			this.classList.add("hidden");
		}
		else {
			this.div.classList.remove("hidden");
			this.classList.remove("hidden");
		}
	
		this.visible=!this.visible;
	}
	this.el.appendChild(this.menu);
}