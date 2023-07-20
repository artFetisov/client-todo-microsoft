import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {
  SortParams,
  Task,
  UpdateTaskData,
} from '../../../../shared/data/model/task';
import {Observable, Subscription} from 'rxjs';
import {Category, ThemeColor} from '../../../../shared/data/model/category';
import {CategoriesService} from '../../../categories/services/categories.service';
import {HtmlTemplateService} from '../../../../shared/services/html-template.service';
import {ThemeColorService} from '../../../../shared/services/theme-color.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks$!: Observable<Task[]>;
  activeCategory$!: Observable<Category>;
  categories$!: Observable<Category[]>;

  completedTasks!: Task[];
  uncompletedTasks!: Task[];
  isOpenLeftSideBar!: boolean;

  subscription!: Subscription;
  subscription2!: Subscription;

  activeThemeColor$!: Observable<ThemeColor>;

  collapse = {
    active: true,
    disabled: false,
    name: `Завершенные`,
  };

  constructor(
    private tasksService: TasksService,
    private categoryService: CategoriesService,
    private templateService: HtmlTemplateService,
    private themeService: ThemeColorService
  ) {
  }

  ngOnInit() {
    this.subscription = this.tasksService.currentTasks$.subscribe((tasks) => {
      this.completedTasks = tasks.filter((t) => t.completed);
      this.uncompletedTasks = tasks.filter((t) => !t.completed);
    });

    this.categories$ = this.categoryService.categories$;

    this.subscription2 = this.templateService.isOpenLeftSideBar$.subscribe(
      (val) => {
        this.isOpenLeftSideBar = val;
      }
    );
    this.activeCategory$ = this.categoryService.activeCategory$;
    this.activeThemeColor$ = this.themeService.activeColor$;
  }

  setThemeColor(theme: ThemeColor) {
    this.themeService.setActiveColor(theme);
  }

  getTasksByCategory(category: Category) {
    this.tasksService.getTasksByCategory(category)
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
    this.subscription2 && this.subscription2.unsubscribe()
  }

  addTask(data: { title: string, categoryId: number }) {
    this.tasksService.addTask(data);
  }

  selectTask(task: Task) {
    this.tasksService.selectTask(task);
  }

  changeTaskStatus(data: UpdateTaskData) {
    this.tasksService.updateTask(data);
  }

  changeTaskPriority(data: UpdateTaskData) {
    this.tasksService.updateTask(data);
  }

  async changeCategoryTitle(data: { title: string; catId: number }) {
    await this.categoryService.updateCategory(data);
    this.tasksService.selectCategory(data);
  }

  deleteCategory(data: { catId: number }) {
    this.categoryService.deleteCategory(data.catId);

    const firstCategory = this.categoryService.categories$.getValue()[0];
    this.tasksService.getTasksByCategory(firstCategory);
  }

  sortBy(data: SortParams) {
    this.tasksService.sortTasks(data, this.categoryService.activeCategory$.getValue().id);
  }
}
