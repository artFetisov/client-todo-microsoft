import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../../../shared/data/model/task";
import {ThemeColor} from "../../../../../shared/data/model/category";

@Component({
  selector: 'app-add-step-form',
  templateUrl: './add-step-form.component.html',
  styleUrls: ['./add-step-form.component.scss']
})
export class AddStepFormComponent {
  @Input() selectedTask!: Task
  @Input() activeThemeColor!: ThemeColor
  @Output() addStepEvent = new EventEmitter<{ taskId: number, stepTitle: string; categoryId: number }>()

  isEditMode = false
  tmpTitle = ''

  toggleEditMode() {
    this.tmpTitle = ''
    this.isEditMode = !this.isEditMode
  }

  addStepHandler() {
    if (this.tmpTitle.trim().length > 0) {
      this.addStepEvent.emit({
        taskId: this.selectedTask.id,
        stepTitle: this.tmpTitle,
        categoryId: this.selectedTask.categoryId
      })
    }
    this.tmpTitle = ''
  }
}
