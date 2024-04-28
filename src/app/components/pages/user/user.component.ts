import { Component, OnInit } from '@angular/core';
import { GetUserInfoService } from 'app/services/user/get-user-info.service';
import { UserInfo } from '../../../rest/interfaces/user-info';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { GetProfileImageUrlService } from 'app/services/auth/get-profile-image-url.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    public userId: string = '1015ef97-5352-41e8-9f83-55d8c1b4e415';

    constructor(
        private getUserInfoService: GetUserInfoService,
        private getProfileImageUrlService: GetProfileImageUrlService
    ) { }

    ngOnInit() {
        this.getUserInfoService.get(this.userId)
            .subscribe((userInfo: UserInfo) => {
                console.log(userInfo);
            });
    }

    getProfileUserImageUrl(){
        return this.getProfileImageUrlService.getUrl(this.userId);
    }
}
