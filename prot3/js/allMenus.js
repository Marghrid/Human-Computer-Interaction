var animFrameReturn, time;
'use strict';

function exchangeElements(element1, element2, par) {
    var clonedElement1 = element1;
    var clonedElement2 = element2;

    par.replaceChild(clonedElement1, element2);
    par.replaceChild(clonedElement2, element1);

    return clonedElement1;
}


function getDelta() {
	var oldTime = time;
	time = performance.now();
	return (time-oldTime)/1000;
}

function keyboardFocus(){
	scene.lLDocker.toggleMenu(scene.lLDocker.buttonSlots.length-1);
}
function keyboardDefocus(){
	scene.lLDocker.toggleMenu(scene.lLDocker.buttonSlots.length-1);
}

function ObjUI() {
	this.el = new Object();
/*	this.el.style;*/
	
	this.position   = new Object();
	this.position.x = 0;
	this.position.y = 0;
	
	this.move = function(x,y) {
		this.position.x += x;
		this.position.y += y;
		
		this.el.style.bottom = this.position.y + "0px";
		this.el.style.left   = this.position.x + "0px";
	}       
}

function Docker() {
	ObjUI.call(this);
	this.buttonSlots = new Array();
	this.el = document.createElement("DIV");
	this.el.classList.add("docker");
	
	this.appendFrom = function(el) {
		el.appendChild(this.el);
	}

	this.nMenus = 0;
	this.isOpen = new Array();
	this.toggleMenu = function(n) {
		if(!this.isOpen[n]) {
			for(var i = 0; i < this.nMenus; i++) {
				if(this.isOpen[i]) {
					this.toggleMenu(i);
				}
			}
		}

		this.isOpen[n] = !this.isOpen[n];
		this.buttonSlots[n].menu.toggleVisibility();
	}

	this.clean = function() {
		this.nMenus = 0;
		this.isOpen = new Array();
		while(this.buttonSlots.length > 0) {
			this.el.removeChild(this.buttonSlots.pop().el);
		}
	}


}

function LeftDocker() {
	Docker.call(this);

	this.addButtonSlot = function(b) {
		this.buttonSlots.push(b);
		if(b.butt){
			b.butt.el.num    = this.nMenus;
			b.butt.el.docker = this;
		}

		this.el.appendChild(b.el);
		this.isOpen[this.nMenus] = false;
		
		this.nMenus++;
	}
}

function RightDocker() {
	Docker.call(this);

	this.addButtonSlot = function(b) {
		this.buttonSlots.push(b);

		b.butt.el.num = this.nMenus;
		b.butt.el.docker = this;
		b.menu.docker = this;

		this.el.appendChild(b.el);
		this.isOpen[this.nMenus] = false;
		
		this.nMenus++;
	}
}

function UpperDocker() {
	Docker.call(this);

	this.addButtonSlot = function(b) {
		this.buttonSlots.push(b);

		b.butt.el.num = this.nMenus;
		b.butt.el.docker = this;
		this.isOpen[this.nMenus] = false;
		this.nMenus++;

		b.el.removeChild(b.menu.el);
		b.el.removeChild(b.butt.el);

		b.el.appendChild(b.butt.el);
		b.el.appendChild(b.menu.el);

		this.el.appendChild(b.el);
	}

	this.move = function(x,y) {
		this.position.x += x;
		this.position.y += y;
		
		this.el.style.left = this.position.x + "0px";
		this.el.style.top  = this.position.y + "0px";
	}       
}

function ButtonSlot(name) {
	ObjUI.call(this);
	this.el = document.createElement("DIV");
	this.el.classList.add("buttSlot");
	
	this.butt = new Button(name);
	this.menu = new Menu();
	
	this.setButt = function(buttonArg) {
		var tmpButt = this.butt.el;
		this.butt = buttonArg;
		this.el.replaceChild(this.butt.el, tmpButt);	
	}

	this.setMenu = function(menuArg) {
		var tmpMenu = this.menu.el;
		this.menu = menuArg;
		this.el.replaceChild(this.menu.el, tmpMenu);
	}

	this.el.appendChild(this.menu.el);
	this.el.appendChild(this.butt.el);	
}

function Menu() {
	ObjUI.call(this);
	this.el = document.createElement("DIV");
	this.el.classList.add("menu");
	this.el.classList.add("hidden");
	
	this.visible = false;
	
	this.toggleVisibility = function() {
		if(this.visible) {
			this.el.classList.add("hidden");
		}
		else {
			this.el.classList.remove("hidden");
		}
	
		this.visible=!this.visible;
	}

	this.clean = function() {
		while (this.el.hasChildNodes()) {
 			this.el.removeChild(this.el.lastChild);
		}
	}
}

function Button(name) {
	ObjUI.call(this);
	this.el = document.createElement("DIV");
	this.el.classList.add("butt");
	this.el.classList.add("noselect");

	this.name = name;

	this.el.onclick = function() {
		this.docker.toggleMenu(this.num);
	}
	this.el.appendChild(document.createTextNode(name));
	
}

function Circle(){
	ObjUI.call(this);
	this.el = document.createElement("DIV");
	this.el.classList.add("circle");

	this.resize = function(size){
		this.el.style.width = size;
		this.el.style.height = size;
	}

	this.reposition = function(x,y){
		this.el.style.left= x;
		this.el.style.top = y;
	}

	this.el.style.position = "absolute";
}

function Logo(){
	ObjUI.call(this);
	this.el = document.createElement("IMG");
	this.el.classList.add("logo");
	this.el.src = "images/bistro.png"
}
