import {Injectable} from "@angular/core";
import {ColorCategory} from "../data/model/task";

export type LocalStorageKey = 'taskColors'
export type LocalStorageValue = ColorCategories

export interface ColorCategories {
  [key: number]: ColorCategory[]
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItemFromLocalStorage(name: LocalStorageKey): ColorCategories {
    try {
      const serializedState = localStorage.getItem(name);
      if (serializedState) {
        return JSON.parse(serializedState)
      }
      return {}
    } catch (err) {
      return {}
    }
  }

  savetoLocalStorage(name: LocalStorageKey, value: LocalStorageValue) {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {
    }
  }
}

