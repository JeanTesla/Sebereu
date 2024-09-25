import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class UpdateUserInfoService {

    constructor(private httpClient: HttpClient) { }

    update(userId: string | null, userInfo: Object): Observable<any> {
        return this.httpClient.put(baseUrl + `/api/user/${userId}`, userInfo);
    }
}
