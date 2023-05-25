import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task, UpdateTaskData} from "../../../../../shared/data/model/task";
import {ThemeColor} from "../../../../../shared/data/model/category";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() set task(task: Task) {
    this.taskItem = task
    this.completedStepsLength = task.steps.filter(s => s.completed).length
  }

  @Input() activeThemeColor!: ThemeColor
  @Output() changeTaskStatusEvent = new EventEmitter<UpdateTaskData>()
  @Output() selectTaskEvent = new EventEmitter<Task>()
  @Output() changeTaskPriorityEvent = new EventEmitter<UpdateTaskData>()

  taskItem!: Task
  completedStepsLength!: number

  changeTaskStatusHandler() {
    this.changeTaskStatusEvent.emit({
      taskId: this.taskItem.id,
      categoryId: this.taskItem.categoryId,
      newDataObj: {completed: !this.taskItem.completed}
    })
  }

  changeTaskPriorityHandler() {
    this.changeTaskPriorityEvent.emit({
      taskId: this.taskItem.id,
      categoryId: this.taskItem.categoryId,
      newDataObj: {priority: !this.taskItem.priority}
    })
  }

  selectTaskHandler() {
    this.selectTaskEvent.emit(this.taskItem)
  }
}
