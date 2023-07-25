import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContributionDialogComponent } from '../new-contribution/new-contribution-dialog/new-contribution-dialog.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {
  constructor(
    private dialog: MatDialog
  ) {}

  newContribution(){
    this.dialog.open(NewContributionDialogComponent, {
      height:'50%',
      width:'50%',
    })
  }
}
