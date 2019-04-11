function EntertainmentMenu() {
	Menu.call(this);

	var todayDIV = document.createElement("DIV");
	var p = document.createElement("P");
	p.appendChild(document.createTextNode("Hoje, no"));
	var img = document.createElement("IMG");
	img.src = "images/bistro.png";
	img.classList.add("bistroLogo");
	p.appendChild(img);
	p.appendChild(document.createTextNode(":"));
	p.classList.add("heading");
	todayDIV.appendChild(p);


	p = document.createElement("P");
	var img = document.createElement("IMG");
	img.src = "images/band1.jpg";
	img.classList.add("bandImg");
	p.appendChild(img);
	p.appendChild(document.createTextNode("Salvador Sobral ao vivo, às 21h"));
	p.classList.add("description");
	todayDIV.appendChild(p);

	var butt = document.createElement("DIV");
	butt.appendChild(document.createTextNode("Reservar mesa"));
	butt.classList.add("proceedButton");
	todayDIV.appendChild(butt);


	var tomorrowDIV = document.createElement("DIV");
	p = document.createElement("P");
	p.appendChild(document.createTextNode("Amanhã:"));
	p.classList.add("heading");
	tomorrowDIV.appendChild(p);


	p = document.createElement("P");
	img = document.createElement("IMG");
	img.src = "images/band2.jpg";
	img.classList.add("bandImg");
	p.appendChild(img);
	p.appendChild(document.createTextNode("David Fonseca ao vivo, às 21h30"));
	p.classList.add("description");
	tomorrowDIV.appendChild(p);

	var butt = document.createElement("DIV");
	butt.appendChild(document.createTextNode("Reservar mesa"));
	butt.classList.add("proceedButton");
	tomorrowDIV.appendChild(butt);

	this.el.classList.add("entertainmentMenu");
	this.el.appendChild(todayDIV);
	this.el.appendChild(tomorrowDIV);
}