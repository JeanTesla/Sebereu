import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { Observable } from 'rxjs';
import { SignUpResponse } from 'src/app/rest/interfaces/sign-up-response';

const baseUrl: String = environment.api.server

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient: HttpClient) { }

  signUp(signUp: any): Observable<SignUpResponse> {
    return this.httpClient.post<SignUpResponse>(baseUrl + "/api/auth/sign-up", signUp)
  }
}
