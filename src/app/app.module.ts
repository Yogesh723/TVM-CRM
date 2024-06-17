import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonTvmModule } from './common/common.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JiraPageComponent } from './jira-page/jira-page.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { DxButtonModule, DxDataGridModule,DxSelectBoxModule,DxSpeedDialActionModule, DxTagBoxModule} from 'devextreme-angular';
import { AddRowComponent } from 'src/add-row/add-row.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JiraDataService } from 'src/assets/jira-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import { StarRatingModule } from 'angular-star-rating';
import { NgxStarsRatingModule } from 'ngx-stars-rating';
import { IgcFormsModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    AppComponent,JiraPageComponent,AddRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonTvmModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    FormsModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    MultiSelectModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    NgxStarsRatingModule,
    IgcFormsModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [JiraDataService,provideNativeDateAdapter(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
