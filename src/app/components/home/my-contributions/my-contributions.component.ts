import { Component, OnInit } from '@angular/core';
import { NewContributionDialogComponent } from '../new-contribution-dialog/new-contribution-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Contribution } from 'src/app/rest/interfaces/contribution';
import { GetAllContributionService } from 'src/app/services/my-contributions/get-all-contributions.service';
import { InspectContributionComponent } from './inspect-contribution/inspect-contribution.component';

const userId = localStorage.getItem('userId');

@Component({
  selector: 'app-my-contributions',
  templateUrl: './my-contributions.component.html',
  styleUrls: ['./my-contributions.component.css']
})
export class MyContributionsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'artist', 'createdAt'];
  dataSource: Contribution[] = [];

  constructor(
    private getAllContributionService: GetAllContributionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllContributions();
  }

  getAllContributions() {
    this.getAllContributionService.getAll(userId)
      .subscribe(data => {
        this.dataSource = data
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
