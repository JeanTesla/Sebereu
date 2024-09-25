import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/rest/interfaces/user-info';
import { GetCepInfoService } from 'src/app/services/profile/get-cep-info.service';
import { GetProfileImageUrlService } from 'src/app/services/profile/get-profile-image-url.service';
import { GetUserInfoService } from 'src/app/services/profile/get-user-info.service';
import { UpdateUserInfoService } from 'src/app/services/profile/update-user-info.service';
import { UploadProfileImageService } from 'src/app/services/profile/upload-profile-image.service';

@Component({
    selector: 'app-login',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    public userId: string | null = localStorage.getItem('userId');
    public userData: UserInfo;

    profileForm = new FormGroup({
        userName: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        city: new FormControl(''),
        address: new FormControl(''),
        state: new FormControl(''),
        postalCode: new FormControl(''),
        aboutMe: new FormControl(''),
        quickMessage: new FormControl(''),
    });

    selectedFile: File;
    acceptedFileTypes = ['image/jpeg', 'image/png'];

    constructor(
        private getUserInfoService: GetUserInfoService,
        private getProfileImageUrlService: GetProfileImageUrlService,
        private updateUserInfoService: UpdateUserInfoService,
        private getCepInfoService: GetCepInfoService,
        private uploadProfileImageService: UploadProfileImageService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getUserInfoService.get(this.userId)
            .subscribe((userInfo: UserInfo) => {
                this.userData = userInfo;
                this.profileForm.patchValue(userInfo);
            });

        this.profileForm.get('postalCode')?.
            valueChanges.subscribe(value => {
                if (value?.length == 8) {
                    this.getCepInfoAndSetFieldsData(value);
                }
            })
    }

    getProfileUserImageUrl(): string {
        return this.getProfileImageUrlService.getUrl(this.userId);
    }

    saveProfileDataChanges(): void {
        if (this.profileForm.invalid) {
            return;
        }
        this.updateUserInfoService.update(this.userId, this.profileForm.value)
            .subscribe(() => {
                location.reload();
            });
    }

    getCepInfoAndSetFieldsData(cep: string | null): void {
        this.getCepInfoService.get(cep)
            .subscribe((info) => {
                this.profileForm.patchValue({
                    state: info.uf,
                    address: info.logradouro,
                    city: info.localidade
                });
            });
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        const fileName = this.selectedFile.name;
        const formData = new FormData();
        formData.append("title", fileName);
        formData.append("file", this.selectedFile);
        this.uploadProfileImageService.doUpload(formData, this.userId)
            .subscribe(result => {
                location.reload();
            });
    }
}
