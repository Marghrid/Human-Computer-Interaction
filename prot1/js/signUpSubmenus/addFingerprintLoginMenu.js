function AddFingerprintLoginMenu() {
	UpperMenu.call(this, "Adicionar impressão digital");

	var all_div = document.createElement("DIV");
	all_div.id = "add_fingerprint_all_div";
	this.fingerprint = document.createElement("IMG");
	this.fingerprint.src = "images/fingerprint.png";
	this.fingerprint.id = "add_fingerprint_img";
	all_div.appendChild(this.fingerprint);

	var info_text = document.createElement("P");
	info_text.appendChild(document.createTextNode("Coloque o dedo sobre o ícone durante 5 segundos"));
	info_text.id = "add_fingerprint_txt"
	all_div.appendChild(info_text);

	this.bottomButtons = new BottomButtons(1, 0, 0);

	this.el.appendChild(all_div);
	this.el.appendChild(this.bottomButtons.el);
}