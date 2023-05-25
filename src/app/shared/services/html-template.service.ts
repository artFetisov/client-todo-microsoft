import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HtmlTemplateService {
  isOpenLeftSideBar$ = new BehaviorSubject<boolean>(true)
  isOpenEditSideBar$ = new BehaviorSubject<boolean>(false)

  toggleShowLeftSideBar() {
    this.isOpenLeftSideBar$.next(!this.isOpenLeftSideBar$.getValue())
  }

  toggleShowEditBar(value: boolean) {
    this.isOpenEditSideBar$.next(value)
  }
}
