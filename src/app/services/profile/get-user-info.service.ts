import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInfo } from '../../rest/interfaces/user-info';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class GetUserInfoService {

    constructor(private httpClient: HttpClient) { }

    get(userId: string | null ): Observable<UserInfo> {
        return this.httpClient.get<UserInfo>(baseUrl + `/api/user/${userId}`)
    }
}
