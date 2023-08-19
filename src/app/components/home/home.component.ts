import { UploadProfileImageService } from './../../services/auth/upload-profile-image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetProfileImageUrlService } from '../../services/auth/get-profile-image-url.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/rest/interfaces/user-info';
import { GetUserInfoService } from 'src/app/services/user/get-user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileToUpload: Blob = new Blob();
  userInfo: UserInfo | undefined;
  userId: string | null =  localStorage.getItem("userId");

  constructor(
    private getProfileImageUrlService: GetProfileImageUrlService,
    private uploadProfileImageService: UploadProfileImageService,
    private getUserInfoService: GetUserInfoService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.getUserInfoService.get(this.userId)
      .subscribe(result => this.userInfo = result)
  }

  getProfileUrl() {
    return this.getProfileImageUrlService.getUrl(this.userId)
  }

  handleFileToUpload($event: any) {
    this.fileToUpload = $event.target.files[0];
    this.doUploadFile();
  }

  doUploadFile() {
    if (this.fileToUpload.size === 0) {
      this.snackBar.open("Nenhum arquivo selecionado", 'Exit', {
        horizontalPosition: "center", verticalPosition: "bottom", duration: 3000
      });
      throw Error
    }
    const formData: FormData = new FormData();
    formData.append("file", this.fileToUpload)
    formData.append("userId", String(this.userId))
    this.uploadProfileImageService.doUpload(formData)
      .subscribe(() => {
        location.reload();
      })
  }

  signOut() {
    localStorage.clear();
    window.location.href = "/";
  }
}
