export class TodoStorage {
  constructor(place, todoListData) {
    this.place = place;
    this.todoListData = todoListData;
  }

  saveData() {
    localStorage.setItem(
      this.place,
      JSON.stringify(this.todoListData.todoItems)
    );
  }

  getData(fn) {
    fn(JSON.parse(localStorage.getItem(this.place)) || []);
  }
}
