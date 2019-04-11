function GamesMenu(){
	Menu.call(this);
	this.el.classList.add("gamesMenu");

	var img, text;
	
	this.icon = new Array();

	this.icon[0] = document.createElement("DIV");
	this.icon[0].classList.add("gamesContainer");
	img = document.createElement("IMG");
	img.src = "images/youtube2.png";
	img.classList.add("gameImage");
	text = document.createElement("span");
	text.appendChild(document.createTextNode("YouTube"));
	text.classList.add("gameText");
	this.icon[0].appendChild(img);
	this.icon[0].appendChild(text);

	this.icon[1] = document.createElement("DIV");
	this.icon[1].classList.add("gamesContainer");
	img = document.createElement("IMG");
	img.src = "images/pong.png";
	img.classList.add("gameImage");
	text = document.createElement("span");
	text.appendChild(document.createTextNode("Pong"));
	text.classList.add("gameText");
	this.icon[1].appendChild(img);
	this.icon[1].appendChild(text);


	this.icon[2] = document.createElement("DIV");
	this.icon[2].classList.add("gamesContainer");
	img = document.createElement("IMG");
	img.src = "images/more.png";
	img.classList.add("gameImage");
	text = document.createElement("span");
	text.appendChild(document.createTextNode("Mais..."));
	text.classList.add("gameText");
	this.icon[2].appendChild(img);
	this.icon[2].appendChild(text);


	this.icons = document.createElement("DIV");
	this.icons.classList.add("gameIcons");

	this.icons.appendChild(this.icon[0]);
	this.icons.appendChild(this.icon[1]);
	this.icons.appendChild(this.icon[2]);
	this.el.appendChild(this.icons);

}