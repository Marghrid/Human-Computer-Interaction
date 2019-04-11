var scene;
function init() {
	'use strict';
	scene = new Scene();
	initialFoodMenu(scene.lLDocker);
	initialUpperDocker(scene.uLDocker);
	lowerRightDocker(scene.lRDocker);
}

function reactLogin() {
	loggedInUpperDocker(scene.uLDocker);
	lowerRightDocker(scene.lRDocker);
}

function reactLogout() {
	initialUpperDocker(scene.uLDocker);
	lowerRightDocker(scene.lRDocker);
}

function Scene() {
	Object.call(this);

	this.el = document.createElement("DIV");
	this.el.style.position = "absolute";
	this.el.style.width = "1940px";
	this.el.style.height = "1000px";
	this.el.style.borderWidth = "2px";
	this.el.style.borderStyle = "solid";
	this.el.style.borderColor = "black";

	var plate = new Circle();
	var cup = new Circle();

	plate.reposition("600px", "200px");
	plate.resize("700px");

	cup.reposition("1200px", "50px");
	cup.resize("200px");

	this.el.appendChild(plate.el);
	this.el.appendChild(cup.el);

	var logo = new Logo();
	this.el.appendChild(logo.el);



	this.lLDocker = new LeftDocker();
	this.lLDocker.addButtonSlot(new ButtonSlot("PEDIR MAIS"));
	this.lLDocker.addButtonSlot(new ButtonSlot("ENTRETENIMENTO"));
	this.lLDocker.addButtonSlot(new ButtonSlot("JOGOS & APPS"));


	this.lLDocker.move(3, 3);
	this.el.appendChild(this.lLDocker.el);

	this.lRDocker = new RightDocker();
	var lRDocker = this.lRDocker;
	
	this.lRDocker.move(150, 3);
	this.el.appendChild(this.lRDocker.el);
	

	this.uLDocker = new UpperDocker();
	var uLDocker = this.uLDocker;
	this.uLDocker.move(150, 3);
	this.el.appendChild(this.uLDocker.el);

	this.lRDocker.toggleMenu = function(n) {
		if(!this.isOpen[n]) {
			for(var i = 0; i < this.nMenus; i++) {
				if(this.isOpen[i]) {
					this.toggleMenu(i);
				}
			}
			for(var i = 0; i < uLDocker.nMenus; i++) {
				if(uLDocker.isOpen[i]) {
					uLDocker.toggleMenu(i);
				}
			}
		}

		this.isOpen[n] = !this.isOpen[n];
		this.buttonSlots[n].menu.toggleVisibility();
	}

	this.uLDocker.toggleMenu = function(n) {
		if(!this.isOpen[n]) {
			for(var i = 0; i < this.nMenus; i++) {
				if(this.isOpen[i]) {
					this.toggleMenu(i);
				}
			}
			for(var i = 0; i < lRDocker.nMenus; i++) {
				if(lRDocker.isOpen[i]) {
					lRDocker.toggleMenu(i);
				}
			}
		}

		this.isOpen[n] = !this.isOpen[n];
		this.buttonSlots[n].menu.toggleVisibility();
	}




	document.body.appendChild(this.el);
}