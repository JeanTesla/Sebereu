import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contribution } from 'src/app/rest/interfaces/contribution';
import { Pageable } from 'src/app/rest/interfaces/pageable';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class GetAllContributionService {

    constructor(private httpClient: HttpClient) { }

    getAll(userId: string | null, page: number, size: number): Observable<Pageable<Contribution>>{
        return this.httpClient
            .get<Pageable<Contribution>>(
                baseUrl + "/api/contribution/get-all?userId=" + userId
                + `&page=${page}&size=${size}`)
    }
}
