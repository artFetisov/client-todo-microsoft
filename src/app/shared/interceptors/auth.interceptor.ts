import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {CookieService, Tokens} from "../services/cookie.service";
import Cookies from "js-cookie";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly cookieService: CookieService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addCorsHeaders(req)
    const accessToken = Cookies.get(Tokens.ACCESS_TOKEN)
    if (!!accessToken) {
      req = this.addTokenHeader(req, accessToken);
    }

    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !error.url?.includes('refresh')) {
        return this.handleRefresh(next, req).pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401 && error.url?.includes('refresh')) {
              this.cookieService.removeTokenStorage()
              req = this.deleteTokenHeader(req);
              return next.handle(req)
            }
            return throwError(error)
          }),
        )
      }
      return throwError(error)
    }))
  }

  private addCorsHeaders(request: HttpRequest<any>,) {
    return request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": "true",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD",
      }
    })
  }

  private addTokenHeader(request: HttpRequest<any>, accessToken: string) {
    return request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + accessToken)});
  }

  private handleRefresh(next: HttpHandler, req: HttpRequest<any>) {
    return this.authService.refreshToken().pipe(
      switchMap(data => {
        this.cookieService.saveTokenStorage(data.tokens)
        this.userService.setUserData(data.user)
        return next.handle(this.addTokenHeader(req, data.tokens.accessToken));
      }),
      catchError((err) => {
        return throwError(err)
      })
    );
  }

  private deleteTokenHeader(request: HttpRequest<any>) {
    return request.clone({headers: request.headers.delete(TOKEN_HEADER_KEY)});
  }
}
