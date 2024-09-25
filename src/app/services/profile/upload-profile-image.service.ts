import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class UploadProfileImageService {

    constructor(private httpClient: HttpClient) { }

    doUpload(formData: FormData, userId: string | null) {
        return this.httpClient.post(
            baseUrl + "/api/user/" + userId + "/upload-profile-image",
            formData,
            {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*"
                })
            })
    }
}