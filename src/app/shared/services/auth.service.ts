import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IAuthRequest} from "../data/model/auth";
import Cookies from "js-cookie";
import {Tokens} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpClient) {
  }

  baseUrl = environment.baseUrl;
  isAuth = false

  refreshToken() {
    const refreshToken = Cookies.get(Tokens.REFRESH_TOKEN)
    return this.httpService.post<IAuthRequest>(`${this.baseUrl}auth/refresh`, {refreshToken})
  }

  authMe() {
    this.httpService.get(`${this.baseUrl}auth/me`).subscribe(() => {
    })
  }

  registration() {

  }

  login() {

  }

  logout() {
  }
}
