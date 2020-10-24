//----------------------------changeCase----------------------------------------

const changeCase = (string) =>
  string
    .split("")
    .map((el) =>
      el.toUpperCase() !== el ? el.toUpperCase() : el.toLowerCase()
    )
    .join("");

console.log("1 - changeCase");
console.log(changeCase("21century"));
console.log(changeCase("Hybris"));
console.log();

//---------------------------filterNonUnique------------------------------------

const filterNonUnique = (arr) =>
  arr.filter((val) => arr.indexOf(val) === arr.lastIndexOf(val));

console.log("2 - filterNonUnique");
console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5]));
console.log(filterNonUnique([1, 2, 3, 4]));
console.log();

const filterNonUniqueWithMemo = (arr) =>
  arr.reduce(
    (acc, val, idx) => ({
      outputArr: acc.memo[val]
        ? acc.outputArr
        : idx === arr.lastIndexOf(val)
        ? [...acc.outputArr, val]
        : acc.outputArr,
      memo: { ...acc.memo, [val]: true },
    }),
    { memo: {}, outputArr: [] }
  ).outputArr;

console.log("2 - filterNonUniqueWithMemo");
console.log(filterNonUniqueWithMemo([1, 2, 2, 3, 4, 4, 5]));
console.log(filterNonUniqueWithMemo([1, 2, 3, 4]));
console.log();

//---------------------------alphabetSort---------------------------------------

const alphabetSort = (string) => string.split("").sort().join("");

console.log("3 - alphabetSort");
console.log(alphabetSort("Python"));
console.log();

//-------------------------getSecondMimimum-------------------------------------

const getSecondMimimum = (arr) => arr.sort((a, b) => a - b)[1];

console.log("4 - getSecondMimimum");
console.log(getSecondMimimum([5, 0, 7, 3, 8]));
console.log();

//--------------------------doubleEveryEven-------------------------------------

const doubleEveryEven = (arr) =>
  arr.map((val) => (val % 2 === 0 ? val * 2 : val));

console.log("5 - doubleEveryEven");
console.log(doubleEveryEven([2, 0, 7, 3, 8, 4]));
console.log();

//------------------------getArrayElementsPairs---------------------------------

const getArrayElementsPairs = (arr1, arr2) =>
  arr1.reduce((acc, el1) => [...acc, ...arr2.map((el2) => [el1, el2])], []);

console.log("6 - getArrayElementsPairs");
console.log(getArrayElementsPairs([1, 2], ["a", "b"]));
console.log();

const getArrayElementsMultiPairs = (...arrs) =>
  arrs.length === 0
    ? []
    : arrs.length === 1
    ? arrs[0]
    : getArrayElementsMultiPairs(
        arrs[0].reduce(
          (acc, el1) => [
            ...acc,
            ...arrs[1].map((el2) =>
              Array.isArray(el1) ? [...el1, el2] : [el1, el2]
            ),
          ],
          []
        ),
        ...arrs.slice(2)
      );

console.log("6 - getArrayElementsMultiPairs");
console.log(getArrayElementsMultiPairs([1, 2], ["a", "b"]));
console.log(
  getArrayElementsMultiPairs([1, 2], ["a", "b", "c"], ["up", "down"])
);
console.log();

//-------------------------------deepEqual--------------------------------------

const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 === "function" && typeof obj2 === "function") {
    return obj1.toString() === obj2.toString();
  }
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }
  if (
    {}.toString.call(obj1) !== {}.toString.call(obj2) ||
    typeof obj1 !== "object"
  ) {
    return false;
  }
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  return (
    obj1Keys.length === obj2Keys.length &&
    obj1Keys.every((key) => deepEqual(obj1[key], obj2[key]))
  );
};

console.log("7 - deepEqual");
let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, { here: 1, object: 2 }));
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
console.log();

//----------------------------formatDate----------------------------------------

const formatDate = (value) =>
  (Array.isArray(value)
    ? new Date(...value)
    : new Date(value)
  ).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

console.log("8 - formatDate");
console.log(formatDate("2011-10-02"));
console.log(formatDate(1234567890000));
console.log(formatDate([2014, 0, 1]));
console.log(formatDate(new Date(2014, 0, 1)));
console.log(formatDate("Incorect Input Value"));
