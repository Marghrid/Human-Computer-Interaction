function AddClientCardLoginDesignMenu() {
	UpperMenu.call(this, "Escolher Cartão Cliente");
	this.bottomButtons = new BottomButtons(1, 1, 0);

	this.title.id = "ccld_title";

	var info_text = document.createElement("P");
	info_text.appendChild(document.createTextNode("Escolha o seu design preferido:"));
	info_text.id = "ccld_info";

	var designCards = new DesignCardSet(this.bottomButtons.proceedButton);	

	

	

	this.bottomButtons.proceedButton.toggle();

	this.el.appendChild(info_text);
	this.el.appendChild(designCards.el);
	this.el.appendChild(this.bottomButtons.el);
}

function DesignCardSet(butt){
	this.cards = new Array();
	this.butt = butt;
	this.cards.push(new DesignCard("images/bistroCard1.png",0, this));
	this.cards.push(new DesignCard("images/bistroCard2.png",1, this));
	this.cards.push(new DesignCard("images/bistroCard3.png",2, this));
	this.cards.push(new DesignCard("images/bistroCard4.png",3, this));

	this.el = document.createElement("DIV");
	this.el.appendChild(this.cards[0].el);
	this.el.appendChild(this.cards[1].el);
	this.el.appendChild(this.cards[2].el);
	this.el.appendChild(this.cards[3].el);
	this.selectedButton = -1;

	this.select = function(cardN){
		if(this.selectedButton == -1){
			this.butt.toggle();
		}
		currentUser.loginClientCard = cardN+1;
		this.selectedButton = cardN;
		for(var i = 0; i<this.cards.length; i++){
			if(this.cards[i].selected){
				this.cards[i].toggle();
			}
		}

		this.cards[cardN].toggle();
	}
}

function DesignCard(url, n, cardSet){
	this.el = document.createElement("IMG");
	this.el.classList.add("designCard");
	this.el.src = url;
	this.url = url;
	this.el.n = n;
	this.el.cardSet = cardSet;

	this.el.onclick = function(){
		this.cardSet.select(this.n);
	}

	this.toggle = function(){
		if(!this.selected){
			this.el.classList.add("selected");
		} else {
			this.el.classList.remove("selected");
		}

		this.selected = !this.selected;
	}
	this.selected = false;
	
}