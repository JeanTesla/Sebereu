import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SheetType } from '../../../enum/sheet-type.enum'
import { MatRadioChange } from '@angular/material/radio';
import { InstrumentsService } from 'src/app/services/source/instruments.service';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MusicalGenre } from 'src/app/enum/musical-genre.enum';
import { GenresService } from 'src/app/services/source/genres.service';
import { UploadFileService } from 'src/app/services/new-contribution/upload-file.service';
import { UploadFileResponse } from 'src/app/rest/interfaces/upload-file-response';
import { NewContributionService } from 'src/app/services/new-contribution/new-contribution.service';
import { NewContributionRequest } from 'src/app/rest/interfaces/new-contribution-request';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const userId: String | null = localStorage.getItem('userId');

@Component({
  selector: 'app-new-contribution-dialog',
  templateUrl: './new-contribution-dialog.component.html',
  styleUrls: ['./new-contribution-dialog.component.css']
})
export class NewContributionDialogComponent {

  formInfo: FormGroup;
  formAdditionalInfo: FormGroup;

  fileToUpload: Blob = new Blob();

  isGridSheetType = true;
  isUniqueMusicalGenre = true;

  instruments: String[] = [];
  genres: String[] = []

  selectedInstruments: String[] = [];
  selectedGenres: String[] = [];

  filteredOptionsInstruments!: String[];
  filteredOptionsGenres!: String[];

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
    private newContributionService: NewContributionService,
    private dialogRef: MatDialogRef<NewContributionDialogComponent>,
    private snackBar: MatSnackBar
  ) {

    this.formInfo = this._formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      arrangement: ['Desconhecido'],
      sheetType: [SheetType.GRID, Validators.required],
      instrumentPicker: new FormControl([])
    })

    this.formAdditionalInfo = this._formBuilder.group({
      description: [''],
      musicalGenre: [MusicalGenre.UNIQUE, Validators.required],
      genrePicker: new FormControl([], Validators.required)
    })

  }

  ngOnInit(): void {

    this.instrumentsService.getAll()
      .subscribe((data) => {
        this.instruments = data.map(el => el);
      })

    this.genresService.getAll()
      .subscribe((data) => {
        this.genres = data.map(el => el);
      })
  }

  filterOptions($event: any, filterName: String) {
    const filterData = (data: String[]) => data
      .filter(value => value.toLowerCase()
        .includes(String($event.target.value).toLocaleLowerCase()))

    if (filterName === "instruments")
      this.filteredOptionsInstruments = filterData(this.instruments)

    if (filterName === "genres")
      this.filteredOptionsGenres = filterData(this.genres)
  }

  onSelectSheetType($event: MatRadioChange) {
    this.isGridSheetType = $event.value === SheetType.GRID;
    if (this.isGridSheetType) this.selectedInstruments = [];

    if (this.isGridSheetType) {
      this.formInfo.controls['instrumentPicker'].clearValidators();
    } else {
      this.formInfo.controls['instrumentPicker'].setValidators([Validators.required]);
    }
    this.formInfo.controls['instrumentPicker'].updateValueAndValidity();
  }

  onSelectGenre($event: MatRadioChange) {
    this.isUniqueMusicalGenre = $event.value === MusicalGenre.UNIQUE;
    if (this.isUniqueMusicalGenre) this.selectedGenres = [];
  }

  onSelectMusicalGenre($event: MatAutocompleteSelectedEvent) {
    if (this.isUniqueMusicalGenre && this.selectedGenres.length !== 0) return;
    this.selectedGenres.push($event.option.value)
    this.genrePicker?.setValue(null)
    this.genreInput.nativeElement.value = '';
  }

  onSelectInstrument($event: MatAutocompleteSelectedEvent) {
    this.selectedInstruments.push($event.option.value)
    this.instrumentPicker?.setValue(null)
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

  handleFileToUpload($event: any) {
    this.fileToUpload = $event.target.files[0];
  }

  doUploadFile(): Observable<UploadFileResponse> {

    if (this.fileToUpload.size === 0) {
      this.snackBar.open("Nenhum arquivo selecionado", 'Exit', {
        horizontalPosition: "center", verticalPosition: "bottom", duration: 3000
      });
      throw Error
    }
    const formData: FormData = new FormData();
    formData.append("file", this.fileToUpload)
    formData.append("title", this.formInfo.value.title)
    return this.uploadFileService.doUpload(formData)
  }

  get genrePicker() {
    return this.formInfo.get('genrePicker')
  }

  get instrumentPicker() {
    return this.formInfo.get('instrumentPicker')
  }

  finalizeNewContribution() {
    this.doUploadFile()
      .subscribe(data => {
        const contributionData: NewContributionRequest = {
          userId,
          uploadId: data.uploadId,
          ...this.formInfo.value,
          ...this.formAdditionalInfo.value
        }
        this.newContributionService.contribute(contributionData)
          .subscribe(response => {
            this.dialogRef.close()
          })
      })
  }
}