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
import { NewContributionComponent } from './new-contribution/new-contribution.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipGrid, MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    HomeComponent,
    MyContributionsComponent,
    WorkspaceComponent,
    SearchComponent,
    NewContributionComponent
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
    MatSelectModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomeModule { }
