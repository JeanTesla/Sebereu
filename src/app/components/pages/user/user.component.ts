import { Component, OnInit } from '@angular/core';
import { GetUserInfoService } from 'app/services/user/get-user-info.service';
import { UserInfo } from '../../../rest/interfaces/user-info';
import { GetProfileImageUrlService } from 'app/services/user/get-profile-image-url.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateUserInfoService } from 'app/services/user/update-user-info.service';
import { GetCepInfoService } from 'app/services/user/get-cep-info.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    public userId: string = '1015ef97-5352-41e8-9f83-55d8c1b4e415';
    public userData: UserInfo;

    profileForm = new FormGroup({
        userName: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        city: new FormControl(''),
        address: new FormControl(''),
        country: new FormControl(''),
        state: new FormControl(''),
        postalCode: new FormControl(''),
        aboutMe: new FormControl(''),
        quickMessage: new FormControl(''),
    });

    constructor(
        private getUserInfoService: GetUserInfoService,
        private getProfileImageUrlService: GetProfileImageUrlService,
        private updateUserInfoService: UpdateUserInfoService,
        private getCepInfoService: GetCepInfoService
    ) { }

    ngOnInit() {
        this.getUserInfoService.get(this.userId)
            .subscribe((userInfo: UserInfo) => {
                this.userData = userInfo;
                this.profileForm.patchValue(userInfo);
            });

        this.profileForm.get('postalCode').
            valueChanges.subscribe(value => {
                if (value.length == 8) {
                    this.getCepInfoAndSetFieldsData(value);
                }
            })
    }

    getProfileUserImageUrl(): string {
        return this.getProfileImageUrlService.getUrl(this.userId);
    }

    saveProfileDataChanges(): void {
        if(this.profileForm.invalid){
            return;
        }
        this.updateUserInfoService.update(this.userId, this.profileForm.value)
            .subscribe(() => {
                location.reload();
            });
    }

    getCepInfoAndSetFieldsData(cep: string): void {
        this.getCepInfoService.get(cep)
            .subscribe((info) => {
                this.profileForm.patchValue({
                    state: info.uf,
                    address: info.logradouro,
                    city: info.localidade
                });
            });
    }
}
