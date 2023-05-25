import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task, UpdateTaskData} from "../../../../../shared/data/model/task";
import {ThemeColor} from "../../../../../shared/data/model/category";

@Component({
  selector: 'app-edit-bar-head',
  templateUrl: './edit-bar-head.component.html',
  styleUrls: ['./edit-bar-head.component.scss']
})
export class EditBarHeadComponent {
  @Output() changeTaskEvent = new EventEmitter<UpdateTaskData>()
  @Input() selectedTask!: Task
  @Input() tmpTitle!: string
  @Input() activeThemeColor!: ThemeColor
  isEditMode = false

  toggleEditMode() {
    this.isEditMode = !this.isEditMode
  }

  changeTaskStatusHandler() {
    this.changeTaskEvent.emit({
      taskId: this.selectedTask.id,
      categoryId: this.selectedTask.categoryId,
      newDataObj: {completed: !this.selectedTask.completed}
    })
  }

  changeTaskTitleHandler() {
    this.changeTaskEvent.emit({
      taskId: this.selectedTask.id,
      newDataObj: {title: this.tmpTitle},
      categoryId: this.selectedTask.categoryId,
    })
    this.toggleEditMode()
  }

  changeTaskPriorityHandler() {
    this.changeTaskEvent.emit({
      taskId: this.selectedTask.id,
      categoryId: this.selectedTask.categoryId,
      newDataObj: {
        priority: !this.selectedTask.priority
      }
    })
  }
}
