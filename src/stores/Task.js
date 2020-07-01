import { observable } from 'mobx';


export class Task {
  // @observable taskId;
  @observable taskName;
  @observable description;
  @observable priority;
  @observable deadLine;
  @observable status;
  @observable budget;

  constructor(taskName, description, priority, deadLine, budget) {
    this.taskName = taskName;
    this.description = description;
    this.priority = priority;
    this.deadLine = deadLine;
    this.status = 'Starting';
    this.budget = budget;
  }
}

export default Task;