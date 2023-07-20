import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from '../../../tasks/services/tasks.service';
import {Observable, Subscription} from 'rxjs';
import {
  ColorCategory,
  Task,
  UpdateTaskData,
} from '../../../../shared/data/model/task';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CategoriesService} from '../../../categories/services/categories.service';
import {Category, ThemeColor} from '../../../../shared/data/model/category';
import {HtmlTemplateService} from '../../../../shared/services/html-template.service';
import {ThemeColorService} from '../../../../shared/services/theme-color.service';

@Component({
  selector: 'app-edit-task-bar',
  templateUrl: './edit-task-bar.component.html',
  styleUrls: ['./edit-task-bar.component.scss'],
})
export class EditTaskBarComponent implements OnInit, OnDestroy {
  selectedTask!: Task;

  tmpTitle!: string;
  subscription!: Subscription;
  categories$!: Observable<Category[]>;
  activeCategory$!: Observable<Category>;
  activeThemeColor$!: Observable<ThemeColor>;

  constructor(
    private taskService: TasksService,
    private modal: NzModalService,
    private categoryService: CategoriesService,
    private templateService: HtmlTemplateService,
    private themeService: ThemeColorService
  ) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.categories$;
    this.activeThemeColor$ = this.themeService.activeColor$;
    this.activeCategory$ = this.categoryService.activeCategory$;
    this.subscription = this.taskService.selectedTask$.subscribe((t) => {
      this.selectedTask = t;
      this.tmpTitle = t.title;
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  changeTask(data: UpdateTaskData) {
    this.taskService.updateTask(data);
  }

  changeColorCategory(data: { taskId: number; categoryId: number; colorCategory: ColorCategory }) {
    this.taskService.updateColorCategory(data);
  }

  deleteColorCategory(data: { taskId: number; colorCategory: ColorCategory; categoryId: number }) {
    this.taskService.deleteColorCategory(data);
  }

  changeTaskCategory(categoryId: number) {
    this.taskService.updateTask({
      taskId: this.selectedTask.id,
      newDataObj: {categoryId},
      categoryId: this.selectedTask.categoryId
    })

    this.templateService.toggleShowEditBar(false);
  }

  deleteTask() {
    this.showDeleteConfirm();
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Вы действительно хотите удалить задачу?',
      nzOkText: 'Да',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.taskService.deleteTask(this.selectedTask.id, this.categoryService.activeCategory$.getValue().id),
      nzCancelText: 'Нет',
    });
  }

  addStep(data: { taskId: number; stepTitle: string, categoryId: number }) {
    this.taskService.addStep(data);
  }
}
