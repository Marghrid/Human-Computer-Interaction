function CallTransportMenu(service) {
	Menu.call(this);

	var image = document.createElement("IMG");
	image.src = "images/" + service + ".png";


	var text = document.createElement("P");
	var time = Math.random()*14 + 2;
	text.appendChild(document.createTextNode("Carro " + service + " a " + time.toFixed(0) + " minutos daqui."));

	this.bottomButtons = new BottomButtons(1, 1, 0);

	this.el.classList.add("callTransportMenu");
	this.el.appendChild(image);
	this.el.appendChild(text);
	this.el.appendChild(this.bottomButtons.el);
}