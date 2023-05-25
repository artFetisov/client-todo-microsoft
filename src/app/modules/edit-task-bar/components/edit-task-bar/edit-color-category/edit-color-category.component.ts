import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColorCategory, Task} from "../../../../../shared/data/model/task";
import {colorCategories} from "../../../../../shared/data/data/colorCategories";

@Component({
  selector: 'app-edit-color-category',
  templateUrl: './edit-color-category.component.html',
  styleUrls: ['./edit-color-category.component.scss']
})
export class EditColorCategoryComponent implements OnInit {
  @Input() selectedTask!: Task
  @Output() changeColorCategoryEvent = new EventEmitter<{ taskId: number, colorCategory: ColorCategory, categoryId: number }>()
  @Output() deleteColorCategoryEvent = new EventEmitter<{ taskId: number, colorCategory: ColorCategory, categoryId: number }>()

  colorCategories!: ColorCategory[]

  ngOnInit() {
    this.colorCategories = colorCategories
  }

  changeColorCategoryHandler(colorCat: ColorCategory) {
    if (this.checkHaveColor(colorCat)) {
      this.deleteColorCategoryHandler(colorCat)
      return
    }

    this.changeColorCategoryEvent.emit({
      taskId: this.selectedTask.id,
      colorCategory: colorCat,
      categoryId: this.selectedTask.categoryId
    })
  }

  deleteColorCategoryHandler(colorCat: ColorCategory) {
    this.deleteColorCategoryEvent.emit({
      taskId: this.selectedTask.id,
      colorCategory: colorCat,
      categoryId: this.selectedTask.categoryId
    })
  }

  checkHaveColor(color: ColorCategory) {
    return this.selectedTask.colorCategory?.find(c => c.id === color.id)
  }
}
