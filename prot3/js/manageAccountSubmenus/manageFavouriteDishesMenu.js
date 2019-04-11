function ManageFavouriteDishesMenu() {
	UpperMenu.call(this, "Pratos Favoritos");

	this.bottomButtons = new BottomButtons(1, 0, 0);
	this.el.appendChild(this.bottomButtons.el);
}