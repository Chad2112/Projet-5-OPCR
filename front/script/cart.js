/* Recuperation du local storage au format JSON depuis le format string */
let produitPanier = JSON.parse(localStorage.getItem("Produit"));
/* Création d'une boucle pour recuperer tous les produit du panier
  et création des balise correspondante par nombre de produit dans le panier*/
for (i = 0; i < produitPanier.length; i++) {
  const productStorage = produitPanier[i];

  /* Création de toutes les balises nécessaire a l'affichage des produit*/
  const cartItem = document.getElementById("cart__items");
  const article = document.createElement("article");
  const imageContent = document.createElement("div");
  const image = document.createElement("img");

  const itemContent = document.createElement("div");
  const descriptionContent = document.createElement("div");
  const nameProduit = document.createElement("h2");
  const textColors = document.createElement("p");
  const textPrice = document.createElement("p");
  const contentSettings = document.createElement("div");
  const contentSettingsQuantity = document.createElement("div");
  const quantity = document.createElement("p");
  const inputQuantity = document.createElement("input");
  const contentDelete = document.createElement("div");
  const deleteItem = document.createElement("p");

  /* Ajout des attribut correspondant a leur balises respéctives, 
  et ajouts des noeud enfants aux noeud parents */
  cartItem.appendChild(article);
  article.setAttribute("data-id", `${productStorage["Id"]}`);
  article.setAttribute("data-colors", `${productStorage["colors"]}`);
  article.setAttribute("class", `cart__item`);

  article.appendChild(imageContent);
  imageContent.setAttribute("class", "cart__item__img");
  imageContent.appendChild(image);
  image.src = `${productStorage["img"]}`;
  image.setAttribute("alt", `${productStorage["altTxt"]}`);
  article.appendChild(itemContent);
  itemContent.setAttribute("class", "cart__item__content");
  itemContent.appendChild(descriptionContent);
  descriptionContent.setAttribute("class", "cart__item__content__description");
  descriptionContent.appendChild(nameProduit);
  nameProduit.innerText = productStorage.name;
  descriptionContent.appendChild(textColors);
  textColors.innerText = productStorage.colors;
  descriptionContent.appendChild(textPrice);
  itemContent.appendChild(contentSettings);
  contentSettings.setAttribute("class", "cart__item__content__settings");
  contentSettings.appendChild(contentSettingsQuantity);
  contentSettingsQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  contentSettingsQuantity.appendChild(quantity);
  quantity.setAttribute("id", "textQuantity");
  quantity.innerText = `Qté :  ${productStorage.quantity} `;
  contentSettingsQuantity.appendChild(inputQuantity);
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("class", "itemQuantity");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", `100`);
  inputQuantity.setAttribute("value", `${productStorage.quantity}`);
  contentSettings.appendChild(contentDelete);
  contentDelete.setAttribute("class", "cart__item__content__settings__delete");
  contentDelete.appendChild(deleteItem);
  deleteItem.setAttribute("class", "deleteItem");
  deleteItem.innerText = "Supprimer";
  console.log(productStorage.quantity);
}

const input = document.querySelectorAll(".itemQuantity");
const quantityText = document.querySelectorAll("#textQuantity");

console.log(quantityText);

console.log(produitPanier);
// Changement de la quantité d'un produit au click //
// .. création d'un boucle qui recupère tout les inputs de la page //
for (i = 0; i < input.length; i++) {
  /* Création d'un evenement au click qui lorsque la quantité est modifier sur ..
  .. l'input elle est également modifier dans le locale storage en direct */
  input[i].addEventListener("click", () => {
    /* Création d'un boucle qui récupere l'index du locale storage 
    pour accéder à la quantité de chaque produit*/
    for (let i = 0; i < produitPanier.length; i++) {
      if (produitPanier[i].quantity != Number(input[i].value)) {
        produitPanier[i].quantity = 0;
        produitPanier[i].quantity += Number(input[i].value);

        /* le resultat est renvoyer au local storage*/
        localStorage.setItem("Produit", JSON.stringify(produitPanier));
        console.log(Number(input[i].value));
        for (i = 0; i < quantityText.length; i++) {
          quantityText[i].innerText = `Qté : ${Number(input[i].value)}`;
        }
      }
    }
  });
}
/* Création d'un boucle pour récuperer toutes les quantité de chaque produit 
et ainsi l'ajouter dans la variable sum qui stockera le total de tous les 
  produits */
let sum = 0;
for (i = 0; i < produitPanier.length; i++) {
  sum += produitPanier[i].quantity;
}
/* Ajout du total de la quantité sous forme de texte dans la balise correspondante */
const totalQuantity = document.getElementById("totalQuantity");
totalQuantity.innerText = sum;
