import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GetProfileImageUrlService } from 'src/app/services/profile/get-profile-image-url.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  isExpanded = false;
  public userId: string | null = localStorage.getItem('userId');

  isMobile: boolean = this.deviceDetectorService.isMobile();

  constructor(
    public dialog: MatDialog,
    private getProfileImageUrlService: GetProfileImageUrlService,
    private router: Router,
    private deviceDetectorService: DeviceDetectorService
  ) { }

  ngOnInit(): void { }

  getProfileUserImageUrl(): string {
    return this.getProfileImageUrlService.getUrl(this.userId);
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  doLogout(){
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}
