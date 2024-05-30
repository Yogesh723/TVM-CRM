import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeSheetRoutingModule } from './time-sheet-routing.module';
import { TimeSheetComponent } from './components/time-sheet/time-sheet.component';
import { CommonTvmModule } from '../common/common.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TimeSheetComponent
  ],
  imports: [
    CommonModule,
    TimeSheetRoutingModule,
    CommonTvmModule,
    NgSelectModule
  ]
})
export class TimeSheetModule { }
