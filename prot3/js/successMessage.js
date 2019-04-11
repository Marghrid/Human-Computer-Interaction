function SuccessMessage(msg) {
	UpperMenu.call(this, "");
	this.el.removeChild(this.title);

	this.text = document.createElement("P");
	this.text.appendChild(document.createTextNode(msg));

	this.image = document.createElement("IMG");
	this.image.src = "images/success.png";

	this.bottomButtons = new BottomButtons(0, 1, 0);

	this.el.classList.add("successMessage");
	this.el.appendChild(this.text);
	this.el.appendChild(this.image);
	this.el.appendChild(this.bottomButtons.el);
}