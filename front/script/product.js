const IDProduit = window.location.search.split("?id=").join("");
console.log(IDProduit);

fetch(`http://localhost:3000/api/products/${IDProduit}`)
  .then((res) => res.json())
  .then((dataProduit) => {
    const pageProduit = dataProduit;
    console.log(dataProduit);

    let imageProduit = document.createElement("img");
    document.querySelector(".item__img").appendChild(imageProduit);
    imageProduit.src = pageProduit.imageUrl;
    imageProduit.alt = pageProduit.altTxt;

    document.getElementById("title").innerText = pageProduit.name;
    document.getElementById("price").innerText = pageProduit.price;
    document.getElementById("description").innerText = pageProduit.description;

    let colors = pageProduit.colors;
    console.log(colors);

    for (i = 0; i < colors.length; i++) {
      let diffColors = colors[i];
      console.log(diffColors);

      let optionValue = document.createElement("option");
      document
        .querySelector("#colors")
        .appendChild(optionValue)
        .setAttribute("value", diffColors);
      document.querySelector("#colors").appendChild(optionValue).innerText =
        diffColors;
      console.log(optionValue);
    }
  });

/*const produit = window.location.search.split("?id=").join("");
console.log(produit);

fetch(`http://localhost:3000/api/products/${produit}`)
  .then((res) => res.json())
  .then((dataProduit) => {
    const ProduitUn = dataProduit;
    console.log(dataProduit);
  });*/
