import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';
import { ProfileComponent } from './profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { SearchDataComponent } from './search/search-data.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SafePipe } from '../pipes/safe.pipe';
import { SearchDataDetailComponent } from './search/search-data-detail/search-data-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewContributionComponent } from './new-contribution/new-contribution.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MyContributionsComponent } from './my-contributions/my-contributions.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SearchDataComponent,
    SearchDataDetailComponent,
    NewContributionComponent,
    MyContributionsComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
    NgxMaskModule.forRoot({
      validation: false,
    }),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    TablerIconsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[
    SafePipe,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
  ]
})
export class PagesModule { }
