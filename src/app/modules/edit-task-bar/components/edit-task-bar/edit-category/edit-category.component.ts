import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../../shared/data/model/category';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Task } from '../../../../../shared/data/model/task';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent {
  @Input() activeCategory!: Category;
  @Input() categories!: Category[];
  @Input() selectedTask!: Task;
  @Output() changeCategoryEvent = new EventEmitter<number>();

  constructor(private modal: NzModalService) {}

  showChangeCategoryConfirm(category: Category): void {
    this.modal.confirm({
      nzTitle: `Вы действительно переместить задачу ${this.selectedTask.title} в список под названием ${category.title}?`,
      nzOkText: 'Да',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.changeCategoryEvent.emit(category.id),
      nzCancelText: 'Нет',
    });
  }

  changeTaskCategoryHandler(category: Category) {
    this.showChangeCategoryConfirm(category);
  }
}
