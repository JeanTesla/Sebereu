import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UploadFileResponse } from '../../rest/interfaces/upload-file-response';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class UploadProfileImageService {

    constructor(private httpClient: HttpClient) { }

    doUpload(formData: FormData) {
        return this.httpClient.post(
            baseUrl + "/api/auth/upload-profile-image",
            formData,
            {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*"
                })
            })
    }
}