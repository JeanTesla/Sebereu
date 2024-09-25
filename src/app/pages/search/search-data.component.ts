import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContributionDetail } from 'src/app/rest/interfaces/contribution-detail';
import { GetContributionService } from 'src/app/services/my-contributions/get-contribution.service';
import { SearchDataDetailComponent } from './search-data-detail/search-data-detail.component';
import { SearchContributionService } from 'src/app/services/search/search-contribution.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';


export interface Tile {
    cols: number;
    rows: number;
    contribution: ContributionDetail;
}

@Component({
    selector: 'app-search-data',
    templateUrl: './search-data.component.html',
    styleUrls: ['./search-data.component.css']
})
export class SearchDataComponent {

    contributions: Tile[] = [];
    searchInput = new FormControl('');
    filteredOptions: Observable<string[]>;
    currentSearchText: string | undefined | null;
    totalItensFounded = 0;
    rows = 4;
    cols = 0;

    paginationIndex: number = 0;
    paginationSize: number = 8;

    isMobile: boolean = this.deviceDetectorService.isMobile();

    constructor(
        private searchContributionService: SearchContributionService,
        private dialog: MatDialog,
        private deviceDetectorService: DeviceDetectorService
    ) { }

    ngOnInit() {

        if(this.deviceDetectorService.isMobile()) this.cols = 4; 
        if(this.deviceDetectorService.isDesktop()) this.cols = 1;
        if(this.deviceDetectorService.isTablet()) this.cols = 2;
        
        this.getContributionsPages();
        this.searchInput.valueChanges.subscribe(searchText => {
            if (searchText && searchText.length < 3) {
                return
            }
            this.getContributionsPages(searchText);
            this.currentSearchText = searchText;
        })
    }

    getContributionsPages(text: string | undefined | null = '') {
        this.searchContributionService.search(text ?? '', this.paginationIndex, this.paginationSize)
            .subscribe(searchData => {
                this.totalItensFounded = searchData.totalElements
                this.contributions = searchData.content.map(contribution => {
                    const tile: Tile = {
                        contribution,
                        rows: this.rows,
                        cols: this.cols
                    }
                    return tile;
                })
            });
    }

    showFullContributionDetail(contributionDetail: ContributionDetail) {
        this.dialog.open(SearchDataDetailComponent, {
            height: '90%',
            width: this.isMobile ? '90%': '70%',
            panelClass: 'custom-dialog-style',
            data: contributionDetail
        });
    }

    setPageConf(page: any) {
        this.paginationIndex = page.pageIndex;
        this.paginationSize = page.pageSize;
        this.getContributionsPages(this.currentSearchText);
    }
}
