import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contribution } from '../../rest/interfaces/contribution';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class GetAllContributionService {

    constructor(private httpClient: HttpClient) { }

    getAll(userId: string | null, page: number, size: number): Observable<any> {
        return this.httpClient
            .get<any>(
                baseUrl + "/api/contribution/?userId=" + userId
                + `&page=${page}&size=${size}`)
    }
}
