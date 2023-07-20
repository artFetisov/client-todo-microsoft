import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category, ThemeColor} from "../../../../../shared/data/model/category";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  tmpTitle!: string
  isEditMode = true

  @Input() activeThemeColor!: ThemeColor
  @Input() activeCategory!: Category
  @Output() addTaskEvent = new EventEmitter<{ title: string, categoryId: number }>()

  toggleEditMode() {
    this.tmpTitle = ''
    this.isEditMode = !this.isEditMode
  }

  addTaskHandler() {
    if (this.tmpTitle.trim().length > 0) {
      this.addTaskEvent.emit({title: this.tmpTitle, categoryId: this.activeCategory.id})
      this.tmpTitle = ''
    }
  }
}
