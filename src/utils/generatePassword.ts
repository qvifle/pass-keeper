import getRandomChar from "./getRandomChar";
import getRandomNumber from "./getRandomNumber";

interface GeneratePasswordArgs {
  length: number;
  letters?: boolean;
  numbers?: boolean;
  specSymbols?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;

  customSymbols?: string;
}

const lettersString = "abcdefghijklmnopqrstuvwxyz";
const numbersString = "0123456789";
const specialCharsString = "!@#$%^&*()_+[]{}|;:,.<>?";

const generatePassword = ({
  letters = false,
  numbers = false,
  specSymbols = false,
  lowercase = false,
  uppercase = false,
  length,
  customSymbols,
}: GeneratePasswordArgs): string => {
  let password = "";

  if (!!customSymbols) {
    for (let i = 0; i < length; i++) {
      password += getRandomChar(customSymbols.replace(/\s+/g, ""));
    }

    return password;
  }

  const chars: string[] = [];
  const cases: string[] = [];

  if (letters) {
    chars.push(lettersString);
  }

  if (numbers) {
    chars.push(numbersString);
  }

  if (specSymbols) {
    chars.push(specialCharsString);
  }

  if (lowercase) {
    cases.push("lower");
  }

  if (uppercase) {
    cases.push("upper");
  }

  if (!chars.length || !cases.length) {
    throw new Error("Wrong input");
  }

  for (let i = 0; i < length; i++) {
    const typeofChar = getRandomNumber(0, chars.length - 1);
    let char = getRandomChar(chars[typeofChar]);

    const charCase = cases[getRandomNumber(0, cases.length - 1)];

    if (charCase === "upper") {
      char = char.toUpperCase();
    }

    password += char;
  }

  return password;
};

export default generatePassword;
