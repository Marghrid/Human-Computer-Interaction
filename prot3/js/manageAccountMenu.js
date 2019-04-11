function ManageAccountMenu() {
	UpperMenu.call(this, "Gerir conta");

	this.first_row = document.createElement("div");
	this.first_row.classList.add("row");

	this.second_row = document.createElement("div");
	this.second_row.classList.add("row");

	// On the first row:

	this.moradas    = new ImageWCaption("images/moradas.png", "Moradas e transportes");
	this.pagamentos = new ImageWCaption("images/icon_paymentMethods.png", "Métodos de pagamento");
	this.faturas    = new ImageWCaption("images/icon_invoice.png", "Faturação");

	this.first_row.appendChild(this.moradas.el);
	this.first_row.appendChild(this.pagamentos.el);
	this.first_row.appendChild(this.faturas.el);

	//On the second row:

	this.login       = new ImageWCaption("images/login.png",      "Métodos de login");
	this.restricoes  = new ImageWCaption("images/restricoes.png", "Restrições alimentares");
	/*this.favoritos   = new ImageWCaption("images/icon_favorites.png",  "Pratos favoritos");*/

	this.second_row.appendChild(this.login.el);
	this.second_row.appendChild(this.restricoes.el);
	/*this.second_row.appendChild(this.favoritos.el);*/

	this.el.appendChild(this.first_row);
	this.el.appendChild(this.second_row);
}
