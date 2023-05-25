import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task, UpdateTaskData} from "../../../../../shared/data/model/task";

@Component({
  selector: 'app-edit-date',
  templateUrl: './edit-date.component.html',
  styleUrls: ['./edit-date.component.scss']
})
export class EditDateComponent {
  @Input() selectedTask!: Task
  @Output() changeDateEvent = new EventEmitter<UpdateTaskData>()

  isEditMode = false
  date: Date | null = null

  toggleEditMode() {
    this.isEditMode = !this.isEditMode
  }

  changeTaskDateHandler(date: Date): void {
    this.changeDateEvent.emit({
      taskId: this.selectedTask.id,
      categoryId: this.selectedTask.categoryId,
      newDataObj: {completionDate: date}
    })
  }
}
