import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Contribution } from 'src/app/rest/interfaces/contribution';
import { ChangeVisibilityContributionService } from 'src/app/services/my-contributions/change-visibility-contribution.service';
import { GetAllContributionService } from 'src/app/services/my-contributions/get-all-contributions.service';
import { GetContributionFileService } from 'src/app/services/source/get-contribution-file.service';

@Component({
  selector: 'app-my-contributions',
  templateUrl: './my-contributions.component.html',
  styleUrls: ['./my-contributions.component.css']
})
export class MyContributionsComponent {

  public userId: string | null = localStorage.getItem('userId');

  displayedColumns: string[] = ['title', 'composer', 'createdAt', 'views', 'view', 'edit', 'remove'];
  dataSource = new MatTableDataSource<Contribution>();

  totalItensFounded = 0;
  paginationIndex: number = 0;
  paginationSize: number = 8;

  constructor(
    private getMyContributions: GetAllContributionService,
    private changeVisibilityContributionService: ChangeVisibilityContributionService,
    private getContributionFileService: GetContributionFileService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.getMyContributions.getAll(this.userId, this.paginationIndex, this.paginationSize)
      .subscribe(result => {
        console.log(result)
        this.totalItensFounded = result.totalElements
        this.dataSource.data = result.content
      });
  }

  getContributions() {
    this.getMyContributions.getAll(this.userId, this.paginationIndex, this.paginationSize)
      .subscribe(result => {
        this.totalItensFounded = result.totalElements
        this.dataSource.data = result.content
      });
  }

  setPageConf(page: any) {
    this.paginationIndex = page.pageIndex;
    this.paginationSize = page.pageSize;
    this.getContributions();
  }

  changeVisibility(contributionId: string) {
    this.changeVisibilityContributionService
      .execute(contributionId, this.userId)
      .subscribe(result => {
        this.getContributions();
      });
  }

  viewFile(contributionId: string) {
    const fileUrl = this.getContributionFileService.makeFileUrl(contributionId, this.userId)
    window.open(fileUrl, '_blank');
  }

  edit(contributionId: string) {
    this.router.navigate(["/home/edit-contribution/" + contributionId]);
  }
}
