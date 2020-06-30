import { observable } from 'mobx';

export class Task {
  @observable taskId;
  @observable taskName;
  @observable description;
  @observable priority;
  @observable deadLine;
  @observable status;
  @observable budget;

  constructor(taskId, taskName, description, priority, deadLine, status, budget) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.description = description;
    this.priority = priority;
    this.deadLine = deadLine;
    this.status = status;
    this.budget = budget;
  }
}
