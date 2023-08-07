import { ContributionDetail } from 'src/app/rest/interfaces/contribution-detail';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetContributionService } from 'src/app/services/my-contributions/get-contribution.service';
import { SheetType } from 'src/app/enum/sheet-type.enum';
import { MusicalGenre } from 'src/app/enum/musical-genre.enum';
import { GetContributionFileService } from 'src/app/services/source/get-contribution-file.service';

@Component({
  selector: 'app-inspect-contribution',
  templateUrl: './inspect-contribution.component.html',
  styleUrls: ['./inspect-contribution.component.css']
})
export class InspectContributionComponent implements OnInit {

  contributionId: string;
  contributionDetail: ContributionDetail = {
    views: 0,
    contributionId: 'Aguarde',
    userId: '',
    arrangement: 'Aguarde',
    artist: 'Aguarde',
    createdAt: 'Aguarde',
    description: 'Aguarde',
    genrePicker: [],
    instrumentPicker: [],
    musicalGenre: MusicalGenre.UNIQUE,
    sheetType: SheetType.GRID,
    title: 'Aguarde'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) contributionId: string,
    private getContributionService: GetContributionService,
    private getContributionFileService: GetContributionFileService
  ) {
    this.contributionId = contributionId;
  }

  ngOnInit(): void {
    this.getContributionService.get(this.contributionId)
      .subscribe((contributionDetail: ContributionDetail) => {
        this.contributionDetail = contributionDetail
      })
  }

  makeFileUrl() {
    return this.getContributionFileService.makeFileUrl(this.contributionId);
  }
}
