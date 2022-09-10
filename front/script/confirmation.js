// Recuperation de l'order ID présent dans l'url pour l'afficher sur la page de confirmation //
let orderId = window.location.search.split("?").join("");
console.log(orderId);
const displayId = document.getElementById("orderId");
displayId.innerText = orderId;
localStorage.clear();
