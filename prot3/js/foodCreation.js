function Dish(name, image, description, allergenics, toggleble_ingredients, price){
	this.name = name;
	this.image = image;
	this.description = description;
	this.allergenics = allergenics;
	this.toggleble_ingredients = toggleble_ingredients;
	this.price = price;
}

/*carnes.push(new Dish("Bife da Vazia", "images/dishes/bifeDaVazia.png",
                      "Este belo bife da vazia dá a maior satisfação a todos os nossos clientes. A tradição que lhe é associada faz todos os nossos clientes felizes.",
                      [0, 1], ["Batatas Fritas"], 8));*/

carnes.push(new Dish("Bife Frango", "images/dishes/bifeDeFrango.jpg",
	        "Frango do campo, grelhado sem gordura, e com baixa quantidade de sal.",
	        [0,0,0,0,0], ["Arroz", "Ovo Estrelado","Salada"], 7));

carnes.push(new Dish("Lasanha", "images/dishes/lasanhaCarne.jpg",
	        "A lasanha é uma receita tipicamente italiana, feita com carne e molho de tomate sobre camadas de folhas de lasanha e molho bechamel. Uma refeição deliciosa para toda a família.",
	        [0,0,1,0,1], [], 7.5));

carnes.push(new Dish("Bife Vaca", "images/dishes/bifeDeVaca.jpg",
	        "Com carne de vaca de alta qualidade, importada dos Açores, cozinhada no ponto.",
	        [0,0,0,1,0], ["Batatas Fritas","Ovo Estrelado","Salada"], 8.5));

carnes.push(new Dish("Hamburguer", "images/dishes/hamburguer.jpg",
	        "Tem hamburguer de Vaca",
	        [0,0,0,0,0], ["Tomate", "Alface","Batatas Fritas"], 7.5));

carnes.push(new Dish("Rolo de Carne", "images/dishes/roloDeCarne.jpg",
	        "Tem rolo de Carne",
	        [0,0,0,0,0], ["Arroz","Batatas Fritas","Salada"], 7));

carnes.push(new Dish("Empadas", "images/dishes/empadasDeGalinha.jpg",
	        "Estas deliciosas são uma boa ideia para um jantar descontraído e informal.",
	        [0,0,0,0,0], ["Arroz","Batatas Fritas","Salada"], 5.5));

/* ENTRADAS */
entradas.push(new Dish("Azeitonas", "images/dishes/azeitonas.jpg",
	        "A azeitona verde, carnuda, é tratada pelo sal durante vários meses.",
	        [0,0,0,0,0], [], 1));

entradas.push(new Dish("Queijo Fresco", "images/dishes/queijoFresco.jpg",
	        "Cremoso, ligeiramente consistente, obtido por ultra-filtração do leite. Ideal para saladas e aperitivos ",
	        [0,0,1,0,0], [], .7));

entradas.push(new Dish("Pão", "images/dishes/pao.jpg",
	        "Pão branco, assado no próprio dia e servido quente.",
	        [0,0,0,0,0], ["Manteiga", "Paté", "Doce de cereja"], 0.5));

entradas.push(new Dish("Pão de Alho", "images/dishes/paoDeAlho.jpg",
	        "Pão tradicional com sabor inconfundível. A textura da massa, combinada ao delicioso creme de alho, faz dele a escolha perfeita para aperitivos e entradas.",
	       [0,0,0,0,1], ["Manteiga"], 1));

entradas.push(new Dish("Camarões", "images/dishes/camaroes.jpg",
	        "Uma boa entrada.",
	        [0,0,0,0,0], [], 5));

/* PEIXE */
peixe.push(new Dish("Salmão", "images/dishes/salmao.jpg",
	        "Da Noruega chega-nos o salmão mais fresco, que se traduz num sabor adorado por muitos, rico em proteínas e vitaminas.",
	        [0,0,0,0,0], ["Batatas a Murro", "Ovo Cozido","Salada"], 9));

peixe.push(new Dish("Sushi", "images/dishes/sushi.jpg",
	        "O peixe está cru",
	        [0,0,0,0,0], ["Batatas", "Batatas a Murro","Salada"], 9.5));

