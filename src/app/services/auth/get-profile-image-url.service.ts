import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const baseUrl: String = environment.api.server

@Injectable({
    providedIn: 'root'
})
export class GetProfileImageUrlService {

    getUrl(userId: String | null) {
        return `${baseUrl}/api/auth/profile-image?userId=${userId}`
    }
}
