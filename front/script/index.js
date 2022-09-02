// Requete fetch vers l'API//
function recupDataApi() {
  fetch("http://localhost:3000/api/products/")
    // Reponse renvoyer par l'API au format j.son//
    .then((res) => res.json())
    //Stockage de l'ensemble des données de l'API dans la constante "articles"
    .then((data) => {
      const articles = data;
      console.log(articles);
      // Itération des données du tableau/objet de l'API//
      for (let data in articles) {
        // Création d'une balise afin de stocker le lien de la page produit retourner par l'API//
        let linkProduit = document.createElement("a");
        document.querySelector("#items").appendChild(linkProduit);
        linkProduit.href = `./product.html?id=${articles[data]._id}`;
        // Création d'une balise articles pour stocker les differentes information produits//
        let container = document.createElement("article");
        linkProduit.appendChild(container);
        // Création d'une balise img afin d'afficher l'image de la page produit retourner par l'API//
        let imageProduit = document.createElement("img");
        container.appendChild(imageProduit);
        imageProduit.src = articles[data].imageUrl;
        imageProduit.alt = articles[data].altTxt;
        // Création d'une balise h3 afin d'afficher le nom du produit retourner par l'API//
        let nameProduit = document.createElement("h3");
        container.appendChild(nameProduit);
        nameProduit.textContent = articles[data].name;
        // Création d'une balise p afin d'afficher la description de la page produit retourner par l'API//
        let paragrapheText = document.createElement("p");
        container.appendChild(paragrapheText);
        paragrapheText.textContent = articles[data].description;
        console.log(linkProduit);
      }
    })
    .catch((error) => {
      let texteerror = document.querySelector("h1");
      texteerror.innerText = "Nous n'avons pas réussi à afficher nos produit. Veuillez reesayer ultérieurement";
      console.log(texteerror);
      console.log(error);
    });
}
recupDataApi();

//.then((data) => (img.src = data[0].imageUrl))//

//const img = document.getElementById("kanap1");
//img.src = articles[0].imageUrl;//

//let produitcart = document.createElement("divproduit");//
// console.log(produitcart);//

//let imagecontainer = document.getElementById("kanap1");//
//img.src = articles[0].imageURL;//
//console.log(imagecontainer);//
