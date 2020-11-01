//------------------------------delay-------------------------------------------

const delay = (milisec) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), milisec);
  });

console.log("1 - delay");
delay(1000).then(() => console.log("Hey!"));

//------------------------runPromisesInSeries-----------------------------------

const runPromisesInSeries = (fns) =>
  fns[0] ? fns[0]().then(() => runPromisesInSeries(fns.slice(1))) : "finsh";

setTimeout(() => {
  console.log();
  console.log("2 - runPromisesInSeries");

  runPromisesInSeries([
    () =>
      delay(1000).then(() => {
        console.log("message in 1 second");
      }),
    () =>
      delay(3000).then(() => {
        console.log("message in 3 seconds");
      }),
  ]);
}, 1500);

//-----------------------------Promise_all--------------------------------------

const Promise_all = (promises) => {
  return new Promise((resolve, reject) => {
    let promisesData = [];
    let resolvedPromises = 0;
    promises.forEach((promise, index) => {
      promise
        .then((data) => {
          promisesData[index] = data;
          resolvedPromises++;
          if (resolvedPromises === promises.length) {
            resolve(promisesData);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

setTimeout(() => {
  console.log();
  console.log("3 - Promise_all");

  Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
    console.log("This should be [1, 2, 3]:", array);
  });

  Promise_all([soon(1), Promise.reject("X"), soon(3)])
    .then((array) => {
      console.log("We should not get here");
    })
    .catch((error) => {
      if (error != "X") {
        console.log("Unexpected failure:", error);
      }
    });
}, 6500);

//------------------------------fibonacci---------------------------------------

function* fibonacci(number) {
  const fibArr = [];
  for (let i = 0; i < number; i++) {
    if (i === 0) {
      fibArr[i] = 0;
      yield fibArr[i];
    } else if (i === 1) {
      fibArr[i] = 1;
      yield fibArr[i];
    } else {
      fibArr[i] = fibArr[i - 1] + fibArr[i - 2];
      yield fibArr[i];
    }
  }
}

setTimeout(() => {
  console.log();
  console.log("4 - fibonacci");
  let [...first10] = fibonacci(10);
  console.log(first10);
}, 8000);

//--------------------------Generator-helper------------------------------------

const helper = (generator) => {
  const generatorObj = generator();
  const recursiveFn = (value) => {
    const status = generatorObj.next(value);
    if (!status.done) {
      status.value
        .then((value) => {
          recursiveFn(value);
        })
        .catch((err) => console.error("error happened", err));
    }
  };
  recursiveFn();
};

setTimeout(() => {
  console.log();
  console.log("5 - Generator-helper");

  const asyncTask1 = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve("first resolved"), 1000)
    );
  const asyncTask2 = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve("second resolved"), 1000)
    );
  const asyncTask3 = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => reject("third rejected"), 1000)
    );
  console.log("invoke helper");

  helper(function* main() {
    try {
      const a = yield asyncTask1();
      console.log(a);
      const b = yield asyncTask2();
      console.log(b);
      const c = yield asyncTask3();
    } catch (e) {
      console.error("error happened", e);
    }
  });
}, 10000);
