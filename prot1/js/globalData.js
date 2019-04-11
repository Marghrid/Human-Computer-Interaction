
var users = new Array();
var currentUser = null;

function User(name) {
	this.name = name;

	this.loginFingerprint = false;
	this.loginSmartphone  = false;
	this.loginClientCard  = false;

	this.loginName = "";
	this.loginPassword = "";

	this.nif = 0;
	this.invoiceName = "";
	this.invoiceAdress = "";

	this.addresses = new Array();
	this.transportsAccounts = new Array();
	this.paymentMethods = new Array();
	this.favoriteDishes = new Array();
	this.foodRestrictions = [false, false, false, false, false, false];
}

function Address(name, local) {
	this.name = name;
	this.local = local;
}

function TransportsAccount(service, username, password) {
	this.service = service;
	this.username = username;
	this.password = password;
}

function CardPayment(service, cardNumber) {
	this.service = service;
	this.cardNumber = cardNumber;
}

function OtherPayment(service, username, password) {
	this.service = service;
	this.username = username;
	this.password = password;
}

function Dish(name, image, description, allergenics, toggleble_ingredients, price){
	this.name = name;
	this.image = image;
	this.description = description;
	this.allergenics = allergenics;
	this.toggleble_ingredients = toggleble_ingredients;
	this.price = price;
}

// Default user:
var margarida = new User("Margarida");
margarida.addresses.push(new Address("Casa", "Rua Francisco Casal, 35, Barreiro"));
margarida.addresses.push(new Address("Técnico", "Rua Rovisco Pais, 1, Lisboa"));
margarida.transportsAccounts.push(new TransportsAccount("Cabify", "MagFer96", "cabicabi"));
margarida.loginFingerprint = true;
margarida.foodRestrictions[0] = true;

users.push(margarida);

var availableTransports = ["Uber", "Cabify", "mytaxi"];
var availableCardPayments = ["Visa", "Mastercard", "Maestro"];
var availableOtherPayments = ["Paypal"];


var carnes = new Array();
carnes.push(new Dish("Bife da Vazia", "images/dishes/bifeDaVazia.png",
                      "Este belo bife da vazia dá a maior satisfação a todos os nossos clientes. A tradição que lhe é associada faz todos os nossos clientes felizes.",
                      [0, 1], ["Batatas Fritas"], 8));
