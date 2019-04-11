function InformationNotSavedSuccessfully(msg) {
	UpperMenu.call(this, "");
	this.el.removeChild(this.title);

	this.text = document.createElement("P");
	this.text.appendChild(document.createTextNode(msg));
	this.text.classList.add("success_txt");

	this.image = document.createElement("IMG");
	this.image.src = "images/failure.png";
	this.image.classList.add("success_img");

	this.bottomButtons = new BottomButtons(1, 0, 0);

	this.el.appendChild(this.text);
	this.el.appendChild(this.image);
	this.el.appendChild(this.bottomButtons.el);
}