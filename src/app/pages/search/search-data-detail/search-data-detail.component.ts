import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ContributionDetail } from 'src/app/rest/interfaces/contribution-detail';
import { UserInfo } from 'src/app/rest/interfaces/user-info';
import { GetProfileImageUrlService } from 'src/app/services/profile/get-profile-image-url.service';
import { GetUserInfoService } from 'src/app/services/profile/get-user-info.service';
import { GetContributionFileService } from 'src/app/services/source/get-contribution-file.service';

@Component({
    selector: 'app-search-data-detail',
    templateUrl: './search-data-detail.component.html',
    styleUrls: ['./search-data-detail.component.css']
})
export class SearchDataDetailComponent implements OnInit{

    public userId: string | null = localStorage.getItem('userId');
    contributionFileUrl: SafeUrl;
    contributor: UserInfo;
    deviceType = this.deviceDetectorService.isMobile() ? 'mobile' : 'desktop';

    constructor(
        @Inject(MAT_DIALOG_DATA) public contributionData: ContributionDetail,
        private getContributionFileService: GetContributionFileService,
        private getProfileImageUrlService: GetProfileImageUrlService,
        private getUserInfoService: GetUserInfoService,
        private deviceDetectorService: DeviceDetectorService
    ) { }

    ngOnInit() {
        this.contributionFileUrl = this.getContributionFileService
        .makeFileUrl(this.contributionData.contributionId, this.userId)

        this.getUserInfoService.get(this.contributionData.userId)
        .subscribe(result => {
            this.contributor = result;
        })
    }

    getProfileUserImageUrl(): string {
        return this.getProfileImageUrlService.getUrl(this.contributor?.userId);
    }

    visualizeFile() {
        window.open(this.contributionFileUrl.toString(), '_blank');
    }
}
