import { ContributionDetail } from 'src/app/rest/interfaces/contribution-detail';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/app/environments/environment';
import { Contribution } from 'src/app/rest/interfaces/contribution';
import { GetContributionService } from 'src/app/services/my-contributions/get-contribution.service';
import { SheetType } from 'src/app/enum/sheet-type.enum';
import { MusicalGenre } from 'src/app/enum/musical-genre.enum';

const baseUrl: String = environment.api.server;

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
    private getContributionService: GetContributionService
  ) {
    this.contributionId = contributionId;
  }

  ngOnInit(): void {
    this.getContributionService.get(this.contributionId)
      .subscribe((contributionDetail: ContributionDetail) => {
        console.log(contributionDetail);
        this.contributionDetail = contributionDetail
      })
  }

  makeFileUrl() {
    return baseUrl + '/api/contribution/' + this.contributionId + '/file';
  }
}
