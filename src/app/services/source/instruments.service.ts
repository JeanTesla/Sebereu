import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<[]> {
    return this.httpClient.get<[]>("../../assets/sources/instruments.json")
  }
}
