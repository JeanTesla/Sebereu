import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { ContributionDetail } from 'src/app/rest/interfaces/contribution-detail';
import { SearchContributionService } from 'src/app/services/search/search-contribution.service';

const baseUrl: String = environment.api.server;

interface MiniView {
  contributionId: String;
  displayed: boolean
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  form: FormGroup;
  foundContributions: ContributionDetail[] = [];
  contributionsMiniView: Map<String, boolean> = new Map();

  makeFileUrl(contributionId: String) {
    return baseUrl + '/api/contribution/' + contributionId + '/file?&embedded=true';
  }

  constructor(
    private _formBuilder: FormBuilder,
    private searchContributionService: SearchContributionService
  ) {

    this.form = this._formBuilder.group({
      filter: [''],
    })

    this.getResult()

    this.filterInput?.valueChanges.subscribe(this.getResult)
  }

  getResult = () => {
    const title = this.filterInput?.value;
    this.searchContributionService.search(title)
      .subscribe(data => {
        const content: ContributionDetail[] = data.content;
        console.log(content);
        this.foundContributions = content;
        this.createMiniViewStates(content);
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
    this.contributionsMiniView.set(contributionId, true)
  }

  get filterInput() {
    return this.form.get('filter');
  }
}
