function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(getRandomNumber(min, max));
}
