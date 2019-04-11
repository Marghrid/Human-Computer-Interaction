function ManageFoodRestrictionsMenu() {
	UpperMenu.call(this, "Restrições alimentares");

	let warningCheckboxes = new Array();
	let removeCheckboxes = new Array();

	let table = document.createElement("TABLE");
	let tr = document.createElement("TR");
	let td = document.createElement("TH");
	td.appendChild(document.createTextNode("Alergénios"));
	td.classList.add("firstCol");
	tr.appendChild(td);
	td = document.createElement("TH");
	td.appendChild(document.createTextNode("Mostrar aviso"));
	td.classList.add("secondCol");
	tr.appendChild(td);
	td = document.createElement("TH");
	td.classList.add("thirdCol");
	td.appendChild(document.createTextNode("Remover da ementa"));
	tr.appendChild(td);
	table.appendChild(tr);

	let alerg = ["Frutos secos", "Ovos", "Lacticínios", "Elevado teor de sal", "Glúten"];
	
	for(let i = 0; i < alerg.length; ++i) {
		tr = document.createElement("TR");
		
		td = document.createElement("TD");
		td.classList.add("firstCol");
		td.appendChild(document.createTextNode(alerg[i]));
		tr.appendChild(td);

		td = document.createElement("TD");
		td.classList.add("secondCol");
		let input = document.createElement("INPUT");
		input.type = "checkbox";
		if(currentUser.foodRestrictions[i] == 1) {
			input.checked = true;
		}
		warningCheckboxes.push(input);
		td.appendChild(input);
		tr.appendChild(td);

		td = document.createElement("TD");
		td.classList.add("thirdCol");
		input = document.createElement("INPUT");
		input.type = "checkbox";
		if(currentUser.foodRestrictions[i] == 2) {
			warningCheckboxes[i].disabled = true;
			input.checked = true;
		}
		removeCheckboxes.push(input);
		td.appendChild(input);
		tr.appendChild(td);

		table.appendChild(tr);
	}

	this.toSave = new Array();

	for( let i = 0; i < currentUser.foodRestrictions.length; ++i) {
		this.toSave.push(currentUser.foodRestrictions[i]);
	}

	let menu = this;

	for(let i = 0; i < this.toSave.length; ++i) {
		warningCheckboxes[i].onchange = function() {
			if (warningCheckboxes[i].checked)
				menu.toSave[i] = 1;
			else
				menu.toSave[i] = 0;
		}

		removeCheckboxes[i].onchange = function() {
			if(removeCheckboxes[i].checked) {
				menu.toSave[i] = 2;
				warningCheckboxes[i].disabled = true;
			}

			else if(warningCheckboxes[i].checked) {
				menu.toSave[i] == 1;
				warningCheckboxes[i].disabled = false;
			}

			else {
				menu.toSave[i] == 0;
				warningCheckboxes[i].disabled = false;
			}
		}
	}

	this.bottomButtons = new BottomButtons(1, 0, 1);

	this.el.classList.add("manageFoodRestrictionsMenu");
	this.el.appendChild(table);
	this.el.appendChild(this.bottomButtons.el);
}