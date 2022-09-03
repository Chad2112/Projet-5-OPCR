/* Recuperation du local storage au format JSON depuis le format string */
let produitPanier = JSON.parse(localStorage.getItem("Produit"));
console.log(produitPanier);
/* Création d'une boucle pour recuperer tous les produit du panier
  et création des balise correspondante par nombre de produit dans le panier*/
function createElementHtml() {
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
    const totalOrderPrice = document.getElementById("totalPrice");

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
    contentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
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
    textPrice.setAttribute("id", "price");
    textPrice.innerText = `${produitPanier[i].price * produitPanier[i].quantity} €`;
  }
}

// Selection des balises qui vont etre modifier par la suite au click sur les balises input//
// .. notament la quantité de chaque produit, la quantité total de tous les produit additionner//
// .. le prix des articles ainsi que le prix total de tous les articles réuni//
function editQuantityAndPrice() {
  const input = document.querySelectorAll(".itemQuantity");
  const quantityText = document.querySelectorAll("#textQuantity");
  const allPriceArticle = document.querySelectorAll("#price");
  const totalPrice = document.getElementById("totalPrice");
  const totalQuantity = document.getElementById("totalQuantity");

  //  Création d'un boucle qui recupère tout les inputs de la page //
  for (i = 0; i < input.length; i++) {
    /* Création d'un evenement au click qui lorsque la quantité est modifier sur ..
  .. l'input elle modifie également le prix de chaque articles , le prix total , ..
   .. la quantité de chaque article, ainsi que la quantité total et renvoi le resultat au local storage */
    input[i].addEventListener("click", () => {
      /* Création d'un boucle qui récupere l'index du locale storage 
    pour accéder à la quantité de chaque produit*/
      for (let i = 0; i < produitPanier.length; i++) {
        /* Condition : si la quantité d'un produit dans le local storage est différente de la quantité sur l'input,
           alors elle sera modifier en temps réèl */
        if (produitPanier[i].quantity != Number(input[i].value)) {
          produitPanier[i].quantity = 0;
          produitPanier[i].quantity += Number(input[i].value);
          /* le resultat est renvoyer au local storage*/
          localStorage.setItem("Produit", JSON.stringify(produitPanier));
          // Ajout de la quantité total de chaque produit dans sa balise texte correspondantes//
          for (i = 0; i < quantityText.length; i++) {
            quantityText[i].innerText = `Qté : ${Number(input[i].value)}`;
          }
        }
      }
      /* Création d'une boucle pour selectionner toutes les balise 'p' correspondant au prix de chaque articles
       */
      for (i = 0; i < allPriceArticle.length; i++) {
        // Ajout dans une variable le prix de chaque article multiplié par leur nombre//
        let prix = produitPanier[i].price * produitPanier[i].quantity;
        // Ajout du resultat son forme de texte dans la balise 'p' correspondant au prix de chaque articles//
        allPriceArticle[i].innerText = `${prix} €`;
      }
      // Creation d'une boucle pour calculer le prix et la quantité total de la commande//
      let totalProductPrice = 0;
      let totalProductQuantity = 0;
      for (let i = 0; i < produitPanier.length; i++) {
        let prixTotal = produitPanier[i].price * produitPanier[i].quantity;
        totalProductQuantity += produitPanier[i].quantity;
        totalProductPrice += prixTotal;
        // Le resultat est renvoyer dans les balises texte correspondante//
        totalPrice.innerText = totalProductPrice;
        totalQuantity.innerText = totalProductQuantity;
      }
    });
  }
}
// Creation d'un fonction pour permettre a l'utilisateur de supprimer de son panier le produit qu'il souhaite//
function deleteProduct() {
  const deleteItem = document.querySelectorAll(".deleteItem");
  for (i = 0; i < deleteItem.length; i++) {
    const selectBtnDelete = deleteItem[i];
    selectBtnDelete.addEventListener("click", () => {
      const selectParentDelete = selectBtnDelete.closest("article");
      selectParentDelete.parentNode.removeChild(selectParentDelete);
      for (i = produitPanier.length; i <= produitPanier.length; i++) {
        // Condition si il y a plus de 1 produit dans le local storage alors on supprimer le produit souhaité//
        if (produitPanier.length > 1) {
          produitPanier.splice(produitPanier[i], 1);
          localStorage.setItem("Produit", JSON.stringify(produitPanier));
        }
        // Si l'utilisateur supprime l'unique produit de sa commande on vide le local storage//
        else {
          localStorage.clear();
        }
      }
      // Creation d'une boucle pour calculer le prix et la quantité total de la commande quand un élément est supprimer//

      const totalPrice = document.getElementById("totalPrice");
      const totalQuantity = document.getElementById("totalQuantity");
      let totalProductPrice = 0;
      let totalProductQuantity = 0;
      for (let i = 0; i < produitPanier.length; i++) {
        let prixTotal = produitPanier[i].price * produitPanier[i].quantity;
        totalProductQuantity += produitPanier[i].quantity;
        totalProductPrice += prixTotal;
        // Le resultat est renvoyer dans les balises texte correspondante//
        totalPrice.innerText = totalProductPrice;
        totalQuantity.innerText = totalProductQuantity;
      }
    });
  }
}

