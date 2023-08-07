import { UploadProfileImageService } from './../../services/auth/upload-profile-image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetProfileImageUrlService } from '../../services/auth/get-profile-image-url.service';
import { Component } from '@angular/core';

const userId: string | null = localStorage.getItem("userId");

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  fileToUpload: Blob = new Blob();

  constructor(
    private getProfileImageUrlService: GetProfileImageUrlService,
    private uploadProfileImageService: UploadProfileImageService,
    private snackBar: MatSnackBar
  ) { }

  getProfileUrl() {
    return this.getProfileImageUrlService.getUrl(userId)
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
    formData.append("userId", String(userId))
    this.uploadProfileImageService.doUpload(formData)
    .subscribe(() => {
      location.reload();
    })
  }
}
