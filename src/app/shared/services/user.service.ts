import {Injectable} from '@angular/core';
import {IUser} from "../data/model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | null = null

  constructor() {
  }

  setUserData(userData: IUser) {
    this.user = userData
  }
}
