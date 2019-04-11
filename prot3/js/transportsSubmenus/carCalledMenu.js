function CarCalledMenu(service) {
	Menu.call(this);
	var image = document.createElement("IMG");
	image.src = "images/" + service + ".png";

	var infoText = document.createElement("P");
	infoText.appendChild(document.createTextNode("O seu carro " + service + " já vem a caminho"));

	this.el.appendChild(image);
	this.el.appendChild(infoText);
}