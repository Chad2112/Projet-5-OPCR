/* Recuperation du local storage au format JSON */
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
// Function qui calcul le prix total de chaque produit //
function productPrice() {
  const productPrice = document.querySelectorAll("#price");
  for (i = 0; i < productPrice.length; i++) {
    let prix = produitPanier[i].price * produitPanier[i].quantity;
    productPrice[i].innerText = `${prix} €`;
  }
}

// Function qui actualise la quantité total de chaque produit en cas de changement sur la balise input //
function productQuantity() {
  const quantityText = document.querySelectorAll("#textQuantity");
  const input = document.querySelectorAll(".itemQuantity");
  //  Création d'un boucle qui recupère tout les inputs de la page //
  for (i = 0; i < input.length; i++) {
    /* Création d'une boucle qui récupere l'index du locale storage 
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
  }
}
// Creation d'une fonction qui affiche le total d'articles dans un mini panier a coté du lien "panier"//
const miniBasketText = document.querySelector(".cartQuantity");
function miniBasket() {
  if (produitPanier != null) {
    let totalQuantityInCart = 0;

    totalQuantityInCart += produitPanier.length;

    miniBasketText.innerText = `${totalQuantityInCart}`;
  } else {
    miniBasketText.innerText = "0";
  }
}

//Creation d'une fonction qui calcul le prix total de tout les articles confondu présent dans le panier//
const totalPrice = document.getElementById("totalPrice");
function calculTotalPrice() {
  let total = 0;
  for (let i = 0; i < produitPanier.length; i++) {
    let prixTotal = produitPanier[i].price * produitPanier[i].quantity;
    total += prixTotal;
  }
  totalPrice.innerText = total;
}
//Creation d'une fonction qui calcul la quantité total de tout les articles confondu présent dans le panier//
const totalQuantity = document.getElementById("totalQuantity");
function calculTotalQuantity() {
  let totalProductQuantity = 0;
  for (i = 0; i < produitPanier.length; i++) {
    totalProductQuantity += produitPanier[i].quantity;
  }
  /* Ajout du total de la quantité sous forme de texte dans la balise correspondante */
  totalQuantity.innerText = totalProductQuantity;
}
// Function qui actualise le prix et la quantité a chaque changement de quantité sur l'input //
function editQuantityAndPrice() {
  const input = document.querySelectorAll(".itemQuantity");
  //  Création d'un boucle qui recupère tout les inputs de la page //
  input.forEach((btnInput) =>
    btnInput.addEventListener("click", () => {
      productQuantity();
      productPrice();
      calculTotalPrice();
      calculTotalQuantity();
    })
  );
}
// Creation d'un fonction pour permettre a l'utilisateur de supprimer de son panier le produit qu'il souhaite//
function deleteProduct() {
  const deleteItem = document.querySelectorAll(".deleteItem");
  deleteItem.forEach((btnDelete) =>
    btnDelete.addEventListener("click", () => {
      // Suppresion de la balise HTML "article" correspondante en cas de clique sur le bouton supprimer//
      const selectParentDelete = btnDelete.closest("article");
      selectParentDelete.parentNode.removeChild(selectParentDelete);
      if (produitPanier.length > 1) {
        // Creation d'un filter pour selectionne tous les produits sauf celui supprimer //
        const filter = produitPanier.filter((productIdAndColors) => productIdAndColors.Id != selectParentDelete.dataset.id || productIdAndColors.colors != selectParentDelete.dataset.colors);
        // Le nouveau tableau est renvoyer au local storage //
        localStorage.setItem("Produit", JSON.stringify(filter));
        // Le local storage est actualisé//
        produitPanier = filter;
        // Recalcul du prix et de la quantité total a chaque produit supprimer //
        calculTotalPrice();
        calculTotalQuantity();
        miniBasket();
      }
      // Si il ne restait qu'un seul produit l'or de la suppresion le local storage est vidé //
      else {
        localStorage.clear();
        totalPrice.innerText = "";
        totalQuantity.innerText = "";
        miniBasketText.innerText = "0";
      }
    })
  );
}

//*******************************************************************VAlIDATION DU FORMULAIRE********************************************************************************** */

// Creation des REGEX pour s'assurer que le formulaire est correctement rempli par l'utilisateur//
const form = document.querySelector(".cart__order__form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const adress = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const submit = document.getElementById("order");

firstName.setAttribute("placeholder", "Exemple : Patrick");
lastName.setAttribute("placeholder", "Exemple : Dupont");
address.setAttribute("placeholder", "Exemple : 31 rue jean jaurès");
city.setAttribute("placeholder", "Exemple : Marseille");
email.setAttribute("placeholder", "Exemple : patrickdupont@gmail.com");
// REGEX prénom //
function validFirstName() {
  const firstNameError = document.getElementById("firstNameErrorMsg");

  let firstNameRegExp = new RegExp("^[a-zA-Z ,.'-]{2,12}$");

  let testFirstName = firstNameRegExp.test(form.firstName.value);

  if (testFirstName == true) {
    firstNameError.innerText = "";
    firstNameError.classList.remove("text__invalid");
    form.firstName.classList.remove("border__text__invalid");
    form.firstName.classList.add("border__text__valid");
    submit.removeAttribute("style");
    return true;
  } else {
    form.email.classList.remove("border__text__valid");
    firstNameError.innerText = "Veuillez renseigner un prenom valide";
    firstNameError.classList.add("text__invalid");
    form.firstName.classList.add("border__text__invalid");
    submit.style.boxShadow = "rgb(42, 18, 206, 0) 0 0 22px 6px";

    return false;
  }
}
// REGEX nom //
function validLastName() {
  const lastNameError = document.getElementById("lastNameErrorMsg");

  let lastNameRegExp = new RegExp("^[a-zA-Z ,.'-]{2,12}$");

  let testLastName = lastNameRegExp.test(form.lastName.value);

  if (testLastName == true) {
    lastNameError.innerText = "";
    lastNameError.classList.remove("text__invalid");
    form.lastName.classList.remove("border__text__invalid");
    form.lastName.classList.add("border__text__valid");
    submit.removeAttribute("style");
    return true;
  } else {
    form.lastName.classList.remove("border__text__valid");
    lastNameError.innerText = "Veuillez renseigner un nom valide";
    lastNameError.classList.add("text__invalid");
    form.lastName.classList.add("border__text__invalid");
    submit.style.boxShadow = "rgb(42, 18, 206, 0) 0 0 22px 6px";
    return false;
  }
}
// REGEX email //
function validEmail() {
  const emailError = document.getElementById("emailErrorMsg");

  let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

  let testEmail = emailRegExp.test(form.email.value);
  console.log(form.email.value);
  if (testEmail == true) {
    emailError.innerText = "";
    emailError.classList.remove("text__invalid");
    form.email.classList.remove("border__text__invalid");
    form.email.classList.add("border__text__valid");
    submit.removeAttribute("style");
    return true;
  } else {
    emailError.innerText = "Veuillez renseigner une adresse mail valide (Exemple : Patrickdupont@gmail.com)";
    form.email.classList.remove("border__text__valid");
    form.email.classList.add("border__text__invalid");
    emailError.classList.add("text__invalid");
    submit.style.boxShadow = "rgb(42, 18, 206, 0) 0 0 22px 6px";
    return false;
  }
}
// REGEX adress //
function validAddress() {
  const addressError = document.getElementById("addressErrorMsg");
  let addressRegExp = new RegExp(/^[0-9]{1,4} [a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.-_]{3,28}$/);

  let testAddress = addressRegExp.test(form.address.value);

  if (testAddress == true) {
    addressError.innerText = "";
    addressError.classList.remove("text__invalid");
    form.address.classList.remove("border__text__invalid");
    form.address.classList.add("border__text__valid");
    submit.removeAttribute("style");
    return true;
  } else {
    addressError.innerText = "Veuillez renseigner une adresse postale valide ( Exemple : 31 rue Jean Jaurès)";
    form.address.classList.remove("border__text__valid");
    form.address.classList.add("border__text__invalid");
    addressError.classList.add("text__invalid");
    submit.style.boxShadow = "rgb(42, 18, 206, 0) 0 0 22px 6px";
    return false;
  }
}
// REGEX ville //
function validCity() {
  const cityError = document.getElementById("cityErrorMsg");
  let cityRegExp = new RegExp("^[a-zA-Z ,áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.'-]{2,20}$");
  let testCity = cityRegExp.test(form.city.value);

  if (testCity == true) {
    cityError.innerText = "";
    cityError.classList.remove("text.invalid");
    form.city.classList.remove("border__text__invalid");
    form.city.classList.add("border__text__valid");
    submit.removeAttribute("style");
    return true;
  } else {
    cityError.innerText = "Veuillez renseigner une ville valide ( Exemple : Marseille )";
    form.city.classList.remove("border__text_valid");
    form.city.classList.add("border__text__invalid");
    cityError.classList.add("text__invalid");
    submit.style.boxShadow = "rgb(42, 18, 206, 0) 0 0 22px 6px";

    return false;
  }
}

// function qui verifie si le formulaire est correctement rempli a chaque focus in focus out //
function formverification() {
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
}

// Function qui permet de soumettre le formulaire si celui-ci est correctement rempli //
function submitForm() {
  const submit = document.getElementById("order");
  console.log(submit);
  submit.addEventListener("click", (e) => {
    // Si le formulaire est mal remplie le bouton submit est bloqué//
    if (validFirstName() !== true || validLastName() !== true || validEmail() !== true || validAddress() !== true || validCity() !== true) {
      e.preventDefault();
    } else {
      e.preventDefault();
      // Si le formulaire est correctement rempli on créé un nouveau tableau //
      let productId = [];
      const dataId = document.querySelectorAll("article");
      for (i = 0; i < dataId.length; i++) {
        let dataIdIndex = dataId[i].dataset.id;
        // Les ID de chaque article sont stocké dans le tableau //
        productId[i] = dataIdIndex;
      }

      // Creation des de la requete de type POST avec les information attendu par le back-end //

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Creation d'un objet sous forme de sting avec les coordonné du client ainsi que les ID de chaque produit (Information attendu par le back end)//
      let raw = JSON.stringify({
        contact: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          address: form.address.value,
          city: form.city.value,
          email: form.email.value,
        },
        products: productId,
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/api/products/order", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // Le resultat nous renvoi l'order ID qui sera afficher sur la page commande //
          const resultat = result.orderId;
          document.location.href = `../html/confirmation.html?${resultat}`;
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    }
  });
}

createElementHtml();
editQuantityAndPrice();
deleteProduct();
miniBasket();
calculTotalPrice();
calculTotalQuantity();
formverification();
submitForm();
