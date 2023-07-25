import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SheetType } from '../../../enum/sheet-type.enum'
import { MatRadioChange } from '@angular/material/radio';
import { InstrumentsService } from 'src/app/services/source/instruments.service';
import { Observable, map, of, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MusicalGenre } from 'src/app/enum/musical-genre.enum';
import { GenresService } from 'src/app/services/source/genres.service';
import { UploadFileService } from 'src/app/services/new-contribution/upload-file.service';
import { UploadFileResponse } from 'src/app/rest/interfaces/upload-file-response';
import { NewContributionService } from 'src/app/services/new-contribution/new-contribution.service';
import { NewContributionRequest } from 'src/app/rest/interfaces/new-contribution-request';
import { DialogRef } from '@angular/cdk/dialog';

const userId: String | null = localStorage.getItem('userId');

@Component({
  selector: 'app-new-contribution',
  templateUrl: './new-contribution.component.html',
  styleUrls: ['./new-contribution.component.css']
})
export class NewContributionComponent implements OnInit {

  dialogRef: DialogRef = DialogRef<NewContributionComponent>;

  formInfo: FormGroup;

  fileToUpload: Blob = new Blob();

  instrumentPicker = new FormControl('');
  genrePicker = new FormControl('');

  isGridSheetType = true;
  isUniqueMusicalGenre = true;

  instruments: String[] = [];
  genres: String[] = []

  selectedInstruments: String[] = [];
  selectedGenres: String[] = [];

  filteredOptionsInstruments: Observable<String[]> = of();
  filteredOptionsGenres: Observable<String[]> = of();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('instrumentInput')
  instrumentInput!: ElementRef<HTMLInputElement>;
  @ViewChild('genreInput')
  genreInput!: ElementRef<HTMLInputElement>;

  constructor(
    private _formBuilder: FormBuilder,
    private instrumentsService: InstrumentsService,
    private genresService: GenresService,
    private uploadFileService: UploadFileService,
    private newContributionService: NewContributionService
  ) {

    this.formInfo = _formBuilder.group({
      title: [''],
      artist: [''],
      arrangement: [''],
      sheetType: [SheetType.GRID],
      musicalGenre: [MusicalGenre.UNIQUE],
      description: ['']
    })
  }

  ngOnInit(): void {

    this.instrumentsService.getAll()
      .subscribe((data) => {
        this.instruments = data.map(el => el);
      })

    this.filteredOptionsInstruments = this.instrumentPicker.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.instruments))
    );

    this.genresService.getAll()
      .subscribe((data) => {
        this.genres = data.map(el => el);
      })

    this.filteredOptionsGenres = this.genrePicker.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.genres))
    );
  }

  onSelectSheetType($event: MatRadioChange) {
    this.isGridSheetType = $event.value === SheetType.GRID;
    if (this.isGridSheetType) this.selectedInstruments = [];
  }

  onSelectGenre($event: MatRadioChange) {
    this.isUniqueMusicalGenre = $event.value === MusicalGenre.UNIQUE;
    if (this.isUniqueMusicalGenre) this.selectedGenres = [];
  }

  onSelectMusicalGenre($event: MatAutocompleteSelectedEvent) {
    if (this.isUniqueMusicalGenre && this.selectedGenres.length !== 0) return;
    this.selectedGenres.push($event.option.value)
    this.genrePicker.setValue(null)
    this.genreInput.nativeElement.value = '';
  }

  onSelectInstrument($event: MatAutocompleteSelectedEvent) {
    this.selectedInstruments.push($event.option.value)
    this.instrumentPicker.setValue(null)
    this.instrumentInput.nativeElement.value = '';
  }

  removeSelectedInstrument(instrument: String) {
    const index = this.selectedInstruments.indexOf(instrument);
    if (index >= 0) this.selectedInstruments.splice(index, 1);
  }

  removeSelectedGenre(genre: String) {
    const index = this.selectedGenres.indexOf(genre);
    if (index >= 0) this.selectedGenres.splice(index, 1);
  }

  private _filter(value: String, data: String[]): String[] {
    const filterValue = value.toLowerCase();
    return data
      .filter(option => option.toLowerCase().includes(filterValue));
  }

  handleFileToUpload($event: any) {
    console.log($event.target.files[0]);
    this.fileToUpload = $event.target.files[0];
  }

  doUploadFile(): Observable<UploadFileResponse> {
    const formData: FormData = new FormData();
    formData.append("file", this.fileToUpload)
    formData.append("title", this.formInfo.value.title)
    return this.uploadFileService.doUpload(formData)
  }

  finalizeNewContribution() {
    this.doUploadFile()
      .subscribe(data => {
        const contributionData: NewContributionRequest = {
          userId,
          uploadId: data.uploadId,
          ...this.formInfo.value,
          genres: this.selectedGenres,
          instruments: this.selectedInstruments,
        }
        this.newContributionService.contribute(contributionData)
          .subscribe(response => {
            console.log(response);

          })
      })
  }

  teste() {
    this.doUploadFile()
    const contributionData = {
      ...this.formInfo.value,
      instruments: this.selectedInstruments,
      genres: this.selectedGenres
    }
    console.log(contributionData);

  }
}
