import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../../../../shared/data/model/category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category!: Category
  @Input() activeCategory!: Category
  @Input() countUncompletedTasks!: number
  @Output() setActiveCategoryEvent = new EventEmitter<Category>()
  @Output() getTasks = new EventEmitter<{ categoryId: number }>()


  hoveredCategory: Category | null = null

  ngOnInit() {
    this.getTasksByCategoryIdHandler()
  }

  getTasksByCategoryIdHandler() {
    this.getTasks.emit({categoryId: this.category.id})
  }

  hoverEnterCategoryHandler(category: Category) {
    this.hoveredCategory = category
  }

  hoverLeaveCategoryHandler() {
    this.hoveredCategory = null
  }

  setActiveCategoryHandler(category: Category) {
    this.setActiveCategoryEvent.emit(category)
  }
}
