import {Injectable} from '@angular/core';
import {
  ColorCategory,
  DomainTask,
  DomainTaskWithAllFields,
  SortParams,
  Step,
  Task,
  Tasks,
  UpdateStepData,
  UpdateTaskData,
} from '../../../shared/data/model/task';
import {BehaviorSubject, map, pipe} from 'rxjs';
import {
  LocalStorageService,
  ColorCategories,
} from '../../../shared/services/local-storage.service';
import {CategoriesService} from '../../categories/services/categories.service';
import {Category} from '../../../shared/data/model/category';
import {HtmlTemplateService} from '../../../shared/services/html-template.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$: BehaviorSubject<Tasks> = new BehaviorSubject<Tasks>({} as Tasks);
  currentTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  selectedTask$: BehaviorSubject<Task> = new BehaviorSubject<Task>({} as Task);

  baseUrl = environment.baseUrl;

  constructor(
    private localStorageService: LocalStorageService,
    private categoryService: CategoriesService,
    private templateService: HtmlTemplateService,
    private httpService: HttpClient
  ) {
  }

  getTasks(categoryId: number) {
    this.httpService
      .get<DomainTaskWithAllFields[]>(`${this.baseUrl}tasks/${categoryId}`)
      .pipe(
        map((res) => {
          const currentTasks: Tasks = {
            [categoryId]: res.map((t) => ({
              ...t,
              colorCategory:
                this.localStorageService?.getItemFromLocalStorage('taskColors')[
                  t.id
                  ] || [],
            })),
          };
          return currentTasks;
        })
      )
      .subscribe((res: Tasks) => {
        if (!this.currentTasks$.getValue().length) {
          this.currentTasks$.next(res[categoryId]);
        }

        this.tasks$.next({
          ...this.tasks$.getValue(),
          ...res,
        });
      });
  }

  getTasksByCategory(category: Category) {
    this.currentTasks$.next(this.tasks$.getValue()[category.id]);
  }

  addTask(data: { title: string; categoryId: number }) {
    this.httpService
      .post<{ newTask: DomainTask; category: Category }>(
        `${this.baseUrl}tasks`,
        data
      )
      .pipe(
        map((res) => {
          const task: Task = {
            ...res.newTask,
            category: res.category,
            colorCategory: [],
            steps: [],
          };
          return task;
        })
      )
      .subscribe((newTask) => {
        this.tasks$.next({
          ...this.tasks$.getValue(),
          [newTask.categoryId]: [
            newTask,
            ...this.tasks$.getValue()[newTask.categoryId],
          ],
        });
        this.currentTasks$.next([newTask, ...this.currentTasks$.getValue()]);
      });
  }

  updateTask(data: UpdateTaskData) {
    let task = this.currentTasks$.getValue().find((t) => t.id === data.taskId);

    if (!task) {
      return;
    }

    const requestTask = {...task, ...data.newDataObj};

    this.httpService
      .put<DomainTaskWithAllFields>(
        `${this.baseUrl}tasks/${data.taskId}`,
        requestTask
      )
      .pipe(
        map((res) => {
          const task: Task = {
            ...res,
            colorCategory:
              this.localStorageService?.getItemFromLocalStorage('taskColors')[
                res.id
                ] || [],
          };
          return task;
        })
      )
      .subscribe((res) => {
        if (data.newDataObj.categoryId) {
          this.changeCategoryTask(res, data.categoryId);
          return;
        }

        this.tasks$.next({
          ...this.tasks$.getValue(),
          [data.categoryId]: this.tasks$
            .getValue()
            [data.categoryId].map((t) =>
            t.id === res.id ? {...t, ...res} : t
          ),
        });

        this.currentTasks$.next(
          this.currentTasks$
            .getValue()
            .map((t) => (t.id === res.id ? {...t, ...res} : t))
        );
        this.selectedTask$.next(res);
      });
  }

  private changeCategoryTask(task: Task, oldCategoryId: number) {
    this.tasks$.next({
      ...this.tasks$.getValue(),
      [oldCategoryId]: this.tasks$
        .getValue()
        [oldCategoryId].filter((t) => t.id !== task.id),
      [task.categoryId]: [...this.tasks$.getValue()[task.categoryId], task],
    });

    this.currentTasks$.next(
      this.currentTasks$.getValue().filter((t) => t.id !== task.id)
    );
  }

  deleteTask(taskId: number, categoryId: number) {
    this.httpService
      .delete(`${this.baseUrl}tasks/${taskId}`)
      .subscribe((res) => {
        this.tasks$.next({
          ...this.tasks$.getValue(),
          [categoryId]: this.tasks$
            .getValue()
            [categoryId].filter((t) => t.id !== taskId),
        });
        this.currentTasks$.next(
          this.currentTasks$.getValue().filter((t) => t.id !== taskId)
        );
      });

    this.selectedTask$.next({} as Task);

    this.templateService.toggleShowEditBar(false);
  }

  selectTask(task: Task) {
    this.selectedTask$.next(task);
    this.templateService.toggleShowEditBar(true);
  }

  searchByTitle(searchTitle: string) {
    this.httpService
      .get<DomainTaskWithAllFields[]>(
        `${this.baseUrl}tasks/byTitle?title=${searchTitle}`
      )
      .pipe(
        map((res) => {
          const tasks: Task[] = res.map((t) => ({
            ...t,
            colorCategory:
              this.localStorageService?.getItemFromLocalStorage('taskColors')[
                t.id
                ] || [],
          }));
          return tasks;
        })
      )
      .subscribe((res) => {
        if (!!this.categoryService.activeCategory$.getValue()) {
          this.categoryService.activeCategory$.next({} as Category);
        }

        this.currentTasks$.next(res);
      });
  }

  updateColorCategory(data: {
    taskId: number;
    categoryId: number;
    colorCategory: ColorCategory;
  }) {
    const taskColorsFromStorage: ColorCategories =
      this.localStorageService.getItemFromLocalStorage('taskColors');

    const currentTaskColors: ColorCategory[] =
      taskColorsFromStorage[data.taskId];

    let updatedCurrentTaskColors: ColorCategory[];

    if (!!currentTaskColors && currentTaskColors.length > 0) {
      updatedCurrentTaskColors = [data.colorCategory, ...currentTaskColors];
    } else {
      updatedCurrentTaskColors = [data.colorCategory];
    }

    const updatedColorsForStorage: ColorCategories = {
      ...taskColorsFromStorage,
      [data.taskId]: updatedCurrentTaskColors,
    };

    this.localStorageService.savetoLocalStorage(
      'taskColors',
      updatedColorsForStorage
    );

    this.tasks$.next({
      ...this.tasks$.getValue(),
      [data.categoryId]: this.tasks$.getValue()[data.categoryId].map((t) =>
        t.id === data.taskId
          ? {
            ...t,
            colorCategory: updatedCurrentTaskColors,
          }
          : t
      ),
    });

    this.currentTasks$.next(
      this.currentTasks$.getValue().map((t) =>
        t.id === data.taskId
          ? {
            ...t,
            colorCategory: updatedCurrentTaskColors,
          }
          : t
      )
    );

    const currentTask = this.tasks$
      .getValue()
      [data.categoryId].find((t) => t.id === data.taskId);

    if (currentTask) {
      this.selectedTask$.next(currentTask);
    }
  }

  deleteColorCategory(data: {
    taskId: number;
    categoryId: number;
    colorCategory: ColorCategory;
  }) {
    const taskColorsFromStorage: ColorCategories =
      this.localStorageService.getItemFromLocalStorage('taskColors');

    const updatedCurrentTaskColors: ColorCategory[] = taskColorsFromStorage[
      data.taskId
      ].filter((c) => c.id !== data.colorCategory.id);

    const updatedColorsForStorage = {
      ...taskColorsFromStorage,
      [data.taskId]: updatedCurrentTaskColors,
    };

    this.localStorageService.savetoLocalStorage(
      'taskColors',
      updatedColorsForStorage
    );

    this.tasks$.next({
      ...this.tasks$.getValue(),
      [data.categoryId]: this.tasks$.getValue()[data.categoryId].map((t) =>
        t.id === data.taskId
          ? {
            ...t,
            colorCategory: updatedCurrentTaskColors,
          }
          : t
      ),
    });

    this.currentTasks$.next(
      this.currentTasks$.getValue().map((t) =>
        t.id === data.taskId
          ? {
            ...t,
            colorCategory: updatedCurrentTaskColors,
          }
          : t
      )
    );

    const currentTask = this.tasks$
      .getValue()
      [data.categoryId].find((t) => t.id === data.taskId);

    if (currentTask) {
      this.selectedTask$.next(currentTask);
    }
  }

  selectCategory(data: { title: string; catId: number }) {
    this.categoryService.activeCategory$.next({
      ...this.categoryService.activeCategory$.getValue(),
      title: data.title,
    });

    this.tasks$.next({
      ...this.tasks$.getValue(),
      [data.catId]: this.tasks$.getValue()[data.catId].map((t) => ({
        ...t,
        category: {...t.category, title: data.title},
      })),
    });

    this.currentTasks$.next(
      this.currentTasks$
        .getValue()
        .map((t) => ({...t, category: {...t.category, title: data.title}}))
    );
  }

  // STEP

  addStep(data: { taskId: number; stepTitle: string; categoryId: number }) {
    this.httpService
      .post<Step>(`${this.baseUrl}tasks/steps`, {
        taskId: data.taskId,
        title: data.stepTitle,
      })
      .subscribe((res) => {
        this.tasks$.next({
          ...this.tasks$.getValue(),
          [data.categoryId]: [
            ...this.tasks$
              .getValue()
              [data.categoryId].map((t) =>
              t.id !== data.taskId ? t : {...t, steps: [...t.steps, res]}
            ),
          ],
        });

        this.currentTasks$.next(
          this.currentTasks$.getValue().map((t) =>
            t.id === data.taskId
              ? {
                ...t,
                steps: [...t.steps, res],
              }
              : t
          )
        );

        const currentTask = this.tasks$
          .getValue()
          [data.categoryId].find((t) => t.id === data.taskId);

        if (currentTask) {
          this.selectedTask$.next(currentTask);
        }
      });
  }

  updateStep(data: UpdateStepData) {
    const step = {
      ...this.tasks$
        .getValue()
        [data.categoryId].find((t) => t.id === data.taskId)
        ?.steps.find((s) => s.id === data.stepId),
      ...data.newDataObj,
    };

    this.httpService
      .put<Step>(`${this.baseUrl}tasks/steps/${data.stepId}`, step)
      .subscribe((res) => {
        this.tasks$.next({
          ...this.tasks$.getValue(),
          [data.categoryId]: this.tasks$.getValue()[data.categoryId].map((t) =>
            t.id === data.taskId
              ? {
                ...t,
                steps: t.steps.map((s) =>
                  s.id === data.stepId ? {...s, ...data.newDataObj} : s
                ),
              }
              : t
          ),
        });

        this.currentTasks$.next(
          this.currentTasks$.getValue().map((t) =>
            t.id === data.taskId
              ? {
                ...t,
                steps: t.steps.map((s) =>
                  s.id === data.stepId ? {...s, ...data.newDataObj} : s
                ),
              }
              : t
          )
        );

        const currentTask = this.tasks$
          .getValue()
          [data.categoryId].find((t) => t.id === data.taskId);

        if (currentTask) {
          this.selectedTask$.next(currentTask);
        }
      });
  }

  deleteStep(data: { taskId: number; stepId: number; categoryId: number }) {
    this.httpService
      .delete<Step>(`${this.baseUrl}tasks/steps/${data.stepId}`)
      .subscribe((res) => {
        this.tasks$.next({
          ...this.tasks$.getValue(),
          [data.categoryId]: this.tasks$.getValue()[data.categoryId].map((t) =>
            t.id === data.taskId
              ? {
                ...t,
                steps: t.steps.filter((s) => s.id !== data.stepId),
              }
              : t
          ),
        });

        this.currentTasks$.next(
          this.currentTasks$.getValue().map((t) =>
            t.id === data.taskId
              ? {
                ...t,
                steps: t.steps.filter((s) => s.id !== data.stepId),
              }
              : t
          )
        );

        const currentTask = this.tasks$
          .getValue()
          [data.categoryId].find((t) => t.id === data.taskId);

        if (currentTask) {
          this.selectedTask$.next(currentTask);
        }
      });
  }


  sortTasks(params: SortParams, categoryId: number) {
    debugger
    this.httpService
      .get<DomainTaskWithAllFields[]>(
        `${this.baseUrl}tasks/sort/${categoryId}?property=${params.property}&direction=${params.direction}`
      )
      .pipe(
        map((res) => {
          const tasks: Task[] = res.map((t) => ({
            ...t,
            colorCategory:
              this.localStorageService?.getItemFromLocalStorage('taskColors')[
                t.id
                ] || [],
          }));
          return tasks;
        })
      )
      .subscribe((res) => {
        this.currentTasks$.next(res);
      });
  }
}
