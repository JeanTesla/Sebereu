import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { GenresService } from 'src/app/services/source/genres.service';
import { InstrumentsService } from 'src/app/services/source/instruments.service';
import { UploadFileService } from 'src/app/services/new-contribution/upload-file.service';
import { NewContributionService } from 'src/app/services/new-contribution/new-contribution.service';
import { ToastService } from 'src/app/services/UX/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAllContributionService } from 'src/app/services/my-contributions/get-all-contributions.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-new-contribution',
  templateUrl: './new-contribution.component.html',
  styleUrls: ['./new-contribution.component.css']
})
export class NewContributionComponent {
  public userId: string | null = localStorage.getItem('userId');

  genres: string[] = [];
  instruments: string[] = ['One', 'Two', 'Three'];

  filteredGenres: Array<String>;
  filteredInstruments: Array<String>;

  selectedGenres: Array<String> = [];
  selectedInstruments: Array<String> = [];

  selectedFile: File;

  addOnBlur = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  isEditMode: boolean = false;
  editContributionId: string = "";

  stepInfoFormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    composer: new FormControl('', Validators.required),
    arrangement: new FormControl('', Validators.required),
    description: new FormControl('')
  })

  stepGenInstFormGroup = new FormGroup({
    instrumentSearch: new FormControl(''),
    genreSearch: new FormControl(''),
    instruments: new FormControl(new Array<String>, Validators.required),
    genres: new FormControl(new Array<String>, Validators.required),
  })

  constructor(
    private genresService: GenresService,
    private instrumentsService: InstrumentsService,
    private uploadFileService: UploadFileService,
    private newContributionService: NewContributionService,
    private myContributionsService: GetAllContributionService,
    private toastService: ToastService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.editContributionId = this.activeRoute.snapshot.paramMap.get('id') ?? "";
    if (this.editContributionId) {
      this.isEditMode = true;
      this.myContributionsService.getById(this.editContributionId)
        .subscribe(result => {
          this.stepInfoFormGroup.patchValue({
            title: result.title,
            composer: result.composer,
            arrangement: result.arrangement,
            description: result.description
          });

          this.selectedGenres = result.genrePicker;
          this.selectedInstruments = result.instrumentPicker;

          this.stepGenInstFormGroup.patchValue({
            genres: this.selectedGenres,
            instruments: this.selectedInstruments
          });
        })
    }
  }

  ngOnInit() {

    this.genresService.getAll()
      .subscribe(result => {
        this.genres = result;
      });

    this.instrumentsService.getAll()
      .subscribe(result => {
        this.instruments = result;
      });

    this.stepGenInstFormGroup.get('genreSearch')?.valueChanges
      .subscribe(value => {
        this.filteredGenres = this._filter(value, this.genres)
      });

    this.stepGenInstFormGroup.get('instrumentSearch')?.valueChanges
      .subscribe(value => {
        this.filteredInstruments = this._filter(value, this.instruments);
      });
  }

  private _filter(value: string | null, arrayList: Array<any>): string[] {
    const filterValue = value?.toLowerCase();
    return arrayList.filter(option =>
      option.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toLowerCase().includes(filterValue));
  }

  removeGenre(genre: String): void {
    const index = this.selectedGenres.indexOf(genre);
    if (index >= 0) {
      this.selectedGenres.splice(index, 1);
    }
  }

  onSelectedGenre(selectedGenre: String) {
    if (!this.selectedGenres.find(value => value == selectedGenre)) {
      this.selectedGenres.push(selectedGenre);
      this.stepGenInstFormGroup.get('genreSearch')?.patchValue("");
      this.stepGenInstFormGroup.get('genres')?.patchValue(this.selectedGenres)
    }
  }

  removeInstrument(instrument: String): void {
    const index = this.selectedInstruments.indexOf(instrument);
    if (index >= 0) {
      this.selectedInstruments.splice(index, 1);
    }
  }

  onSelectedInstrument(selectedInstrument: String) {
    if (!this.selectedInstruments.find(value => value == selectedInstrument)) {
      this.selectedInstruments.push(selectedInstrument);
      this.stepGenInstFormGroup.get('instrumentSearch')?.patchValue("");
      this.stepGenInstFormGroup.get('instruments')?.patchValue(this.selectedInstruments)
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveContribution() {

    if (!this.selectedFile) {
      this.toastService.show("Nenhum arquivo selecionado.");
      return;
    }

    if (this.stepInfoFormGroup.valid && this.stepGenInstFormGroup.valid) {
      const fileName = this.selectedFile.name;
      const formData = new FormData();
      formData.append("title", fileName);
      formData.append("file", this.selectedFile);

      this.uploadFileService.doUpload(formData)
        .subscribe(result => {
          let newContributionData = {
            userId: this.userId,
            uploadId: result.uploadId,
            ... this.stepInfoFormGroup.value,
            genrePicker: this.stepGenInstFormGroup.get('genres')?.value,
            instrumentPicker: this.stepGenInstFormGroup.get('instruments')?.value
          }

          this.newContributionService.contribute(newContributionData)
            .subscribe(result => {
              this.stepInfoFormGroup.reset();
              this.stepGenInstFormGroup.reset();
              this.toastService.show("Contribuição realizada com sucesso");
              this.router.navigate(["/home"]);
            })
        })
    }
  }

  async saveEditedContribution() {

    if(this.isEditMode == false) return;

    const hasFileSelected = this.selectedFile != null;
    
    if (this.stepInfoFormGroup.valid && this.stepGenInstFormGroup.valid) {
      let uploadId = null;

      if (hasFileSelected) {
        const fileName = this.selectedFile.name;
        const formData = new FormData();
        formData.append("title", fileName);
        formData.append("file", this.selectedFile);
        uploadId = await firstValueFrom(this.uploadFileService.doUpload(formData));
      }
      
      let editedContributionData = {
        userId: this.userId,
        uploadId: uploadId?.uploadId,
        ... this.stepInfoFormGroup.value,
        genrePicker: this.stepGenInstFormGroup.get('genres')?.value,
        instrumentPicker: this.stepGenInstFormGroup.get('instruments')?.value
      }

      this.newContributionService.update(this.editContributionId, editedContributionData)
        .subscribe(result => {
          this.stepInfoFormGroup.reset();
          this.stepGenInstFormGroup.reset();
          this.toastService.show("Contribuição atualizada com sucesso");
          this.router.navigate(["/home"]);
        })

    }
  }

}
