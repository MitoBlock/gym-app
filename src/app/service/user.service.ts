import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountTokenStatusResp, MembershipTokensResp, MembershipTokenStatusResp, TokensResp } from '../models/reward-token';
import { User } from '../models/user';
import { api, goapi, mitoapi } from './api';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }),
};

@Injectable()
export class UserService {
  onUserAdded = new EventEmitter<User>();

  constructor(private http: HttpClient) {}

  // TODO: shoould the next endpoints be using api or mitoapi?
  removeDiscountTokenStatus(): Observable<any> {
    // should be delete action, but that doesn't allow body
    return this.http.get<any>(`${goapi}deleteDiscountTokenStatus`);
  }
  removeMembershipTokenStatus(): Observable<any> {
    return this.http.get<any>(`${goapi}deleteMembershipTokenStatus`);
  }

  addDiscountToken(): Observable<any> {
    console.log('add burito token');
    return this.http.get(`${goapi}discountToken`);
  }
  addMembershipToken(): Observable<any> {
    console.log('adding membership token');
    return this.http.get(`${goapi}membershipToken`);
  }

  getDiscountTokens(): Observable<TokensResp> {
    return this.http.get<TokensResp>(`${mitoapi}discount_tokens`);
  }

  // TODO: is this right?
  getMembershipTokens(): Observable<MembershipTokensResp> {
    return this.http.get<MembershipTokensResp>(`${mitoapi}membership_tokens`);
  }

  // getTokenStatus(id: number) : Observable<TokenStatusResp> {
  // hardcoding token id
  getDiscountTokenStatus(): Observable<DiscountTokenStatusResp> {
    return this.http.get<DiscountTokenStatusResp>(
      `${mitoapi}discount_token_status_q/0`,
    );
  }

  getMembershipTokenStatus(): Observable<MembershipTokenStatusResp> {
    return this.http.get<MembershipTokenStatusResp>(
      `${mitoapi}membership_token_status_q/0`,
    );
  }

  getTokens(): Observable<TokensResp> {
    return this.http.get<TokensResp>(`${goapi}tokens`);
  }
}
