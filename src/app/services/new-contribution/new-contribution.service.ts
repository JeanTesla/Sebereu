import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NewContributionRequest } from '../../rest/interfaces/new-contribution-request';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class NewContributionService {

    constructor(private httpClient: HttpClient) { }

    contribute(data: any): Observable<NewContributionRequest> {
        return this.httpClient.post<NewContributionRequest>(baseUrl + "/api/contribution/", data)
    }

    update(contributionId: string, data: any): Observable<NewContributionRequest> {
        return this.httpClient.put<NewContributionRequest>(baseUrl + "/api/contribution/" + contributionId, data)
    }
}
