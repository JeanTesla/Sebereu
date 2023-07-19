import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { SignIn } from 'src/app/rest/interfaces/sign-in';
import { Observable, catchError, map, of, throwError } from 'rxjs';

const baseUrl: String = environment.api.server

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signIn(email: String, password: String): Observable<SignIn> {
    return this.httpClient.post<SignIn>(baseUrl + "/api/auth/sign-in", { email, password })
  }
}
