import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contribution } from 'src/app/rest/interfaces/contribution';
import { ContributionDetail } from 'src/app/rest/interfaces/contribution-detail';
import { Pageable } from 'src/app/rest/interfaces/pageable';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class SearchContributionService {

    constructor(private httpClient: HttpClient) { }

    search(filter: string, page: number, size: number): Observable<Pageable<ContributionDetail>> {
        return this.httpClient.get<Pageable<ContributionDetail>>(
            baseUrl + `/api/search/?filter=${filter}&page=${page}&size=${size}`
        )
    }
}
