import { AvailableAccountsData } from '../../services/local-storage.service';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAvailableTokensObject {
  [key: string]: AvailableAccountsData[];
}
