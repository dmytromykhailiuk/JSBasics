import { tranformDate } from "../helpers/tranformDate.helper";

export class TodoItem {
  constructor(name) {
    this.name = name;
    this.isDone = false;
    this.creationDate = tranformDate(new Date());
    this.closingDate = null;
  }

  triggerStatys() {
    this.isDone = !this.isDone;
    this.closingDate = this.isDone ? tranformDate(new Date()) : null;
  }
}
