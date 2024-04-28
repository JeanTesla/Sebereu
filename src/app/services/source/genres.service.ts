import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<[]> {
    return this.httpClient.get<[]>("../../assets/sources/genres.json")
  }
}
