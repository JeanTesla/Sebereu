import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Contribution } from 'src/app/rest/interfaces/contribution';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class GetAllContributionService {

    constructor(private httpClient: HttpClient) { }

    getAll(userId: string | null): Observable<Contribution[]> {
        return this.httpClient.get<Contribution[]>(baseUrl + "/api/contribution/?userId=" + userId)
    }
}
