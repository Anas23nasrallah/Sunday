import { observable } from 'mobx';

export class Task {
  @observable _id;
  @observable taskName;
  @observable description;
  @observable priority;
  @observable deadLine;
  @observable status;
  @observable budget;

  constructor(_id, taskName, description, priority, deadLine, status, budget) {
    this._id = _id;
    this.taskName = taskName;
    this.description = description;
    this.priority = priority;
    this.deadLine = deadLine;
    this.status = status;
    this.budget = budget;
  }
}
