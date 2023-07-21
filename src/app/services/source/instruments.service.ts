import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { SignIn } from 'src/app/rest/interfaces/sign-in';
import { Observable } from 'rxjs';

const baseUrl: String = environment.api.server

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<[]> {
    return this.httpClient.get<[]>("../../assets/sources/instruments.json")
  }
}
