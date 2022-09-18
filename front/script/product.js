// Récuperation de l'ID correspondant au produit pour chaque page produit//
const IDProduit = window.location.search.split("?id=").join("");
// Recuperation des balises html //
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const select = document.getElementById("colors");
const itemImg = document.querySelector(".item__img");
const imageProduit = document.createElement("img");
const quantity = document.getElementById("quantity");
const addCart = document.getElementById("addToCart");
const miniBasketText = document.querySelector(".cartQuantity");

// Requête fetch de type get avec l'ID du produit pour afficher le produit selectionner par l'utilisateur//
fetch(`http://localhost:3000/api/products/${IDProduit}`)
  .then((res) => res.json())
  // En cas d'echec de la requete fetch une alert est renvoyer//
  .catch((error) => {
    alert("Connection impossible avec le serveur");
  })
  // La réponse est récuperer et stocké dans la const pageProduit //
  .then((dataProduit) => {
    const pageProduit = dataProduit;
    // Affichage de toute les caractéristiques du produit dans les balises correspondante //
    itemImg.appendChild(imageProduit);
    imageProduit.src = pageProduit.imageUrl;
    imageProduit.alt = pageProduit.altTxt;
    title.innerText = pageProduit.name;
    price.innerText = pageProduit.price;
    description.innerText = pageProduit.description;
    let colors = pageProduit.colors;
    // Création d'un boucle pour récuperer toutes les couleur du produit et l'afficher dans le selecteur //
    for (i = 0; i < colors.length; i++) {
      let diffColors = colors[i];
      let optionValue = document.createElement("option");
      optionValue.innerText = `${diffColors}`;
      optionValue.value = `${diffColors}`;
      select.appendChild(optionValue);
      console.log(diffColors);
    }
  });
// Creation d'une fonction qui affiche le total d'articles dans un mini panier a coté du lien "panier"//
function totalInBasket() {
  let storage = JSON.parse(localStorage.getItem("Produit"));
  if (storage != null) {
    let totalQuantityInCart = 0;
    totalQuantityInCart += storage.length;
    miniBasketText.innerText = `${totalQuantityInCart}`;
  } else {
    miniBasketText.innerText = "0";
  }
}

// Création d'un event au click pour créée l'objet de la commande et l'envoyer au local storage //
addCart.addEventListener("click", () => {
  let idProduct = IDProduit;
  let colorsProduct = select.value;
  let quantityProduct = Number(quantity.value);
  let order = {
    Id: idProduct,
    name: title.innerText,
    colors: colorsProduct,
    quantity: quantityProduct,
    img: imageProduit.src,
    description: description.innerText,
    price: price.innerText,
  };

  // Function qui renvoi une alerte en cas de quantité ou de couleur non definie //
  function orderError() {
    if (colorsProduct == "" && (quantityProduct < 1 || quantityProduct > 100)) {
      alert("Veuillez selectionner une couleur ainsi qu'une quantité");
      return true;
    } else if (quantityProduct < 1 || quantityProduct > 100) {
      alert("Veuillez rentrer une quantité valide ( comprise entre 1 et 100 )");
      return true;
    } else if (quantityProduct >= 1 && quantityProduct <= 100 && colorsProduct == "") {
      alert("Veuillez selectionner une couleur");
      return true;
    }
  }
  // Function qui enregistre la commande dans le local storage //
  function savePanier() {
    storage.push(order);
    localStorage.setItem("Produit", JSON.stringify(storage));
  }
  // Function qui change la couleur et le texte du bouton ajouter au panier //
  function changeColorBtn() {
    addCart.style.color = "green";
    addCart.innerText = "Produit Ajouté";
    addCart.addEventListener("focusout", () => {
      addCart.style.color = "white";
      addCart.innerText = "Ajouter au panier";
    });
  }
  // Creation d'une variable qui récupere la commande présente dans le locale storage et la transforme en format JSON //
  storage = JSON.parse(localStorage.getItem("Produit"));
  // function ajouter au panier suivant certaine condition //
  function saveOrder() {
    // Si aucun produit n'est présent, le local storage devient un tableau au vide auquel on ajoute la commande //
    if (storage == null && orderError() !== true) {
      storage = [];
      savePanier();
      changeColorBtn();
      totalInBasket();
    }
    // Si un produit ou plus est présent dans le local storage ..//
    else if (storage != null && orderError() !== true) {
      for (let i = 0; i < storage.length; i++) {
        // Si un article avec la meme couleur et le même id est ajouter au local storage on incrémente juste la quantité //
        if (storage[i].colors == colorsProduct && storage[i].Id == idProduct) {
          storage[i].quantity += quantityProduct;
          changeColorBtn();
          localStorage.setItem("Produit", JSON.stringify(storage));
          totalInBasket();
          storage = JSON.parse(localStorage.getItem("produit"));
        }
      }
      for (let i = 0; i < storage.length; i++) {
        // Si un article a déjà le même id mais pas la même couleur dans le local storage on créé un nouvel objet (order)//
        if (storage[i].Id == idProduct && storage[i].colors != colorsProduct) {
          savePanier();
          changeColorBtn();
          totalInBasket();
          storage = JSON.parse(localStorage.getItem("produit"));
        }
      }
      for (let i = 0; i < storage.length; i++) {
        // Si l'id de l'article ajouté n'est pas présent dans le local storage on créé un nouvel objet (order)//
        if (storage[i].Id != idProduct) {
          savePanier();
          changeColorBtn();
          totalInBasket();
          storage = JSON.parse(localStorage.getItem("produit"));
        }
      }
    }
  }
  saveOrder();
});
totalInBasket();
