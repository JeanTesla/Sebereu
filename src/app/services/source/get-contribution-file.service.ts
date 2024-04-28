import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl: String = environment.api.server
const userId: string | null = localStorage.getItem('userId');

@Injectable({
  providedIn: 'root'
})
export class GetContributionFileService {

  makeFileUrl(contributionId: String): String {
    return `${baseUrl}/api/contribution/${contributionId}/file?embedded=true&requestUserId=${userId}`;
  }
}
