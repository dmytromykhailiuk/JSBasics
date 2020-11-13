import { tranformDate } from "../helpers/tranformDate.helper";

export class TodoItem {
  constructor(name, isDone, creationDate, closingDate) {
    this.name = name;
    this.isDone = isDone || false;
    this.creationDate = creationDate || tranformDate(new Date());
    this.closingDate = closingDate || null;
    this.isEditMode = false;
  }

  triggerStatus() {
    this.isDone = !this.isDone;
    this.closingDate = this.isDone ? tranformDate(new Date()) : null;
  }
}
