import { observable } from 'mobx';


export class Task {
  @observable taskName;
  @observable description;
  @observable priority;
  @observable deadLine;
  @observable status;
  @observable budget;
  @observable category;

  constructor(id, taskName, description, priority, deadLine, budget, category) {
    this.id = id
    this.taskName = taskName;
    this.description = description;
    this.priority = priority;
    this.deadLine = deadLine;
    this.status = 'Starting';
    this.budget = budget;
    this.category = category
  }
}

export default Task;