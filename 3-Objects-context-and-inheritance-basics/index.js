//--------------------------arrayToList-----------------------------------------

const arrayToList = (arr) =>
  arr.length ? { value: arr[0], rest: arrayToList(arr.slice(1)) } : null;

console.log("1 - arrayToList");
console.log(arrayToList([10, 20, 30]));
console.log();

//--------------------------listToArray-----------------------------------------

const listToArray = (list) =>
  list ? [list.value, ...listToArray(list.rest)] : [];

console.log("2 - listToArray");
console.log(listToArray(arrayToList([10, 20, 30])));
console.log();

//------------------------getKeyValuePairs--------------------------------------

const getKeyValuePairs = (obj) => Object.entries(obj);

console.log("3 - getKeyValuePairs");
console.log(
  getKeyValuePairs({ red: "#FF0000", green: "#00FF00", white: "#FFFFFF" })
);
console.log();

//---------------------------listToArray----------------------------------------

const invertKeyValue = (obj) =>
  Object.fromEntries(Object.entries(obj).map((el) => [el[1], el[0]]));

console.log("4 - invertKeyValue");
console.log(
  invertKeyValue({ red: "#FF0000", green: "#00FF00", white: "#FFFFFF" })
);
console.log();

//---------------------------getAllMethods----------------------------------------

const getAllMethods = (obj) =>
  Object.getOwnPropertyNames(obj).filter(
    (item) => obj[item] instanceof Function
  );

console.log("5 - getAllMethods");
console.log(getAllMethods(Math));
console.log();

//-------------------------------Clock------------------------------------------

function Clock() {
  var interval;

  var formatTimeFromDate = function (date) {
    return date.toTimeString().split(" ")[0];
  };

  Clock.getCurrentTime = function () {
    return formatTimeFromDate(new Date());
  };

  Clock.prototype.run = function () {
    console.log(Clock.getCurrentTime());
    interval = setInterval(() => console.log(Clock.getCurrentTime()), 1000);
  };

  Clock.prototype.stop = function () {
    clearInterval(interval);
  };
}

console.log("6 - Clock");
const clock = new Clock();
clock.run();
setTimeout(() => clock.stop(), 6000);
console.log();

//-------------------------------Group------------------------------------------

class Group {
  #group = [];

  static from(arr) {
    const group = new Group();
    arr.forEach((el) => group.add(el));
    return group;
  }

  add(value) {
    if (!this.#group.includes(value)) {
      this.#group.push(value);
    }
  }

  delete(value) {
    const index = this.#group.indexOf(value);
    if (index >= 0) {
      this.#group.splice(index, 1);
    }
  }

  has(value) {
    return this.#group.includes(value);
  }
}

console.log("7 - Group");
const group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));
console.log();
