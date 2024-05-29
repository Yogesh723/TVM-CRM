import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,JiraPageComponent,AddRowComponent
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
    MultiSelectModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
