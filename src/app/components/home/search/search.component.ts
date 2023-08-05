import { GetContributionFileService } from './../../../services/source/get-contribution-file.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/app/environments/environment';
import { ContributionDetail } from 'src/app/rest/interfaces/contribution-detail';
import { SearchContributionService } from 'src/app/services/search/search-contribution.service';

const baseUrl: String = environment.api.server;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  form: FormGroup;
  foundContributions: ContributionDetail[] = [];
  contributionsMiniView: Map<String, boolean> = new Map();

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 5, 10, 25, 50];

  itemsPerPage = "1";

  constructor(
    private _formBuilder: FormBuilder,
    private searchContributionService: SearchContributionService,
    private getContributionFileService: GetContributionFileService
  ) {

    this.form = this._formBuilder.group({
      filter: [''],
    })

    this.getResult()

    this.filterInput?.valueChanges.subscribe(this.getResult)
  }

  makeFileUrl(contributionId: String) {
    return this.getContributionFileService.makeFileUrl(contributionId);
  }

  getResult = () => {
    const filter = this.filterInput?.value;
    this.searchContributionService.search(filter, this.pageIndex, this.pageSize)
      .subscribe(data => {
        const content: ContributionDetail[] = data.content;
        console.log(content);
        this.length = data.totalElements;
        if(content.length){
          this.foundContributions = content;
          this.createMiniViewStates(content);  
        }
      })
  }

  createMiniViewStates(contributions: ContributionDetail[]) {
    contributions.forEach(contribution =>
      this.contributionsMiniView.set(contribution.contributionId, false))
  }

  getMiniViewState(contributionId: String): boolean | undefined {
    return this.contributionsMiniView.get(contributionId)
  }

  showFilePreview(contributionId: String) {
    this.contributionsMiniView.set(contributionId, !this.getMiniViewState(contributionId))
    console.log("chamou");
  }

  get filterInput() {
    return this.form.get('filter');
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.getResult();
  }

  setItemsPerRow(value: any){
    this.itemsPerPage = value 
  }
}
