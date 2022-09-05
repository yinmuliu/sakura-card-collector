//////////////////////
// Variables
/////////////////////

const cardURL = "https://protected-taiga-89091.herokuapp.com/api/card";
const availableCards = 55;
const getRandomButton = document.getElementById("random-card");
const showAllButton = document.getElementById("all-cards");
const cardContainer = document.getElementById("card-container");

/////////////////////
// Get and display all the cards when "Show All" button is clicked
////////////////////

const displayAllCards = async () => {
  // if the button shows "Hide All Card"
  if (showAllButton.innerHTML === "Hide All Cards") {
    // remove the child in the card container
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.lastChild);
    }
    // change the button's innerHTML back to "show all sakura card"
    showAllButton.innerHTML = "Show All Sakura Cards";
  } else {
    // get data from API
    const res = await fetch(cardURL);
    const result = await res.json();
    const cards = result.data;
    // Display all cards and append each one to the card container
    for (let i = 0; i < availableCards; i++) {
      let img = document.createElement("img");
      img.src = cards[i].sakuraCard;
      img.alt = cards[i].englishName;
      img.className = "sakura-card animate__animated animate__zoomIn";
      cardContainer.appendChild(img);
    }
    // change the button's innerHTML back to "hide all sakura card"
    showAllButton.innerHTML = "Hide All Cards";
  }
};

showAllButton.addEventListener("click", displayAllCards);

////////////////////
// Get and display one random cards when "Get Random" button is clicked
///////////////////

// Generate a random number between 1-55 (55 cards available)
const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get and display one card using the random number
const displayOneRandomCard = async () => {
  // if the button shows "Hide Card"
  if (getRandomButton.innerHTML === "Hide Card") {
    // remove the child in the card container
    cardContainer.removeChild(cardContainer.lastChild);
    // change the button's innerHTML back to "Get a random card"
    getRandomButton.innerHTML = "Get a Random Card";
  } else {
    // generate a random number
    const num = randomInteger(0, 55);
    // fetch card from API
    const res = await fetch(`${cardURL}?pageSize=1&page=${num}`);
    const result = await res.json();
    const card = result.data[0];
    // create an image element with src, alt and class info
    let img = document.createElement("img");
    img.src = card.sakuraCard;
    img.alt = card.englishName;
    img.className = "sakura-card animate__animated animate__zoomIn";
    // append it to the card container
    cardContainer.appendChild(img);
    getRandomButton.innerHTML = "Hide Card";
  }
};

getRandomButton.addEventListener("click", displayOneRandomCard);

// When the card is clicked
// Display more card information in a pop-up window
