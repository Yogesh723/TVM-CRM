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
import { DxButtonModule, DxDataGridModule,DxSpeedDialActionModule} from 'devextreme-angular';
import { AddRowComponent } from 'src/add-row/add-row.component';
import { ToastrModule,provideToastr } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';


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
    NgSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    ToastrModule.forRoot({
      closeButton : true,
      timeOut:7000,
      extendedTimeOut:7000,
      progressBar:true,
      positionClass: 'toast-top-right',
      preventDuplicates:true
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
