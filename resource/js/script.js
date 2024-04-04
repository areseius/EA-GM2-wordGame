const check = document.querySelector(".check");
const reset = document.querySelector(".playAgain");
const word = document.querySelector(".guessing");
const input = document.querySelector("input");
const resultScreen = document.querySelector(".resultScreen");
const joker = document.querySelector(".jokerArea");
const highScore = document.querySelector(".highScore");
const chance = document.querySelector(".chance");

const names = [
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
  "natiq",
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

let secretName = names[Math.floor(Math.random() * names.length)];

word.textContent = secretName
  .split("")
  .map((_) => "_")
  .join(" ");

// win screen

const showWinScreen = () => {
  resultScreen.children[0].textContent = "YOU WON !!!";
  resultScreen.style.backgroundColor = "green";
  resultScreen.children[1].textContent = `You found the hidden word. This word is "${secretName[0].toUpperCase()}${secretName.slice(
    1
  )}"`;
  resultScreen.style.visibility = "visible";
};

// fail screen

const showFailScreen = () => {
  resultScreen.children[0].textContent = "GAME OVER !!!";
  resultScreen.style.backgroundColor = "red";
  resultScreen.children[1].textContent = "You used all your chances.";
  resultScreen.style.visibility = "visible";
};

// update high score

const updateHighScore = () => {
  if (+highScore.children[0].textContent < +chance.children[0].textContent)
    highScore.children[0].textContent = chance.children[0].textContent;
};

// check

check.addEventListener("click", (e) => {
  e.preventDefault();

  if (chance.children[0].textContent == 1) showFailScreen();

  word.textContent = word.textContent
    .split("")
    .filter((x) => x != " ")
    .map((x, i) =>
      input.value.trim().toLowerCase()[i] == secretName[i]
        ? input.value.trim().toLowerCase()[i]
        : x
    )
    .join(" ");

  if (
    word.textContent
      .split("")
      .filter((x) => x != " ")
      .join("") == secretName
  ) {
    updateHighScore();
    showWinScreen();
  } else {
    input.value = "";
    +chance.children[0].textContent--;
  }
});

// play again

reset.addEventListener("click", (e) => {
  e.preventDefault();
  chance.children[0].textContent = 20;
  resultScreen.style.visibility = "hidden";
  secretName = names[Math.floor(Math.random() * names.length)];
  word.textContent = secretName
    .split("")
    .map((_) => "_")
    .join(" ");

  input.value = "";
  joker.children[1].textContent = 2;
});

// joker

joker.addEventListener("click", (e) => {
  e.preventDefault();
  if (chance.children[0].textContent == 1) showFailScreen();

  const nonOpenedIndexes = word.textContent
    .split("")
    .filter((x) => x != " ")
    .map((x, i) => (x == "_" ? i : -1))
    .filter((x) => x != -1);

  const nonOpenedIndex =
    nonOpenedIndexes[Math.floor(Math.random() * nonOpenedIndexes.length)];

  let jokeredWord = word.textContent.split("").filter((x) => x != " ");

  jokeredWord[nonOpenedIndex] = secretName[nonOpenedIndex];

  if (+joker.children[1].textContent) {
    word.textContent = jokeredWord.join(" ");
    if (
      word.textContent
        .split("")
        .filter((x) => x != " ")
        .join("") == secretName
    ) {
      updateHighScore();
      showWinScreen();
    }

    +chance.children[0].textContent--;
    +joker.children[1].textContent--;
  }
});
