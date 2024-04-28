import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UploadFileResponse } from '../../rest/interfaces/upload-file-response';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    constructor(private httpClient: HttpClient) { }

    doUpload(formData: FormData): Observable<UploadFileResponse> {
        return this.httpClient.post<UploadFileResponse>(
            baseUrl + "/api/contribution/upload-file",
            formData,
            {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*"
                })
            })
    }
}
