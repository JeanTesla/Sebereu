import { Component, OnInit, ViewChild } from '@angular/core';
import { NewContributionDialogComponent } from '../new-contribution-dialog/new-contribution-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Contribution } from 'src/app/rest/interfaces/contribution';
import { GetAllContributionService } from 'src/app/services/my-contributions/get-all-contributions.service';
import { InspectContributionComponent } from './inspect-contribution/inspect-contribution.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Page from 'src/app/models/page';

const userId = localStorage.getItem('userId');

@Component({
  selector: 'app-my-contributions',
  templateUrl: './my-contributions.component.html',
  styleUrls: ['./my-contributions.component.css']
})
export class MyContributionsComponent implements OnInit {

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 5, 10, 25, 50];

  displayedColumns: string[] = ['title', 'artist', 'createdAt'];
  dataSource: Contribution[] = [];

  constructor(
    private getAllContributionService: GetAllContributionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllContributions();
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.getAllContributions();
  }

  getAllContributions() {
    this.getAllContributionService.getAll(userId, this.pageIndex, this.pageSize)
      .subscribe(data => {
        this.dataSource = data.content
        this.length = data.totalElements
        console.log(data)
      })
  }

  newContribution() {
    this.dialog.open(NewContributionDialogComponent, {
      width: '70%',
    })
      .afterClosed().subscribe(() => {
        this.getAllContributions()
      })
  }

  inspectContribution(contributionId: string) {
    this.dialog.open(InspectContributionComponent, {
      width: '40%',
      data: contributionId
    })
  }
}
