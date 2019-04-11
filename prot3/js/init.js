var scene;
var state;
var stateEnum = {
	INITIAL:     0,
	FIRST_ORDER: 1,
	FINAL:       2
}

function init() {
	'use strict';
	scene = new Scene();

	scene.populateMain();
	state = stateEnum.FINAL;
	initialUpperDocker(scene.uLDocker);
	lowerRightDocker(scene.lRDocker);
	lowerLeftDocker(scene.lLDocker);
	if(currentUser!=null)
		reactLogin();
	scene.show();
}

function reactLogin() {
	loggedInUpperDocker(scene.uLDocker);
	if(state == stateEnum.FIRST_ORDER){
		scene.bfm.updateFoodRestrictions();
	}
	if(state == stateEnum.FINAL){
		lowerRightDocker(scene.lRDocker);
		scene.lLDocker.buttonSlots[0].menu.updateFoodRestrictions();
	}
}


function reactLogout() {
	initialUpperDocker(scene.uLDocker);
	if(state == stateEnum.FIRST_ORDER){
		scene.bfm.updateFoodRestrictions();
	}
	
	if(state == stateEnum.FINAL){
		lowerRightDocker(scene.lRDocker);
		scene.lLDocker.buttonSlots[0].menu.updateFoodRestrictions();
	}
}

function reactOrder() {
	lowerRightDocker(scene.lRDocker);
}

function Scene() {
	Object.call(this);

	this.hidding = true;
	this.el = document.createElement("DIV");
	this.el.style.position = "absolute";
	this.el.style.width  = "1940px";
	this.el.style.height = "1000px";
	this.el.style.borderWidth = "2px";
	this.el.style.borderStyle = "solid";
	this.el.style.borderColor = "black";
	this.el.style.zIndex = -10;
	this.el.style.overflow = "hidden";
	this.occluder = document.createElement("DIV");
	this.occluder.classList.add("occluder");
	this.el.appendChild(this.occluder);

	this.hide = function(){
		if(!this.hidding){
			this.occluder.classList.remove("showing");
			this.occluder.classList.remove("onnabottom");
			this.hidding = true;
		}

	}


	this.show = function(){
		if(this.hidding){
			this.occluder.classList.add("showing");
			this.occluder.classList.add("onnabottom");
			this.hidding = false;
		}
	}

	document.body.appendChild(this.el);

	this.populateMain = function(){

		var plate = new Circle();
		var cup   = new Circle();
	
		plate.reposition("650px", "270px");
		plate.resize("700px");
	
		cup.reposition("1250px", "80px");
		cup.resize("200px");
	
		this.el.appendChild(plate.el);
		this.el.appendChild(cup.el);
	
		var logo = new Logo();
		this.el.appendChild(logo.el);
	
		this.lLDocker = new LeftDocker();
		this.lLDocker.move(3, 3);
		this.el.appendChild(this.lLDocker.el);
	
		this.lRDocker = new RightDocker();
		this.lRDocker.move(150, 3);
		this.el.appendChild(this.lRDocker.el);
		
		this.uLDocker = new UpperDocker();
		this.uLDocker.move(150, 3);
		this.el.appendChild(this.uLDocker.el);
	
		var lRDocker = this.lRDocker;
		var uLDocker = this.uLDocker;
		
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
	}

	
}