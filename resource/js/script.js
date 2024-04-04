const check = document.querySelector(".check");
const reset = document.querySelector(".playAgain");
const word = document.querySelector(".guessing");
const input = document.querySelector("input");
const winScreen = document.querySelector(".winScreen");
const joker = document.querySelector(".jokerArea");
const highScore = document.querySelector(".highScore");
const chance = document.querySelector(".chance");

let words = [
  "ayxan",
  "aydan",
  "aygun",
  "aytac",
  "eldost",
  "elnare",
  "elnur",
  "elnure",
  "qizxanim",
  "suray",
  "nezife",
  "nurane",
  "nuru",
  "qelemnaz",
  "resul",
  "rufet",
  "sevinc",
  "samil",
  "zehra",
  "togrul",
  "yegane",
  "zibeyde",
  "ilqar",
  "neman",
];

let guessedWord = words[Math.floor(Math.random() * words.length)];

word.textContent = guessedWord
  .split("")
  .map((_) => "_")
  .join(" ");

// check

check.addEventListener("click", (e) => {
  e.preventDefault();

  if (chance.children[0].textContent == 1) {
    winScreen.children[0].textContent = "GAME OVER !!!";
    winScreen.style.backgroundColor = "red";
    winScreen.children[1].textContent = "You used all your chances.";
    winScreen.style.visibility = "visible";
  }

  word.textContent = word.textContent
    .split("")
    .filter((x) => x != " ")
    .map((x, i) =>
      input.value.trim().toLowerCase()[i] == guessedWord[i]
        ? input.value.trim().toLowerCase()[i]
        : x
    )
    .join(" ");

  if (
    word.textContent
      .split("")
      .filter((x) => x != " ")
      .join("") == guessedWord
  ) {
    +highScore.children[0].textContent < +chance.children[0].textContent &&
      (highScore.children[0].textContent = chance.children[0].textContent);

    winScreen.children[0].textContent = "YOU WON !!!";
    winScreen.style.backgroundColor = "green";
    winScreen.children[1].textContent = `You found the hidden word. This word is "${guessedWord[0].toUpperCase()}${guessedWord.slice(
      1
    )}"`;
    winScreen.style.visibility = "visible";
  } else {
    input.value = "";
    +chance.children[0].textContent--;
  }
});

// play again

reset.addEventListener("click", (e) => {
  e.preventDefault();
  chance.children[0].textContent = 20;
  winScreen.style.visibility = "hidden";
  guessedWord = words[Math.floor(Math.random() * words.length)];
  word.textContent = guessedWord
    .split("")
    .map((_) => "_")
    .join(" ");

  input.value = "";
  joker.children[1].textContent = 2;
});

// joker

joker.addEventListener("click", (e) => {
  e.preventDefault();
  if (chance.children[0].textContent == 1) {
    winScreen.children[0].textContent = "GAME OVER !!!";
    winScreen.style.backgroundColor = "red";
    winScreen.children[1].textContent = "You used all your chances.";
    winScreen.style.visibility = "visible";
  }
  let nonOpenedIndexes = word.textContent
    .split("")
    .filter((x) => x != " ")
    .map((x, i) => (x == "_" ? i : -1))
    .filter((x) => x != -1);

  let nonOpenedIndex =
    nonOpenedIndexes[Math.floor(Math.random() * nonOpenedIndexes.length)];

  let jokeredWord = word.textContent.split("").filter((x) => x != " ");

  jokeredWord[nonOpenedIndex] = guessedWord[nonOpenedIndex];

  if (+joker.children[1].textContent) {
    +chance.children[0].textContent--;
    word.textContent = jokeredWord.join(" ");
    +joker.children[1].textContent--;
    word.textContent
      .split("")
      .filter((x) => x != " ")
      .join("") == guessedWord &&
      (winScreen.style.visibility = "visible") &&
      (winScreen.children[1].textContent = `You found the hidden word. This word is "${guessedWord[0].toUpperCase()}${guessedWord.slice(
        1
      )}"`);
  }
});
