const body = document.querySelector("body");
const IMG_NUMBER = 7;

function handleImgLoad() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./images/${imgNumber + 1}.jpg`;
  //Math.random() 함수가 0을 줄 수 도 있기 때문에 +1
  image.classList.add("bgImage");
  //body.appendChild(image);
  //image.addEventListener("loadend", handleImgLoad);
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
