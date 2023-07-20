import {IUser} from "./user";
import {ITokens} from "./token";

export interface IAuthResponse {
  user: IUser
  tokens: ITokens
}

export interface IAuthRequest {
  email: string
  password: string
}
