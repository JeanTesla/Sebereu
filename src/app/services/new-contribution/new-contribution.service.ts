import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { NewContributionRequest } from 'src/app/rest/interfaces/new-contribution-request';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class NewContributionService {

    constructor(private httpClient: HttpClient) { }

    contribute(data: any): Observable<NewContributionRequest> {
        return this.httpClient.post<NewContributionRequest>(baseUrl + "/api/contribution/", data)
    }
}
