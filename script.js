let allCards = fetch("https://protected-taiga-89091.herokuapp.com/api/card")
  .then(function (res) {
    if (res.status == 200) {
      res.json();
      console.log(`The API returned: ${allCards.message}`);
    }
  })
  .catch(function (err) {
    console.log(err);
  });

console.log(allCards);
