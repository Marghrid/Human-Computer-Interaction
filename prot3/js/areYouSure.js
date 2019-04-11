function AreYouSure(msg) {
	UpperMenu.call(this, "");
	this.el.removeChild(this.title);

	this.text = document.createElement("P");
	this.text.appendChild(document.createTextNode(msg));

	this.bottomButtons = new BottomButtons(0, 0, 0);
	this.noButton  = new BottomButton("NÃO");
	this.yesButton = new BottomButton("SIM");
	this.yesButton.el.classList.add("saveButton");
	this.yesButton.el.style.backgroundColor = "#900000";
	this.noButton.el.classList.add("backButton");
	this.bottomButtons.el.appendChild(this.noButton.el);
	this.bottomButtons.el.appendChild(this.yesButton.el);

	this.el.classList.add("areYouSure");
	this.el.appendChild(this.text);
	this.el.appendChild(this.bottomButtons.el);
}