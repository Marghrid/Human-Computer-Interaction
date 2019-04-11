function /* brace yourselves */WaiterIsComing() {
	UpperMenu.call(this, "");
	this.el.removeChild(this.title);

	var text = document.createElement("P");
	text.appendChild(document.createTextNode("Um empregado deslocar\u2011se\u2011á à sua mesa dentro de momentos."));

	var img_i = Math.random() + 1;
	img_i = img_i.toFixed(0);
	var image = document.createElement("IMG");
	image.src = "images/waiter" + img_i + ".png";

	this.cancelButton = new BottomButton("<< CANCELAR");
	this.cancelButton.el.classList.add("cancelButton");
	this.cancelButton.el.classList.add("backButton");

	this.bottomButtons = new BottomButtons(0, 0, 0);

	this.bottomButtons.el.appendChild(this.cancelButton.el);

	this.el.classList.add("waiterIsComing");
	this.el.appendChild(text);
	this.el.appendChild(image);
	this.el.appendChild(this.bottomButtons.el);
}