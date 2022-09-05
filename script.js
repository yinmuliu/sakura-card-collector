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
  if (showAllButton.innerHTML === "Hide All Cards") {
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.lastChild);
    }
    showAllButton.innerHTML = "Show All Sakura Cards";
  } else {
    const res = await fetch(cardURL);
    const result = await res.json();
    const cards = result.data;
    for (let i = 0; i < availableCards; i++) {
      let img = document.createElement("img");
      img.src = cards[i].sakuraCard;
      img.alt = cards[i].englishName;
      img.className = "sakura-card";
      cardContainer.appendChild(img);
    }
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
    img.className = "sakura-card";
    // append it to the card container
    cardContainer.appendChild(img);
    getRandomButton.innerHTML = "Hide Card";
  }
};

getRandomButton.addEventListener("click", displayOneRandomCard);

// When the card is clicked
// Display more card information in a pop-up window
