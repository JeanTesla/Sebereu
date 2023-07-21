import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { SheetType } from '../../../enum/sheet-type.enum'
import { MatRadioChange } from '@angular/material/radio';
import { InstrumentsService } from 'src/app/services/source/instruments.service';
import { Observable, map, of, startWith } from 'rxjs';

@Component({
  selector: 'app-new-contribution',
  templateUrl: './new-contribution.component.html',
  styleUrls: ['./new-contribution.component.css']
})
export class NewContributionComponent implements OnInit {

  formInfo = this._formBuilder.group({
    title: ['', Validators.required],
    artist: ['', Validators.required],
    arrangement: ['', Validators.required],
    sheetType: ['', Validators.required],
    selectedInstruments: ['']
  });

  instrumentPicker = new FormControl('');
  formAdditionalInfo = this._formBuilder.group({});
  sheetType: String = SheetType.GRID;
  isGridSheetType = true;
  instruments: String[] = [];
  filteredOptions: Observable<String[]> = of();

  constructor(
    private _formBuilder: FormBuilder,
    private instrumentsService: InstrumentsService
  ) { }

  ngOnInit(): void {

    this.instrumentsService.getAll()
      .subscribe((data) => {
        this.instruments = data.map(el => el);
      })

    this.filteredOptions = this.instrumentPicker.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

  }

  onSelectSheetType($event: MatRadioChange) {
    this.isGridSheetType = $event.value === SheetType.GRID;
  }

  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();

    return this.instruments.filter(
      option => option.toLowerCase()
        .includes(filterValue));
  }
}
