// Main function to initialize the program
function main() {
  displayRamens();
  addSubmitListener();
}

// Start the program logic after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", main);

// Function to fetch and display all ramen images
function displayRamens() {
  fetch("https://example.com/api/ramens") // Replace with the actual API URL
    .then((response) => response.json())
    .then((ramenData) => {
      ramenData.forEach((ramen) => {
        createRamenImage(ramen);
      });
    })
    .catch((error) => console.error("Error fetching ramen data:", error));
}

// Callback to create and display a ramen image in the #ramen-menu div
function createRamenImage(ramen) {
  const ramenMenu = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => handleClick(ramen));
  ramenMenu.appendChild(img);
}

// Callback for handling click events on ramen images
function handleClick(ramen) {
  displayRamenDetails(ramen);
}

// Callback to populate the #ramen-detail div with the selected ramen’s details
function displayRamenDetails(ramen) {
  const ramenDetail = document.getElementById("ramen-detail");
  ramenDetail.querySelector("img").src = ramen.image;
  ramenDetail.querySelector("h2").textContent = ramen.name;
  ramenDetail.querySelector("h3").textContent = ramen.restaurant;
  ramenDetail.querySelector("#rating-display").textContent = ramen.rating;
  ramenDetail.querySelector("#comment-display").textContent = ramen.comment;
}

// Function to attach a submit event listener to the #new-ramen form
function addSubmitListener() {
  const ramenForm = document.getElementById("new-ramen");
  ramenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newRamen = createNewRamenObject(event);

    // Add new ramen image to the #ramen-menu div
    createRamenImage(newRamen);

    // Display feedback to the user
    displaySubmitFeedback();

    ramenForm.reset();
  });
}

// Callback to create a new ramen object from form data
function createNewRamenObject(event) {
  return {
    name: event.target.name.value,
    restaurant: event.target.restaurant.value,
    image: event.target.image.value,
    rating: event.target.rating.value,
    comment: event.target.comment.value,
  };
}

// Callback to display a feedback message when a new ramen is added
function displaySubmitFeedback() {
  const feedback = document.createElement("p");
  feedback.textContent = "New ramen added successfully!";
  feedback.classList.add("feedback");
  document.body.appendChild(feedback);

  setTimeout(() => feedback.remove(), 2000); // Remove feedback after 2 seconds
}
