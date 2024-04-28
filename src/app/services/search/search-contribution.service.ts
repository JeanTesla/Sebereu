import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class SearchContributionService {

    constructor(private httpClient: HttpClient) { }

    search(filter: string, page: number, size: number): Observable<any> {
        return this.httpClient.get<any>(
            baseUrl + `/api/search/?filter=${filter}&page=${page}&size=${size}`
        )
    }
}
