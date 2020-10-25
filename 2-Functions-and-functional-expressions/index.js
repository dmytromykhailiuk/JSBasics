//--------------------------mergeWords------------------------------------------

const mergeWords = (word) => {
  const words = [];
  const recursiveFn = (word) => {
    if (word) {
      words.push(word);
      return recursiveFn;
    }
    return words.join(" ");
  };
  return recursiveFn(word);
};

console.log("1 - mergeWords");
console.log(mergeWords("GNU")("is")("not")("Unix.")());
console.log();

//-------------------------checkUsersValid--------------------------------------

const checkUsersValid = (goodUsers) => (testUsers) =>
  testUsers.every((testUser) =>
    goodUsers.some((goodUser) => goodUser.id === testUser.id)
  );

console.log("2 - checkUsersValid");
const goodUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
const testAllValid = checkUsersValid(goodUsers);
console.log(testAllValid([{ id: 2 }, { id: 1 }]));
console.log(testAllValid([{ id: 2 }, { id: 4 }, { id: 1 }]));
console.log();

//----------------------------countWords----------------------------------------

const countWords = (words) =>
  words.reduce(
    (acc, word) => ({ ...acc, [word]: acc[word] ? ++acc[word] : 1 }),
    {}
  );

console.log("3 - countWords");
const inputWords = ["Apple", "Banana", "Apple", "Durian", "Durian", "Durian"];
console.log(countWords(inputWords));
console.log();

//---------------------------isPalindrome---------------------------------------

const isPalindrome = (string) =>
  string.length < 2
    ? true
    : string[0].toLowerCase() === string[string.length - 1].toLowerCase()
    ? isPalindrome(string.slice(1, string.length - 1))
    : false;

console.log("4 - isPalindrome");
console.log(isPalindrome("madam"));
console.log(isPalindrome("fox"));
console.log();

const isPalindrome2 = (string) =>
  string.split("").reverse().join("") === string;

console.log("4 - isPalindrome2");
console.log(isPalindrome2("madam"));
console.log(isPalindrome2("fox"));
console.log();

//-----------------------------factorial----------------------------------------

const factorial = (number) =>
  typeof number !== "number" || number < 0
    ? undefined
    : number < 2
    ? 1
    : number * factorial(number - 1);

console.log("5 - factorial");
console.log(factorial(5));
console.log();

//--------------------------amountToCoins---------------------------------------

const amountToCoins = (sum, coins) => {
  const coin = coins.find((coin) => sum - coin >= 0);
  return coin ? [coin, ...amountToCoins(sum - coin, coins)] : [];
};

console.log("6 - amountToCoins");
console.log(amountToCoins(46, [25, 10, 5, 2, 1]));
console.log();

//------------------------------repeat------------------------------------------

const repeat = (fn, times) =>
  fn instanceof Function && typeof times === "number" && times > 0
    ? [fn(), ...repeat(fn, times - 1)]
    : [];

console.log("7 - repeat");
console.log(repeat(() => console.log("Wassup"), 5));
console.log(repeat(() => 2, 5));
console.log();

//------------------------------reduce------------------------------------------

const reduce = (arr, f, initialAcc) => {
  if (!Array.isArray(arr) || !(f instanceof Function)) {
    throw new TypeError("Error: Incorrect input arguments");
  }
  let acc;
  let i = 0;
  if (initialAcc !== undefined) {
    acc = initialAcc;
  } else {
    acc = arr[i];
    i++;
  }
  while (i < arr.length) {
    acc = f(acc, arr[i], i, arr);
    i++;
  }
  return acc;
};

console.log("8 - reduce");
console.log(reduce([1, 2, 3], (prev, curr, index, arr) => prev + curr, 0));
console.log();

const reduceRight = (arr, f, initialAcc) => {
  if (!Array.isArray(arr) || !(f instanceof Function)) {
    throw new TypeError("Error: Incorrect input arguments");
  }
  let acc;
  let i = arr.length - 1;
  if (initialAcc !== undefined) {
    acc = initialAcc;
  } else {
    acc = arr[i];
    i--;
  }
  while (i > 0) {
    acc = f(acc, arr[i], i, arr);
    i--;
  }
  return acc;
};

console.log("8 - reduceRight");
console.log(reduce([1, 2, 3], (prev, curr, index, arr) => prev + curr, 0));
console.log();
