function AddSmartphoneLoginMenu() {
	UpperMenu.call(this, "Adicionar smartphone");

	var info_text = document.createElement("P");
	info_text.appendChild(document.createTextNode("Selecione seu smartphone:"));

	var smartphones = document.createElement("TABLE");
	smartphones.id = "smartphones_table";

	var tr = document.createElement("TR");
	var tdUser = document.createElement("TD");
	tdUser.appendChild(document.createTextNode(currentUser.name + "'s phone"));
	tdUser.classList.add("smartphone_td");
	tr.appendChild(tdUser);
	smartphones.appendChild(tr);

	var tr = document.createElement("TR");
	var tdRaquel = document.createElement("TD");
	tdRaquel.appendChild(document.createTextNode("Raquel's phone"));
	tdRaquel.classList.add("smartphone_td");
	if(currentUser.name != "Raquel") {
		tr.appendChild(tdRaquel);
		smartphones.appendChild(tr);
	}
	
	var tr = document.createElement("TR");
	var tdJoao = document.createElement("TD");
	tdJoao.appendChild(document.createTextNode("João's phone"));
	tdJoao.classList.add("smartphone_td");
	if(currentUser.name != "João") {
		tr.appendChild(tdJoao);
		smartphones.appendChild(tr);
	}

	var selected = tdUser;
	tdUser.classList.add("selected");

	tdUser.onclick = function() {
		selected.classList.remove("selected");
		selected = tdUser;
		selected.classList.add("selected");
	}

	tdRaquel.onclick = function() {
		selected.classList.remove("selected");
		selected = tdRaquel;
		selected.classList.add("selected");
	}

	tdJoao.onclick = function() {
		selected.classList.remove("selected");
		selected = tdJoao;
		selected.classList.add("selected");
	}

	this.bottomButtons = new BottomButtons(1, 0, 1);

	this.el.appendChild(info_text);
	this.el.appendChild(smartphones);
	this.el.appendChild(this.bottomButtons.el);
}