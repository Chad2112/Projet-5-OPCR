let orderId = window.location.search.split("?").join("");
console.log(orderId);
const displayId = document.getElementById("orderId");
displayId.innerText = orderId;
localStorage.clear();
