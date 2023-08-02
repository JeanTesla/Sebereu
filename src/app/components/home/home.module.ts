import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MyContributionsComponent } from './my-contributions/my-contributions.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { WorkspaceComponent } from './workspace/workspace.component';
import { SearchComponent } from './search/search.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { NewContributionDialogComponent } from './new-contribution-dialog/new-contribution-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '../utilities/spinner/spinner.component';
import { InspectContributionComponent } from './my-contributions/inspect-contribution/inspect-contribution.component';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { EmptyPipe } from 'src/app/pipes/empty.pipe';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    HomeComponent,
    WorkspaceComponent,
    SearchComponent,
    NewContributionDialogComponent,
    MyContributionsComponent,
    SpinnerComponent,
    InspectContributionComponent,
    SafePipe,
    EmptyPipe
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatTabsModule,
    MatChipsModule,
    MatStepperModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatOptionModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    BrowserModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatExpansionModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomeModule { }
