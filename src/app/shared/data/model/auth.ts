import {IUser} from "./user";
import {ITokens} from "./token";

export interface IAuthRequest {
  user: IUser
  tokens: ITokens
}