peixe.push(new Dish("Sardinhas", "images/dishes/sardinhas.jpg",
	        "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
	        [0,0,0,0,0], ["Batatas a Murro", "Ovo Cozido","Salada"], 7));

peixe.push(new Dish("Bacalhau", "images/dishes/bacalhau.jpg",
	        "O melhor e mais suculento bacalhau que chega à sua mesa.",
	        [0,0,0,1,0], ["Batatas a Murro", "Ovo Cozido","Salada"], 8.5));

peixe.push(new Dish("Dourada", "images/dishes/dourada.jpg",
	        "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
	        [0,0,0,0,0], ["Batatas a Murro", "Ovo Cozido","Salada"], 8));

peixe.push(new Dish("Arroz De Marisco", "images/dishes/arrozDeMarisco.jpg",
	        "Prato tradicional, tem origem na região da Marinha Grande e foi nomeado uma das 7 Maravilhas da Gastronomia de Portugal.",
	        [0,0,0,1,0], ["Batatas a Murro", "Ovo Cozido","Salada"], 8.5));

/* BEBIDAS */
bebidas.push(new Dish("Coca-Cola", "images/dishes/cocaCola.jpg",
	        "A de sempre, original e deliciosa, que refresca milhões de pessoas em todo o mundo.",
	        [0,0,0,0,0], [], 1.2));

bebidas.push(new Dish("Fanta", "images/dishes/fanta.jpg",
	        "Cores alegres, sabor de frutas, muitos deles exóticos, embalagens modernas e um pouco de gás. Some-se ainda uma comunicação ousada e divertida.",
	        [0,0,0,0,0], [], 1.2));

bebidas.push(new Dish("Água", "images/dishes/agua.jpg",
	        "Água Glaciar engarrafada na Serra da Estrela foi reconhecida como uma das melhores do mundo.",
	        [0,0,0,0,0], [], 1));
bebidas.push(new Dish("Nestea", "images/dishes/iceTea.jpg",
					"Simples ou com um toque especial. Tem uma nova experiência quando a beber.",
					[0,0,0,0,0], [], 1));

bebidas.push(new Dish("Vinho", "images/dishes/vinho.jpg",
	        "A Bacalhôa Vinhos de Portugal, S.A., uma das maiores e mais inovadoras empresas vinícolas em Portugal.",
	        [0,0,0,0,0], [], 30));

bebidas.push(new Dish("Cerveja", "images/dishes/cerveja.jpg",
	        "A tua cerveja de sempre para todos os momentos, uma companhia perfeita para as refeições.",
	        [0,0,0,0,0], [], 1.5));

/* SOBREMESAS */
sobremesas.push(new Dish("Gelado", "images/dishes/gelado.jpg",
	        "Um prato que se serve frio",
	        [0,0,1,0,1], [], 1));

sobremesas.push(new Dish("Panquecas", "images/dishes/panquecas.jpg",
	        "As panquecas são uma especialidade do fim-de-semana.",
	        [0,0,0,0,0], [], 2));

sobremesas.push(new Dish("Pudim", "images/dishes/pudim.jpg",
	        "Há quem meça o valor dos doces pela quantidade de ovos que levam. Este leva nem mais nem menos que 12 gemas e é, simplesmente, magnífico.",
	        [0,0,0,0,0], [], 1.2));

sobremesas.push(new Dish("Mousse de Chocolate", "images/dishes/mousseDeChocolate.jpg",
	        "Receita em que se usa azeite em vez de manteiga é uma autêntica tentação. Experimente e poderá comprovar por si próprio.",
	        [0,0,0,0,0], [], 1));

sobremesas.push(new Dish("Tarte Amendoa", "images/dishes/tarteDeAmendoa.jpg",
	        "Receita caseira usa apenas ingredientes tradicionais, o que a torna ainda mais gulosa. Uma deliciosa sobremesa para a sua mesa de Páscoa.",
	        [0,0,0,0,0], [], 1.1));

sobremesas.push(new Dish("Tarte Morango", "images/dishes/tarteDeMorango.jpg",
	        "Receita caseira usa apenas ingredientes tradicionais, o que a torna ainda mais gulosa. Uma deliciosa sobremesa para a sua mesa de Páscoa.",
	        [0,0,0,0,0], [], 1.1));
