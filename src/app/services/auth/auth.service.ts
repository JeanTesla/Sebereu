import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { SignInRequest } from 'src/app/rest/interfaces/sign-in-request';
import { Observable } from 'rxjs';

const baseUrl: String = environment.api.server

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signIn(email: String, password: String): Observable<SignInRequest> {
    return this.httpClient.post<SignInRequest>(baseUrl + "/api/auth/sign-in", { email, password })
  }
}
