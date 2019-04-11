function UpperMenu(title) {
	Menu.call(this);

	this.title = document.createElement("div");
	this.title.appendChild(document.createTextNode(title));
	this.title.classList.add("title");
	this.el.appendChild(this.title);

}

function ImageWCaption(image_src, caption) {
	this.el = document.createElement("div");
	this.el.classList.add("imageWCaption");
	
	this.image = document.createElement("IMG");
	this.image.src = image_src;
	this.el.appendChild(this.image);

	this.caption = document.createElement("P");
	this.caption.appendChild(document.createTextNode(caption));
	this.caption.classList.add("noselect");
	this.el.appendChild(this.caption);

	this.disabled = false;
	this.toggle = function() {
		if(this.disabled) {
			this.el.classList.remove("disabled");
			this.el.onclick = this.clickFunction;

		} else {	
			this.el.classList.add("disabled");
			this.clickFunction = this.el.onclick;
			this.el.onclick = function(){}
		}
		this.disabled = !this.disabled;
	}
}

function BottomButton(text) {
	this.el = document.createElement("div");
	this.el.appendChild(document.createTextNode(text));
	this.el.classList.add("noselect");

	this.disabled = false;
	this.toggle = function() {
		if(this.disabled) {
			this.el.classList.remove("disabled");
			this.el.onclick = this.clickFunction;

		} else {	
			this.el.classList.add("disabled");
			this.clickFunction = this.el.onclick;
			this.el.onclick = function(){}
		}
		this.disabled = !this.disabled;
	}

}

function CompactProceedButton() {
	BottomButton.call(this, ">>");
	this.el.classList.add("proceedButton");
}

function ProceedButton() {
	BottomButton.call(this, "CONTINUAR >>");
	this.el.classList.add("proceedButton");
}

function SaveButton() {
	BottomButton.call(this, "GUARDAR >>");
	this.el.classList.add("saveButton");
}

function CompactBackButton() {
	BottomButton.call(this, "<<");
	this.el.classList.add("backButton");
}

function BackButton() {
	BottomButton.call(this, "<< VOLTAR");
	this.el.classList.add("backButton");
}

/*  back, proceed, save:
 *   if = 1 show normal version of this button
 *   if = 2 show compact version of this button
 *   else   do not show this button
 */
function BottomButtons(/*close, */back, proceed, save) {
	this.el = document.createElement("div");
	this.el.classList.add("bottomButtons");

	if(back == 1) {
		this.backButton = new BackButton();
		this.backButton.disabled = false;
		this.el.appendChild(this.backButton.el);
	}

	else if(back == 2) {
		this.backButton = new CompactBackButton();
		this.backButton.disabled = false;
		this.el.appendChild(this.backButton.el);
	}

	if(proceed == 1) {
		this.proceedButton = new ProceedButton();
		this.proceedButton.disabled = false;
 		this.el.appendChild(this.proceedButton.el);
	}

	else if(proceed == 2) {
		this.proceedButton = new CompactProceedButton();
		this.proceedButton.disabled = false;
		this.el.appendChild(this.proceedButton.el);
	}

	if(save == 1) {
		this.saveButton = new SaveButton();
		this.saveButton.disabled = false;
		this.el.appendChild(this.saveButton.el);
	}
}