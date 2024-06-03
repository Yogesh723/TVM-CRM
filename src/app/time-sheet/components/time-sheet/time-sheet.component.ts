import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CommunicationService } from 'src/app/common/communication.service';
import * as XLSX from 'xlsx';
import { TimeSheetService } from '../../services/time-sheet.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent {
  appForm!: FormGroup;
  maxDate = new Date();
  minDate = new Date('01 May 2024');
  _listInfo: any = [];
  listColumns: any = [
    {
      name: "empName",
      label: "Employee Name",
      widthPct: 10,
      hidden: false,
      type: 'label'
    },
    {
      name: "sun",
      label: "Sun",
      widthPct: 10,
      hidden: false,
      date: '26 May 2020'
    },
    {
      name: "mon",
      label: "Mon",
      widthPct: 10,
      hidden: false,
      date: '27 May 2020'
    },
    {
      name: "tue",
      label: "Tue",
      widthPct: 10,
      hidden: false,
      date: '28 May 2020'
    },
    {
      name: "wed",
      label: "Wed",
      widthPct: 10,
      hidden: false,
      date: '29 May 2020'
    },
    {
      name: "thu",
      label: "Thu",
      widthPct: 10,
      hidden: false,
      date: '30 May 2020'
    },
    {
      name: "fri",
      label: "Fri",
      widthPct: 10,
      hidden: false,
      date: '31 May 2020'
    },
    {
      name: "sat",
      label: "Sat",
      widthPct: 10,
      hidden: false,
      date: '01 June 2020'
    }
  ];
  Pageheader: any = 'Time Sheet';
  showHeader: boolean = false;
  createdFromDate: any = new Date();
  listInfo: any = [];

  constructor(
    private toastr: ToastrService,
    private communicationService: CommunicationService,
    private timesheetService: TimeSheetService,
    private formBuilder: FormBuilder
  ) { 
  }
  ngOnInit() {
    this.communicationService.confirmActiveSection('time-sheet');
    this.onDateSelect(this.createdFromDate);
    this.loadTimesheetData();
  }

  private initForm() {
    let formModel: any = {}; 
    this._listInfo.forEach((element: any) => {
      this.listColumns.forEach((items: any) => {
        if (items.type !== 'label') {
          let year = new Date(items.date).getFullYear();
          let month = new Date (items.date).getMonth() + 1;
          let date = new Date(items.date).getDate();
  
          let selYear = element.year.filter((e: any) => e.id == year);
          const controlName = `${element.empId}_${items.name}`;
          if (selYear.length > 0) {
            let selMonth = selYear[0].month.filter((el: any) => el.id == month);
            if (selMonth.length > 0) {
              let selDate = selMonth[0].date.filter((ele: any) => ele.id == date);
              if (selDate.length > 0) {
                const controlValue = selDate[0].value || '';
                formModel[controlName] = new FormControl(controlValue, Validators.required);
              } else {
                formModel[controlName] = new FormControl(null, Validators.required);
              }
            } else {
              formModel[controlName] = new FormControl(null, Validators.required);
            }
          } else {
            formModel[controlName] = new FormControl(null, Validators.required);
          }
        }
    
      });
    });
    this.appForm = this.formBuilder.group(formModel);
  }

  getControlName(event: any, col: any) {
    return event.empId + '_' + col.name;
  }

  setSelectionToVariable(field: any, event: any, col: any) {
    const selectedDate = new Date(col.date);
    if (selectedDate <= this.createdFromDate) {
      let year = selectedDate.getFullYear();
      let month = selectedDate.getMonth() + 1;
      let date = selectedDate.getDate();

      let empTimesheet = this._listInfo.find((e: any) => e.empId == field.empId);
      if (empTimesheet) {
        let selYear = empTimesheet.year.find((e: any) => e.id == year);
        if (!selYear) {
          selYear = { id: year, month: [] };
          empTimesheet.year.push(selYear);
        }
    
        let selMonth = selYear.month.find((el: any) => el.id == month);
        if (!selMonth) {
          selMonth = { id: month, date: [] };
          selYear.month.push(selMonth);
        }
    
        let selDate = selMonth.date.find((ele: any) => ele.id == date);
        if (!selDate) {
          selDate = { id: date, value: event.value };
          selMonth.date.push(selDate);
        } else {
          selDate.value = event.value;
        }
        this.timesheetService.saveTimesheetData(empTimesheet, field.id).subscribe(
          () => {
            this.toastr.success('Timesheet saved successfully');
          },
          (error) => {
            this.toastr.error('Failed to save timesheet');
          }
        );
      }
    } else {
      this.toastr.error('Failed to save timesheet');
      this.loadTimesheetData();
    }
  }

  loadTimesheetData() {
    this.timesheetService.getTimesheetData().subscribe(
      (data: any) => {
        this._listInfo = data;
        this.initForm();
      },
      (error) => {
        this.toastr.error('Failed to load timesheet data');
      }
    );
  }

  onDateSelect(selectedDate: Date) {
    const weekDates = this.getWeekDates(selectedDate);
    this.listColumns.forEach((column: any, index: any) => {
      if (index > 0) {
        column.date = weekDates[index - 1];
      }
    });
    this.loadTimesheetData();
  }

  getWeekDates(date: Date): string[] {
    const startDate = new Date(date);
    const dayOfWeek = startDate.getDay(); 
    const weekDates = [];
    startDate.setDate(startDate.getDate() - dayOfWeek); 
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startDate);
      weekDates.push(this.formatDate(weekDate)); 
      startDate.setDate(startDate.getDate() + 1);
    }
    return weekDates;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
}
