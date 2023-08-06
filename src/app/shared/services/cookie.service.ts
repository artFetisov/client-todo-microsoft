import {Injectable} from '@angular/core';
import Cookies from 'js-cookie';
import {ITokens} from "../data/model/token";
import {LocalStorageService} from "./local-storage.service";

export enum Tokens {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token',
  AVAILABLE_ACCOUNTS = 'available-accounts'
}


@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() {
  }

  saveTokenStorage = (data: ITokens) => {
    Cookies.set(Tokens.ACCESS_TOKEN, data.accessToken)
    Cookies.set(Tokens.REFRESH_TOKEN, data.refreshToken)
  }

  removeTokenStorage = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }
}