//Creation d'une fonction qui calcul le prix total de tout les articles confondu présent dans le panier//
function totalPrice() {
  const totalPrice = document.getElementById("totalPrice");

  let total = 0;
  for (let i = 0; i < produitPanier.length; i++) {
    let prixTotal = produitPanier[i].price * produitPanier[i].quantity;
    total += prixTotal;
  }
  totalPrice.innerText = total;
}

//Creation d'une fonction qui calcul la quantité total de tout les articles confondu présent dans le panier//

function totalQuantity() {
  let totalProductQuantity = 0;
  for (i = 0; i < produitPanier.length; i++) {
    totalProductQuantity += produitPanier[i].quantity;
  }
  /* Ajout du total de la quantité sous forme de texte dans la balise correspondante */
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerText = totalProductQuantity;
}

//*******************************************************************VAlIDATION DU FORMULAIRE********************************************************************************** */

// Creation d'une fonction qui envoie un message d'erreur si le formulaire est mal rempli//
function userDataProcessing() {
  const firstNameError = document.getElementById("firstNameErrorMsg");
  const lastNameError = document.getElementById("lastNameErrorMsg");
  const addressError = document.getElementById("addressErrorMsg");
  const cityError = document.getElementById("cityErrorMsg");
  const emailError = document.getElementById("emailErrorMsg");
  const form = document.querySelector(".cart__order__form");
  const submit = document.getElementById("order");

  form.firstName.setAttribute("placeholder", "Exemple : Patrick");
  form.lastName.setAttribute("placeholder", "Exemple : Dupont");
  form.address.setAttribute("placeholder", "Exemple : 31 rue jean jaurès");
  form.city.setAttribute("placeholder", "Exemple : Marseille");
  form.email.setAttribute("placeholder", "Exemple : patrickdupont@gmail.com");

  // Creation des regex pour verifié les données saisie par l'utilisateur pour la validation de chaque section du formulaire//

  form.firstName.addEventListener("change", () => {
    validFirstName(this);
  });

  form.lastName.addEventListener("change", () => {
    validLastName(this);
  });
  form.address.addEventListener("change", () => {
    validAddress(this);
  });
  form.city.addEventListener("change", () => {
    validCity(this);
  });
  form.email.addEventListener("change", () => {
    validEmail(this);
  });

  const validFirstName = () => {
    let firstNameRegExp = new RegExp(/^[a-zA-Z ,.'-]+$/);

    let testFirstName = firstNameRegExp.test(form.firstName.value);

    if (testFirstName == true) {
      firstNameError.innerText = "";
      firstNameError.classList.remove("text__invalid");
      form.firstName.classList.remove("border__text__invalid");
      form.firstName.classList.add("border__text__valid");
      return true;
    } else {
      form.email.classList.remove("border__text__valid");
      firstNameError.innerText = "Veuillez renseigner un prenom valide";
      firstNameError.classList.add("text__invalid");
      form.firstName.classList.add("border__text__invalid");
      return false;
    }
  };

  const validLastName = () => {
    let lastNameRegExp = new RegExp(/^[a-zA-Z ,.'-]+$/);

    let testLastName = lastNameRegExp.test(form.lastName.value);

    if (testLastName == true) {
      lastNameError.innerText = "";
      lastNameError.classList.remove("text__invalid");
      form.lastName.classList.remove("border__text__invalid");
      form.lastName.classList.add("border__text__valid");
      return true;
    } else {
      form.lastName.classList.remove("border__text__valid");
      lastNameError.innerText = "Veuillez renseigner un nom valide";
      lastNameError.classList.add("text__invalid");
      form.lastName.classList.add("border__text__invalid");
      return false;
    }
  };

  const validEmail = () => {
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

    let testEmail = emailRegExp.test(form.email.value);
    console.log(form.email.value);
    if (testEmail == true) {
      emailError.innerText = "";
      emailError.classList.remove("text__invalid");
      form.email.classList.remove("border__text__invalid");
      form.email.classList.add("border__text__valid");
      return true;
    } else {
      emailError.innerText = "Veuillez renseigner une adresse mail valide (Exemple : Patrickdupont@gmail.com)";
      form.email.classList.remove("border__text__valid");
      form.email.classList.add("border__text__invalid");
      emailError.classList.add("text__invalid");
      return false;
    }
  };

  const validAddress = () => {
    let addressRegExp = new RegExp(/^[0-9]{1,4} [a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.-_]{3,50}$/);

    let testAddress = addressRegExp.test(form.address.value);
    console.log(testAddress);
    console.log(form.address.value);

    if (testAddress == true) {
      addressError.innerText = "";
      addressError.classList.remove("text__invalid");
      form.address.classList.remove("border__text__invalid");
      form.address.classList.add("border__text__valid");
      return true;
    } else {
      addressError.innerText = "Veuillez renseigner une adresse postale valide ( Exemple : 31 rue Jean Jaurès)";
      form.address.classList.remove("border__text__valid");
      form.address.classList.add("border__text__invalid");
      addressError.classList.add("text__invalid");
      return false;
    }
  };

  const validCity = () => {
    let cityRegExp = new RegExp(/^[a-zA-Z ,áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.'-]+$/);
    let testCity = cityRegExp.test(form.city.value);
    console.log(testCity);
    console.log(form.city.value);

    if (testCity == true) {
      cityError.innerText = "";
      cityError.classList.remove("text.invalid");
      form.city.classList.remove("border__text__invalid");
      form.city.classList.add("border__text__valid");
      return true;
    } else {
      cityError.innerText = "Veuillez renseigner une ville valide ( Exemple : Marseille )";
      form.city.classList.remove("border__text_valid");
      form.city.classList.add("border__text__invalid");
      cityError.classList.add("text__invalid");
      return false;
    }
  };
  let productId = [];
  const dataId = document.querySelectorAll("article");
  for (i = 0; i < dataId.length; i++) {
    let dataIdIndex = dataId[i].dataset.id;
    productId[i] = dataIdIndex;
  }
  let orderProducts = {
    contact: {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value,
    },
    produit: productId,
  };
  JSON.stringify(orderProducts);
  console.log(orderProducts);
  submit.addEventListener("click", (e) => {
    if (validFirstName() !== true || validLastName() !== true || validEmail() !== true || validAddress() !== true || validCity() !== true) {
      console.log("svdiouhbb");
      e.preventDefault();
    } else {
      e.preventDefault();
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(orderProducts),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          const products = data;
          localStorage.setItem("order", JSON.stringify(orderProducts));
          console.log(products);
        });
    }
  });
}

createElementHtml();
editQuantityAndPrice();
deleteProduct();
totalPrice();
totalQuantity();
userDataProcessing();
