//------------------------------Point-------------------------------------------

class Point {
  constructor(x, y) {
    if (
      typeof x !== "number" ||
      !isFinite(x) ||
      typeof y !== "number" ||
      !isFinite(y)
    ) {
      throw new TypeError("Error: Incorrect input arguments");
    }
    this.x = x;
    this.y = y;
  }

  plus(point) {
    if (point instanceof Point) {
      return new Point(this.x + point.x, this.y + point.y);
    }
    throw new TypeError("Error: Incorrect input arguments");
  }
}

console.log("1 - Point");
console.log(new Point(1, 2).plus(new Point(2, 1)));
console.log();

//--------------------------Speaker-and-Screamer--ES5---------------------------

function Speaker(name) {
  this.name = name;

  Speaker.prototype.speak = function (speech) {
    console.log(`${this.name} says ${speech}`);
  };
}

function Screamer(...args) {
  Object.assign(this, new Speaker(...args));
  Object.setPrototypeOf(Screamer.prototype, Speaker.prototype);

  Screamer.prototype.speak = function (speech) {
    console.log(`${this.name} shouts ${speech.toUpperCase()}`);
  };
}

console.log("2 - Speaker-and-Screamer--ES5");
new Speaker("Mr. Calm").speak("easy, man");
new Screamer("Mr. Loud").speak("hell yeah");
console.log();

//--------------------------Speaker-and-Screamer--ES6---------------------------

class Speaker2 {
  constructor(name) {
    this.name = name;
  }

  speak(speech) {
    console.log(`${this.name} says ${speech}`);
  }
}

class Screamer2 extends Speaker2 {
  speak(speech) {
    console.log(`${this.name} shouts ${speech.toUpperCase()}`);
  }
}

console.log("2 - Speaker-and-Screamer--ES6");
new Speaker2("Mr. Calm").speak("easy, man");
new Screamer2("Mr. Loud").speak("hell yeah");
console.log();

//-------------------------------BookLists--------------------------------------

class Book {
  constructor(configurationObject = {}) {
    if (!(configurationObject instanceof Object)) {
      throw new TypeError("Error: Incorrect input argument");
    }
    const { title, genre, author, isRead, dateFinished } = configurationObject;
    if (!title) {
      throw new Error("Error. 'title' field is required");
    }
    this.title = title;
    this.genre = genre || null;
    this.author = author || null;
    this.isRead = !!isRead;
    this.dateFinished = dateFinished || null;
  }

  markAsRead() {
    this.isRead = true;
    this.dateFinished = new Date();
  }
}

class BookList {
  booksFinished = 0;
  booksNotFinished = 0;
  nextBook = null;
  currentBook = null;
  lastBook = null;
  books = [];

  add(book) {
    if (!(book instanceof Book)) {
      throw new TypeError("Error. Argument must be instance of 'Book'");
    }
    this.books.push(book);
    if (book.isRead) {
      this.booksFinished++;
    } else {
      this.booksNotFinished++;
      this.currentBook = this.currentBook || book;
    }
    this.nextBook =
      !this.nextBook && this.currentBook !== book ? book : this.nextBook;
  }

  finishCurrentBook() {
    if (!this.currentBook) {
      return;
    }
    this.booksFinished++;
    this.booksNotFinished--;
    this.currentBook.markAsRead();
    this.lastBook = this.currentBook;
    this.currentBook = this.nextBook;
    this.nextBook = this.#setNextBook();
  }

  #setNextBook() {
    const prevBookIdx = this.books.indexOf(this.lastBook);
    return this.books[prevBookIdx + 2] || null;
  }
}

console.log("3 - BookList");

const book = new Book({ title: "Title" });
const book2 = new Book({ title: "Title2" });
const list = new BookList();

list.add(book);
list.add(book2);
console.log(list.lastBook);
console.log(list.currentBook);
console.log(list.nextBook);
console.log();
list.finishCurrentBook();
console.log(list.lastBook);
console.log(list.currentBook);
console.log(list.nextBook);
console.log();
list.finishCurrentBook();
console.log(list.lastBook);
console.log(list.currentBook);
console.log(list.nextBook);
list.finishCurrentBook();
console.log(list.lastBook);
console.log(list.currentBook);
console.log(list.nextBook);
console.log();
console.log(list.booksFinished);
console.log(list.booksNotFinished);
