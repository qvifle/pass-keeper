function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export default getRandomNumber;
