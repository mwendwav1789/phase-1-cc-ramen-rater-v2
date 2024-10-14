document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((ramen) => displayRamenImage(ramen));
    });
});

function displayRamenImage(ramen) {
  const ramenMenu = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image;
  img.addEventListener("click", () => displayRamenDetails(ramen));
  ramenMenu.appendChild(img);
}
function displayRamenDetails(ramen) {
  document.getElementById("ramen-name").textContent = ramen.name;
  document.getElementById("ramen-rating").textContent = ramen.rating;
  document.getElementById("ramen-comment").textContent = ramen.comment;
}
document.getElementById("new-ramen").addEventListener("submit", (event) => {
  event.preventDefault();
  const newRamen = {
    name: event.target.name.value,
    rating: event.target.rating.value,
    comment: event.target.comment.value,
    image: event.target.image.value,
  };

  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRamen),
  })
    .then((response) => response.json())
    .then((ramen) => displayRamenImage(ramen));
});
