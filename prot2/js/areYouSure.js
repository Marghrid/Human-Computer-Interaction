function AreYouSure(msg) {
	UpperMenu.call(this, "");
	this.el.removeChild(this.title);

	this.text = document.createElement("P");
	this.text.appendChild(document.createTextNode(msg));
	this.text.classList.add("success_txt");

	this.bottomButtons = new BottomButtons(0, 0, 0);
	this.noButton  = new BottomButton("<< Não");
	this.yesButton = new BottomButton("Sim >>");
	this.yesButton.el.classList.add("proceedButton");
	this.noButton.el.classList.add("backButton");
	this.bottomButtons.el.appendChild(this.noButton.el);
	this.bottomButtons.el.appendChild(this.yesButton.el);

	this.el.appendChild(this.text);
	this.el.appendChild(this.bottomButtons.el);
}