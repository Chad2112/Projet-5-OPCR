// Récuperation de l'ID correspondant au produit pour chaque page produit//
const IDProduit = window.location.search.split("?id=").join("");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const select = document.getElementById("colors");
const itemImg = document.querySelector(".item__img");
const imageProduit = document.createElement("img");
const quantity = document.getElementById("quantity");

console.log(IDProduit);

fetch(`http://localhost:3000/api/products/${IDProduit}`)
  .then((res) => res.json())
  .catch((error) => {
    alert("Connection impossible avec le serveur");
  })
  .then((dataProduit) => {
    const pageProduit = dataProduit;
    console.log(dataProduit);

    itemImg.appendChild(imageProduit);
    imageProduit.src = pageProduit.imageUrl;
    imageProduit.alt = pageProduit.altTxt;

    title.innerText = pageProduit.name;

    price.innerText = pageProduit.price;

    description.innerText = pageProduit.description;

    let colors = pageProduit.colors;
    console.log(colors);

    for (i = 0; i < colors.length; i++) {
      let diffColors = colors[i];
      console.log(diffColors);

      let optionValue = document.createElement("option");
      optionValue.innerText = `${diffColors}`;
      optionValue.value = `${diffColors}`;
      select.appendChild(optionValue);
      console.log(optionValue);
    }

    const addCart = document.getElementById("addToCart");

    addCart.addEventListener("click", () => {
      let idProduct = IDProduit;
      let colorsProduct = select.value;
      let quantityProduct = Number(quantity.value);
      let order = {
        Id: idProduct,
        name: pageProduit.name,
        colors: colorsProduct,
        quantity: quantityProduct,
        img: pageProduit.imageUrl,
        description: pageProduit.description,
        price: price.innerText,
      };

      function orderError() {
        if (colorsProduct == "" && (quantityProduct < 1 || quantityProduct > 100)) {
          alert("Veuillez selectionner une couleur ainsi qu'une quantité");
        } else if (quantityProduct < 1 || quantityProduct > 100) {
          alert("Veuillez rentrer une quantité valide ( comprise entre 1 et 100 )");
        } else if ((quantityProduct >= 1 || quantityProduct <= 100) && colorsProduct == "") {
          alert("Veuillez selectionner une couleur");
        }
      }

      let storage = JSON.parse(localStorage.getItem("Produit"));
      function addProduitPanier() {
        if (storage == null) {
          storage = [];
          storage.push(order);
          console.log("null");
        } else if (storage != null) {
          for (let i = 0; i < storage.length; i++) {
            if (storage[i].colors == colorsProduct && storage[i].Id == idProduct) {
              storage[i].quantity += quantityProduct;
              console.log(i);
              console.log("same");
              localStorage.setItem("Produit", JSON.stringify(storage));
              storage = JSON.parse(localStorage.getItem("produit"));
            }
          }
        }
        for (let i = 0; i < storage.length; i++) {
          if (storage[i].Id == idProduct && storage[i].colors != colorsProduct) {
            storage.push(order);
            localStorage.setItem("Produit", JSON.stringify(storage));
            storage = JSON.parse(localStorage.getItem("produit"));
            console.log("notsame");
          }
        }
        for (let i = 0; i < storage.length; i++) {
          if (storage[i].Id != idProduct) {
            storage.push(order);
            localStorage.setItem("Produit", JSON.stringify(storage));
            storage = JSON.parse(localStorage.getItem("produit"));
            console.log("notsame");
          }
        }
      }
      orderError();
      addProduitPanier();

      localStorage.setItem("Produit", JSON.stringify(storage));
    });
  });

/*.catch((error) => {
    let texteerror = document.querySelector("h1");
    texteerror.innerText = "Nous n'avons pas réussi à afficher nos produit. Veuillez reesayer ultérieurement";
    console.log(texteerror);
    console.log(error);
  });*/
