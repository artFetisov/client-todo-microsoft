import {TaskDAO} from "../interface/TaskDAO";
import {Observable, of} from "rxjs";
import {Task} from '../../model/task'
import {Category} from "../../model/category";
import {Priority} from "../../model/priority";
import {Injectable} from "@angular/core";
import {TestData} from "../../data";

@Injectable({
  providedIn: 'root'
})
export class TaskDAOArray implements TaskDAO {
  add(task: Task): Observable<Task> {
    return of(TestData.tasks[0])
  }

  delete(id: number): Observable<Task> {
    return of(TestData.tasks[0])
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks[0])
  }

  getAll(): Task[] {
    return TestData.tasks
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return of(0)
  }

  getTotalCount(): Observable<number> {
    return of(1)
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return of(1)
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return of(1)
  }

  search(category?: Category, searchText?: string, status?: boolean, priority?: Priority): Task[] {
    return this.searchTasks(category, searchText, status, priority);
  }

  update(task: Task): Observable<Task> {
    return of(TestData.tasks[1])
  }

  private searchTasks(category: Category | undefined, searchText: string | undefined, status: boolean | undefined, priority: Priority | undefined): Task[] {
    if (!category) {
      return []
    }

    return TestData.tasks.filter(t => t.category.id === category.id)
  }
}
