class MyPromise {
  #queue = [];
  #currentState = "pending";

  get state() {
    return this.#currentState;
  }

  constructor(executor) {
    setTimeout(() => {
      executor(this.#onResolve.bind(this), this.#onReject.bind(this));
    });
  }

  static resolve(data) {
    const promise = new MyPromise((resolve) => resolve(data));
    return promise;
  }

  static reject(data) {
    const promise = new MyPromise((_, reject) => reject(data));
    return promise;
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
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
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      let isFinished = false;
      promises.forEach((promise) => {
        promise
          .then((data) => {
            if (!isFinished) {
              resolve(data);
              isFinished = true;
            }
          })
          .catch((err) => {
            if (!isFinished) {
              reject(err);
              isFinished = true;
            }
          });
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      let promisesData = [];
      let complitedPromises = 0;
      promises.forEach((promise, index) => {
        promise
          .then((data) => {
            promisesData[index] = { status: "fulfilled", value: data };
            complitedPromises++;
            if (complitedPromises === promises.length) {
              resolve(promisesData);
            }
          })
          .catch((err) => {
            promisesData[index] = { status: "rejected", reason: err };
            complitedPromises++;
            if (complitedPromises === promises.length) {
              resolve(promisesData);
            }
          });
      });
    });
  }

  #onResolve = function (data) {
    this.#currentState = "fulfilled";
    this.#triggerCallbacks(data);
  };

  #onReject = function (data) {
    this.#currentState = "rejected";
    this.#triggerCallbacks(data, true);
  };

  #triggerCallbacks = function (data, hasError = false) {
    this.#queue.forEach((obj) => {
      try {
        if (!hasError) {
          if (obj.type === "then") {
            data = obj.handler(data);
          }
        } else {
          if (obj.type === "catch") {
            hasError = false;
            data = obj.handler(data);
          }
        }
        if (obj.type === "finally") {
          obj.handler();
        }
      } catch (err) {
        hasError = true;
        data = err;
      }
    });
    if (hasError) {
      throw new Error(data);
    }
  };

  then(handler) {
    this.#queue.push({ type: "then", handler });
    return this;
  }

  catch(handler) {
    this.#queue.push({ type: "catch", handler });
    return this;
  }

  finally(handler) {
    this.#queue.push({ type: "finally", handler });
    return this;
  }
}

const getPromise = (data, seconds = 0) =>
  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(data);
      } else {
        reject(data);
      }
    }, seconds * 1000);
  });

getPromise("some data", 2)
  .then((data) => data.toUpperCase())
  .then((data) => console.log("w", data))
  .catch((err) => console.log(err))
  .then(() => console.log("Last then"));

MyPromise.allSettled([
  getPromise("some data", 4),
  getPromise("ewee data", 5),
  getPromise("some dsdfdsata", 5),
]).then((data) => console.log("MyPromise.allSettled", data));

MyPromise.race([
  getPromise("some data", 4),
  getPromise("ewee data", 5),
  getPromise("some dsdfdsata", 5),
])
  .then((data) => console.log("MyPromise.race", data))
  .catch(() => console.log("Error, MyPromise.race"));
