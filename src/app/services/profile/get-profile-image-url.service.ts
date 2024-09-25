import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class GetProfileImageUrlService {

    getUrl(userId: String | null) {
        return `${baseUrl}/api/user/${userId}/profile-image`
    }
}
