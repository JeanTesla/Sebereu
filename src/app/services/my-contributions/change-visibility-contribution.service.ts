import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class ChangeVisibilityContributionService {

    constructor(private httpClient: HttpClient) { }

    execute(contributionId: string | null, userId: string | null): Observable<any> {
        return this.httpClient
            .patch(
                baseUrl + "/api/contribution/" + contributionId + "/change-visibility", {userId});
    }
}
