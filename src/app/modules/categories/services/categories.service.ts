import {Injectable} from '@angular/core';
import {BehaviorSubject, map, ObservableInput} from 'rxjs';
import {Category} from '../../../shared/data/model/category';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories$ = new BehaviorSubject<Category[]>([]);
  activeCategory$ = new BehaviorSubject<Category>({} as Category);

  baseUrl = environment.baseUrl;

  constructor(
    private httpService: HttpClient
  ) {
  }

  getCategories() {
    this.httpService
      .get<Category[]>(`${this.baseUrl}categories`)
      .subscribe((res) => {
        this.setActiveCategory(res[0])
        return this.categories$.next(res)
      });
  }

  setActiveCategory(category: Category) {
    this.activeCategory$.next(category);
  }

  addCategory(title: string) {
    this.httpService.post<Category>(`${this.baseUrl}categories`, {title})
      .subscribe((newCat) => {
        this.categories$.next([newCat, ...this.categories$.getValue()])
        this.activeCategory$.next(newCat)
      })
  }

  updateCategory(data: { title: string; catId: number }) {
    this.httpService.put<Category>(`${this.baseUrl}categories/${data.catId}`, {title: data.title})
      .pipe(map((res) => {
        const updatedCategories: Category[] = this.categories$.getValue().map(cat => cat.id === data.catId ? {
          ...cat,
          title: data.title
        } : cat)
        return updatedCategories
      }))
      .subscribe((cats: Category[]) => {
        this.categories$.next(cats)
      })
  }

  deleteCategory(catId: number) {
    this.httpService.delete(`${this.baseUrl}categories/${catId}`).subscribe(res => {
      this.categories$.next(this.categories$.getValue().filter(cat => cat.id !== catId))
      this.activeCategory$.next(this.categories$.getValue()[0])
    })
  }
}
