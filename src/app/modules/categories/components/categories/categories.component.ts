import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../../../shared/data/model/category';
import {Tasks} from '../../../../shared/data/model/task';
import {CategoriesService} from '../../services/categories.service';
import {TasksService} from '../../../tasks/services/tasks.service';
import {Observable, Subscription} from 'rxjs';
import {LocalStorageService} from '../../../../shared/services/local-storage.service';
import {HtmlTemplateService} from '../../../../shared/services/html-template.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories$!: Observable<Category[]>;
  activeCategory$!: Observable<Category>;

  allTasks!: Tasks
  isEditMode = false;
  tmpCatTitle = '';

  subscription!: Subscription;

  constructor(
    private categoriesService: CategoriesService,
    private tasksService: TasksService,
    private localStorageService: LocalStorageService,
    private templateService: HtmlTemplateService
  ) {
  }

  ngOnInit() {
    this.activeCategory$ = this.categoriesService.activeCategory$;
    this.categories$ = this.categoriesService.categories$
    // this.getCategories()

    this.subscription = this.tasksService.tasks$.subscribe(tasks => {
      this.allTasks = tasks
    })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUncompletedTasksByCategory(catId: number): number {
    if (!!this.allTasks[catId]) {
      return this.allTasks[catId]
        .filter((t) => !t.completed).length;
    }
    return 0;
  }

  toggleEditMode() {
    this.tmpCatTitle = '';
    this.isEditMode = !this.isEditMode;
  }

  getCategories() {
    this.categoriesService.getCategories();
  }

  getTasksByCategoryId(data: { categoryId: number }) {
    this.tasksService.getTasks(data.categoryId)
  }

  setActiveCategory(category: Category) {
    this.templateService.isOpenEditSideBar$.next(false);
    this.categoriesService.setActiveCategory(category);

    this.setTasksByCategory(category);
  }

  setTasksByCategory(category: Category) {
    this.tasksService.getTasksByCategory(category);
  }

  addCategoryHandler() {
    if (this.tmpCatTitle.trim().length > 0) {
      this.categoriesService.addCategory(this.tmpCatTitle)
      this.tasksService.getTasksByCategory(this.categoriesService.activeCategory$.getValue());
      this.tmpCatTitle = '';
    }
  }
}
