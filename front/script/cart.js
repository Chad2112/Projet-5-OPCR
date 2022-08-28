let produitPanier = JSON.parse(localStorage.getItem("Produit"));
console.log(produitPanier);
for (i = 0; i < produitPanier.length; i++) {
  const productStorage = produitPanier[i];
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

  console.log(productStorage);

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
  quantity.innerText = `${productStorage["quantity"]}`;
  contentSettingsQuantity.appendChild(inputQuantity);
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("class", "itemQuantity");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", `100`);
  inputQuantity.setAttribute("value", `${productStorage["quantity"]}`);
  contentSettings.appendChild(contentDelete);
  contentDelete.setAttribute("class", "cart__item__content__settings__delete");
  contentDelete.appendChild(deleteItem);
  deleteItem.setAttribute("class", "deleteItem");
  deleteItem.innerText = "Supprimer";
  console.log(article);
}

/* const recupAllArticles = document.getElementsByTagName("article");
 for (i = 0; i < recupAllArticles.length; i++) {
   const article = document.getElementsByTagName("article");
   const deleteItemID = document.getElementById("deleteItem");
   const articleId = article[i].dataset.id;
   console.log(deleteItemID.closest(".cart__item"));

   console.log(articleId);*/

/*const allArticles = recupAllArticles[i];
   console.log(allArticles);*/
/*  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>Vert</p>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article> */
