import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContributionDetail } from '../../rest/interfaces/contribution-detail';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class GetContributionService {

    constructor(private httpClient: HttpClient) { }

    get(contributionId: string): Observable<ContributionDetail> {
        return this.httpClient.get<ContributionDetail>(baseUrl + "/api/contribution/" + contributionId)
    }
}
