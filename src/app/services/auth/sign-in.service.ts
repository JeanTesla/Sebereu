import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { Observable } from 'rxjs';
import { SignInResponse } from 'src/app/rest/interfaces/sign-in-response';

const baseUrl: String = environment.api.server

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private httpClient: HttpClient) { }

  auth(authData: any): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(baseUrl + "/api/auth/sign-in", authData)
  }
}
