import {Injectable} from '@angular/core';
import Cookies from 'js-cookie';
import {ITokens} from "../data/model/token";

export enum Tokens {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token'
}

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() {
  }

  saveTokenStorage = (data: ITokens) => {
    Cookies.set('accessToken', data.accessToken)
    Cookies.set('refreshToken', data.refreshToken)
  }

  removeTokenStorage = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }
}
