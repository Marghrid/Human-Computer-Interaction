function init() {
	'use strict';
	
	var bb = document.createElement("DIV");
	bb.style.position = "absolute";
	bb.style.width = "1940px";
	bb.style.height = "1000px";
	bb.style.borderWidth = "2px";
	bb.style.borderStyle = "solid";
	bb.style.borderColor = "black";
	
	document.body.appendChild(bb);

	var lLDocker = new LeftDocker();
	lLDocker.addButtonSlot(new ButtonSlot("PEDIR MAIS"));
	//lLDocker.buttonSlots[0].menu = new FoodMenu();
	// this is not working because we're not adding the foodmenu as a child of the buttonslot in html

	lLDocker.addButtonSlot(new ButtonSlot("ENTRETENIMENTO"));
	lLDocker.addButtonSlot(new ButtonSlot("JOGOS & APPS"));

	lLDocker.move(3, 3);
	lLDocker.appendFrom(bb);

	var lRDocker = new RightDocker();
	lRDocker.addButtonSlot(new ButtonSlot("TRANSPORTES"));
	lRDocker.addButtonSlot(new ButtonSlot("TERMINAR REFEIÇÃO"));
	lRDocker.addButtonSlot(new ButtonSlot("PAGAR"));

	var plate = new Circle();
	var cup = new Circle();

	plate.reposition("600px", "200px");
	plate.resize("700px");

	cup.reposition("1200px", "50px");
	cup.resize("200px");

	bb.appendChild(plate.el);
	bb.appendChild(cup.el);

	var logo = new Logo();
	bb.appendChild(logo.el);

	lRDocker.move(150, 3);

	lRDocker.appendFrom(bb);

	var uLDocker = new UpperDocker();
	//uLDocker.addButtonSlot(new ButtonSlot("Criar conta"));
	uLDocker.move(150, 3);
	uLDocker.appendFrom(bb);

	initialFoodMenu(lLDocker);

	initialUpperDocker(uLDocker);
}
