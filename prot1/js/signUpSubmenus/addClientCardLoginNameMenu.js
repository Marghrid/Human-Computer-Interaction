function AddClientCardLoginNameMenu() {
	UpperMenu.call(this, "Escolher Cartão Cliente");

	this.title.id = "ccln_title";
	var info_text = document.createElement("P");
	info_text.id = "ccln_info";
	info_text.appendChild(document.createTextNode("Escreva o nome no cartão:"));

	this.form = document.createElement("form");
	this.form.classList.add("smallForm");

	this.form.appendChild(document.createTextNode("Nome:"));
	this.inputUsername = document.createElement("input");
	this.inputUsername.classList.add("textInput");
	this.inputUsername.type = "text";
	this.form.appendChild(this.inputUsername);


	this.bottomButtons = new BottomButtons(1, 0, 1);

	this.imageWithName = document.createElement("DIV");
	if(currentUser.loginClientCard <=2){
		this.imageWithName.classList.add("blackCard");
	} else {
		this.imageWithName.classList.add("whiteCard");
	}


	this.img = document.createElement("img");
	this.img.src = getImage();
	this.img.id = "selectedCard";
	this.imageWithName.appendChild(this.img);

	var imgTxt = document.createElement("P");
	imgTxt.appendChild(document.createTextNode(""));
	imgTxt.id = "cardText";

	this.imageWithName.appendChild(imgTxt);
	
	var iwn = this.imageWithName;

	this.inputUsername.onkeyup = function(){
		iwn.removeChild(imgTxt);
		imgTxt = document.createElement("P");
		var str = this.value;
		imgTxt.appendChild(document.createTextNode(str.substring(0,16)));
		imgTxt.id = "cardText";
		iwn.appendChild(imgTxt);
	}

	

	var butt = this.bottomButtons.saveButton;

	this.el.appendChild(info_text);
	this.el.appendChild(this.form);
	this.el.appendChild(this.imageWithName);
	this.el.appendChild(this.bottomButtons.el);
}

function getImage(){
	return "images/bistroCard" + currentUser.loginClientCard + ".png";
}