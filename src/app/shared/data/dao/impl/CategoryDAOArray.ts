import {CategoryDAO} from "../interface/CategoryDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../model/category";
import {Injectable} from "@angular/core";
import {TestData} from "../../data";

@Injectable({
  providedIn: 'root'
})
export class CategoryDAOArray implements CategoryDAO {

  add(category: Category): Observable<Category> {
    return of(TestData.categories[0])
  }

  delete(id: number): Observable<Category> {
    return of(TestData.categories[0])
  }

  get(id: number): Observable<Category> {
    return of(TestData.categories[0])
  }

  getAll(): Category[] {
    return TestData.categories
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories)
  }

  update(category: Category): Observable<Category> {
    return of(TestData.categories[0])
  }

}
