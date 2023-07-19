import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"

const baseUrl: String = environment.api.server

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signIn(email: String, password: String) {
    return this.httpClient.post(baseUrl + "/api/auth/sign-in", { email, password })
  }
}
