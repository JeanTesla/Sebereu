import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl: String = environment.api.server

@Injectable({
  providedIn: 'root'
})
export class GetContributionFileService {

  makeFileUrl(contributionId: String, userId: string | null): string {
    return `${baseUrl}/api/contribution/${contributionId}/file?embedded=true&requestUserId=${userId}`;
  }
}
