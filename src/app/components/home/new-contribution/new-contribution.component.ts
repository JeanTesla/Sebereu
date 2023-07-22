import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SheetType } from '../../../enum/sheet-type.enum'
import { MatRadioChange } from '@angular/material/radio';
import { InstrumentsService } from 'src/app/services/source/instruments.service';
import { Observable, map, of, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MusicalGenre } from 'src/app/enum/musical-genre.enum';
import { GenresService } from 'src/app/services/source/genres.service';


@Component({
  selector: 'app-new-contribution',
  templateUrl: './new-contribution.component.html',
  styleUrls: ['./new-contribution.component.css']
})
export class NewContributionComponent implements OnInit {

  formInfo: FormGroup;

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
    private genresService: GenresService
  ) {

    this.formInfo = _formBuilder.group({
      title: [''],
      artist: [''],
      arrangement: [''],
      sheetType: [SheetType.GRID],
      musicalGenre: [MusicalGenre.UNIQUE],
      selectedMusicalGenre: ['']
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

  teste() {
    console.log(
      this.formInfo.value,
      this.selectedInstruments
    );
  }
}
