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

function CardPayment(service, n1, n2, n3, n4, sn) {
	this.service = service;
	this.n1 = n1;
	this.n2 = n2;
	this.n3 = n3;
	this.n4 = n4;
	this.sn = sn;
}

function OtherPayment(service, username, password) {
	this.service = service;
	this.username = username;
	this.password = password;
}



// Default user:
var margarida = new User("Margarida");
margarida.addresses.push(new Address("Casa",             "Rua Francisco Casal, 35, Barreiro"));
margarida.addresses.push(new Address("Técnico",          "Rua Rovisco Pais, 1, Lisboa"));
margarida.addresses.push(new Address("Trabalho",         "Rua Morais Soares, 16A, Lisboa"));
margarida.addresses.push(new Address("Casa Do Namorado", "Rua Pascoal de Melo, 14, Lisboa"));

margarida.transportsAccounts.push(new TransportsAccount("Cabify", "MagFer96", "cabicabi"));
margarida.paymentMethods.push(new CardPayment("Maestro", 1234, 5432, 3456, 7654, 890));
margarida.loginFingerprint = true;
margarida.foodRestrictions[0] = true;

users.push(margarida);

var availableTransports = ["Uber", "Cabify", "mytaxi"];
var availableCardPayments = ["Visa", "Mastercard", "Maestro"];
var availableOtherPayments = ["Paypal"];

var carnes = new Array();
var peixe = new Array();
var entradas = new Array();
var sobremesas = new Array();
var bebidas = new Array();
