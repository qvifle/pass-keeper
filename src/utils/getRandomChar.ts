function getRandomChar(inputString: string) {
  if (!inputString || inputString.length === 0) {
    throw new Error("Input string must not be empty.");
  }
  const randomIndex = Math.floor(Math.random() * inputString.length);
  return inputString[randomIndex];
}

export default getRandomChar;
