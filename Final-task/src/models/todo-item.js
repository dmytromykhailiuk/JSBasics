import { tranformDate } from "../helpers/tranformDate.helper";

export class TodoItem {
  constructor(
    name,
    isDone,
    creationDate,
    creationDateValue,
    closingDate,
    closingDateValue
  ) {
    this.name = name;
    this.isDone = isDone || false;
    this.creationDate = creationDate || tranformDate(new Date());
    this.creationDateValue = creationDateValue || Date.now();
    this.closingDate = closingDate || null;
    this.closingDateValue = closingDateValue || Date.now();
    this.isEditMode = false;
  }

  triggerStatus() {
    this.isDone = !this.isDone;
    this.closingDate = this.isDone ? tranformDate(new Date()) : null;
  }
}
