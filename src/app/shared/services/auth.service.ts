import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IAuthRequest, IAuthResponse} from "../data/model/auth";
import Cookies from "js-cookie";
import {CookieService, Tokens} from "./cookie.service";
import {BehaviorSubject} from "rxjs";
import {UserService} from "./user.service";
import {CategoriesService} from "../../modules/categories/services/categories.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading$ = new BehaviorSubject<boolean>(false)
  isLoggedIn = false

  constructor(
    private readonly httpService: HttpClient,
    private readonly cookieService: CookieService,
    private readonly userService: UserService,
    private readonly categoryService: CategoriesService
  ) {
  }

  baseUrl = environment.baseUrl
  isAuth = false


  refreshToken() {
    const refreshToken = Cookies.get(Tokens.REFRESH_TOKEN)
    return this.httpService.post<IAuthResponse>(`${this.baseUrl}auth/refresh`, {refreshToken})
  }

  // authMeRx() {
  //   this.isLoading.next(true)
  //   this.httpService.get<IAuthResponse>(`${this.baseUrl}auth/me`).pipe(catchError((error) => {
  //     this.isLoading.next(false)
  //     return throwError(error)
  //   }))
  //     .subscribe((response) => {
  //       this.cookieService.saveTokenStorage(response.tokens)
  //       this.userService.setUserData(response.user)
  //       this.categoryService.getCategories()
  //       this.isLoading.next(false)
  //       this.isAuth = true
  //     })
  // }

  async authMe() {
    this.isLoading$.next(true)

    try {
      const response = await this.httpService.get<IAuthResponse>(`${this.baseUrl}auth/me`).toPromise()

      if (response?.tokens && response.user) {
        this.isLoggedIn = true
        this.cookieService.saveTokenStorage(response.tokens)
        this.userService.setUserData(response.user)
        await this.categoryService.getCategories()
      }
    } catch (error) {
    } finally {
      this.isLoading$.next(false)
      this.isAuth = true
    }
  }

  async registration(data: IAuthRequest) {
    try {
      const response = await this.httpService.post<IAuthResponse>(`${this.baseUrl}auth/registration`, data).toPromise()

      if (response?.user) {
        this.cookieService.saveTokenStorage(response.tokens)
        this.userService.setUserData(response.user)

        await this.authMe()
      }

    } catch (error) {
      console.log(error)
    }
  }

  async login(data: IAuthRequest) {
    try {
      const response = await this.httpService.post<IAuthResponse>(`${this.baseUrl}auth/login`, data).toPromise()

      if (response?.user && response.tokens) {
        this.cookieService.saveTokenStorage(response.tokens)
        this.userService.setUserData(response.user)

        await this.authMe()
      }

    } catch (error) {
      console.log(error)
    }
  }

  logout() {
    this.isLoggedIn = false
  }
}
