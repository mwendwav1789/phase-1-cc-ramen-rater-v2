// Block 1: displayRamens function
function displayRamens() {
  fetch("https://example.com/api/ramens") // Replace with the actual API URL
    .then((response) => response.json())
    .then((ramenData) => {
      const ramenMenu = document.getElementById("ramen-menu");
      ramenData.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
    })
    .catch((error) => console.error("Error fetching ramen data:", error));
}

// Block 2: handleClick function
function handleClick(ramen) {
  const ramenDetail = document.getElementById("ramen-detail");
  ramenDetail.querySelector("img").src = ramen.image;
  ramenDetail.querySelector("h2").textContent = ramen.name;
  ramenDetail.querySelector("h3").textContent = ramen.restaurant;
  ramenDetail.querySelector("#rating-display").textContent = ramen.rating;
  ramenDetail.querySelector("#comment-display").textContent = ramen.comment;
}
// Block 3: addSubmitListener function
function addSubmitListener() {
  const ramenForm = document.getElementById("new-ramen");
  ramenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target.comment.value,
    };

    // Adding new ramen to the #ramen-menu div
    const ramenMenu = document.getElementById("ramen-menu");
    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener("click", () => handleClick(newRamen));
    ramenMenu.appendChild(img);

    ramenForm.reset();
  });
}

// Block 4: main function
function main() {
  displayRamens();
  addSubmitListener();
}

// Start the program logic after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", main);
