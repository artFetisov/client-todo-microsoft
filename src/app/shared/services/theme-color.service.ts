import {Injectable} from '@angular/core';
import {ThemeColor} from "../data/model/category";
import {themeColors} from "../data/data/themeColors";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeColorService {
  activeColor$: BehaviorSubject<ThemeColor> = new BehaviorSubject<ThemeColor>(themeColors[2])

  constructor() {
  }

  setActiveColor(color: ThemeColor) {
    this.activeColor$.next(color)
  }
}
