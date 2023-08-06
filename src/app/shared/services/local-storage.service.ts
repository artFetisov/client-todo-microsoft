import {Injectable} from '@angular/core';
import {ColorCategory} from '../data/model/task';
import {IAvailableTokensObject} from '../data/model/token';
import {Tokens} from './cookie.service';

export type LocalStorageKey = 'taskColors' | Tokens.AVAILABLE_ACCOUNTS;
export type LocalStorageValue = ColorCategories | IAvailableTokensObject;

export interface ColorCategories {
  [key: number]: ColorCategory[];
}

export interface AvailableAccountsData {
  id: number;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItemFromLocalStorage(name: LocalStorageKey) {
    try {
      const serializedState = localStorage.getItem(name);
      if (serializedState) {
        return JSON.parse(serializedState);
      }
      return {};
    } catch (err) {
      return {};
    }
  }

  savetoLocalStorage(name: LocalStorageKey, value: LocalStorageValue) {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {
    }
  }

  saveAllAvailableTokens(tokens: AvailableAccountsData) {
    let allTokensFromStorage: AvailableAccountsData[] =
      this.getItemFromLocalStorage(Tokens.AVAILABLE_ACCOUNTS)['tokens'];

    let updatedTokens: AvailableAccountsData[];

    if (!!allTokensFromStorage && allTokensFromStorage.length > 0) {
      updatedTokens = [
        ...allTokensFromStorage.filter((t) => t.id !== tokens.id),
        tokens,
      ];
    } else {
      updatedTokens = [tokens];
    }

    this.savetoLocalStorage(Tokens.AVAILABLE_ACCOUNTS, {
      tokens: updatedTokens,
    });
  }
}
