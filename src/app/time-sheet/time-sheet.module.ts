import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TimeSheetRoutingModule } from './time-sheet-routing.module';
import { TimeSheetComponent } from './components/time-sheet/time-sheet.component';
import { CommonTvmModule } from '../common/common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TimeSheetComponent
  ],
  imports: [
    CommonModule,
    TimeSheetRoutingModule,
    CommonTvmModule,
    NgSelectModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class TimeSheetModule { }
