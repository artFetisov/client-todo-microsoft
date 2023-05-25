import {Observable} from 'rxjs';
import {CommonDAO} from "./CommonDAO";
import {Category} from "../../model/category";
import {Priority} from "../../model/priority";
import {Task} from '../../model/task';

export interface TaskDAO extends CommonDAO<Task> {
  search(category: Category, searchText: string, status: boolean, priority: Priority): Task[]

  getCompletedCountInCategory(category: Category): Observable<number>

  getUncompletedCountInCategory(category: Category): Observable<number>

  getTotalCountInCategory(category: Category): Observable<number>

  getTotalCount(): Observable<number>
}
