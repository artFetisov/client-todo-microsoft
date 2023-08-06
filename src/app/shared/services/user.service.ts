import { Injectable } from '@angular/core';
import { IUser } from '../data/model/user';
import { BehaviorSubject } from 'rxjs';
import { IAuthResponse } from '../data/model/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$: BehaviorSubject<IAuthResponse[]> = new BehaviorSubject<
    IAuthResponse[]
  >([]);
  currentUser$: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);

  constructor() {}

  setUserData(userData: IUser) {
    this.currentUser$.next(userData);
  }
}
