import {Observable} from 'rxjs';

export interface CommonDAO<T> {
  getAll(): T[]

  get(id: number): Observable<T>

  update(data: T): Observable<T>

  delete(id: number): Observable<T>

  add(data: T): Observable<T>

}
