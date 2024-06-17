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
  monthForm!: FormGroup;
  maxDate = new Date();
  minDate = new Date('01 May 2024');
  pickList = [
    {'label': 'WFO', 'value': 1},
    {'label': 'WFH', 'value': 2},
    {'label': 'L', 'value': 3},
    {'label': 'H', 'value': 4}
  ];
  _listInfo: any = [];
  monthInfo: any = [];
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
  monthColumns: any = [];
  Pageheader: any = 'Time Sheet';
  showHeader: boolean = false;
  isMonthView: boolean = false;
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
    this.isMonthView ? this.onMonthDateSelect(this.createdFromDate) : this.onDateSelect(this.createdFromDate);
  }

  viewChange(value: boolean) {
    this.isMonthView = value;
    this.isMonthView ? this.onMonthDateSelect(this.createdFromDate) : this.onDateSelect(this.createdFromDate);
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
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: '2-digit' };
    return date.toLocaleDateString('en-GB', options);
  }

  loadTimesheetData() {
    this.timesheetService.getTimesheetData().subscribe(
      (data: any) => {
        if (this.isMonthView) {
          this.monthInfo = data;
          this.monthinitForm();
        } else {
          this._listInfo = data;
          this.initForm();
        }
      },
      (error) => {
        this.toastr.error('Failed to load timesheet data');
      }
    );
  }

  private initForm() {
    let formModel: any = {}; 
    this._listInfo.forEach((element: any) => {
      this.listColumns.forEach((items: any) => {
        if (items.type !== 'label') {
          let year = new Date(items.date).getFullYear();
          let month = new Date (items.date).getMonth() + 1;
          let date = new Date(items.date).getDate();
          let day = new Date(items.date).getDay();
          let selYear = element.year.filter((e: any) => e.id == year);
          const controlName = `${element.empId}_${items.name}`;
          if (selYear.length > 0) {
            let selMonth = selYear[0].month.filter((el: any) => el.id == month);
            if (selMonth.length > 0) {
              let selDate = selMonth[0].date.filter((ele: any) => ele.id == date);
              if (selDate.length > 0) {
                const controlValue = selDate[0].value || '';
                if (new Date() > new Date(items.date) && this.formatDate(new Date()) !== this.formatDate(new Date(items.date))) {
                  formModel[controlName] = new FormControl(controlValue, Validators.required);
                  items.readOnly = true;
                } else {
                  formModel[controlName] = new FormControl(controlValue, Validators.required);
                  items.readOnly = false;
                }
              } else {
                if (day == 6 || day == 0) {
                  formModel[controlName] = new FormControl(4, Validators.required);
                } else {
                  formModel[controlName] = new FormControl(null, Validators.required);
                }
                items.readOnly = false;
              }
            } else {
              formModel[controlName] = new FormControl(null, Validators.required);
              items.readOnly = false;
            }
          } else {
            formModel[controlName] = new FormControl(null, Validators.required);
            items.readOnly = false;
          }
        }
    
      });
    });
    this.appForm = this.formBuilder.group(formModel);
  }

  getControlName(event: any, col: any) {
    return event.empId + '_' + col.name;
  }

  getValue(event: any, col: any) {
    let result;
   this.pickList.forEach((e: any) => {
    if (
    e.value == this.appForm.value[event.empId + '_' + col.name]
    ) {
      result = e.label;
    }
  });
  return result;
  }

  getMonthFormValue(event: any, col: any) {
    let result;
   this.pickList.forEach((e: any) => {
    if (
    e.value == this.monthForm.value[event.empId + '_' + col.name]
    ) {
      result = e.label;
    }
  });
  return result;
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

  monthView(event: any) {
    if (event) {
      this.isMonthView = event;
    }
  }

  
  onMonthDateSelect(selectedDate: Date) {
    const monthDates = this.getMonthDates(selectedDate);
    this.monthColumns = this.generateMonthColumns(monthDates);
    this.loadTimesheetData();
  }

  getMonthDates(date: Date): string[] {
    const monthDates = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= lastDay; day++) {
      monthDates.push(new Date(year, month, day));
    }

    return monthDates.map(d => this.formatDate(d));
  }

  generateMonthColumns(dates: string[]): any[] {
    return [
      { name: "empName", label: "Employee Name", widthPct: 10, hidden: false, type: 'label' },
      ...dates.map((date, index) => ({
        name: `day${index + 1}`,
        label: this.formatDayLabel(date),
        widthPct: 10,
        hidden: false,
        date: date
      }))
    ];
  }

  formatDayLabel(date: string): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    return new Date(date).toLocaleDateString('en-GB', options);
  }

  private monthinitForm() {
    let formModel: any = {}; 
    this.monthInfo.forEach((element: any) => {
      this.monthColumns.forEach((items: any) => {
        if (items.type !== 'label') {
          let year = new Date(items.date).getFullYear();
          let month = new Date (items.date).getMonth() + 1;
          let date = new Date(items.date).getDate();
          let day = new Date(items.date).getDay(); 
          let selYear = element.year.filter((e: any) => e.id == year);
          const controlName = `${element.empId}_${items.name}`;
          if (selYear.length > 0) {
            let selMonth = selYear[0].month.filter((el: any) => el.id == month);
            if (selMonth.length > 0) {
              let selDate = selMonth[0].date.filter((ele: any) => ele.id == date);
              if (selDate.length > 0) {
                const controlValue = selDate[0].value || '';
                if (new Date() > new Date(items.date) && this.formatDate(new Date()) !== this.formatDate(new Date(items.date))) {
                  formModel[controlName] = new FormControl(controlValue, Validators.required);
                  items.readOnly = true;
                } else {
                  formModel[controlName] = new FormControl(controlValue, Validators.required);
                  items.readOnly = false;
                }
              } else {
                if (day == 6 || day == 0) {
                  formModel[controlName] = new FormControl(4, Validators.required);
                } else {
                  formModel[controlName] = new FormControl(null, Validators.required);
                }
                items.readOnly = false;
              }
            } else {
              formModel[controlName] = new FormControl(null, Validators.required);
              items.readOnly = false;
            }
          } else {
            formModel[controlName] = new FormControl(null, Validators.required);
            items.readOnly = false;
          }
        }
    
      });
    });
    this.monthForm = this.formBuilder.group(formModel);
  }

  monthViewDrodwnChange(field: any, event: any, col: any) {
    const selectedDate = new Date(col.date);
    if (selectedDate <= this.createdFromDate) {
      let year = selectedDate.getFullYear();
      let month = selectedDate.getMonth() + 1;
      let date = selectedDate.getDate();

      let empTimesheet = this.monthInfo.find((e: any) => e.empId == field.empId);
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

  calculateWorkingDays(field: any): number {
    return this.calculateDays(field, 1); // 1 corresponds to WFO
  }

  calculateLeaves(field: any): number {
    return this.calculateDays(field, 3); // 3 corresponds to Leave
  }

  calculateWFH(field: any): number {
    return this.calculateDays(field, 2); // 2 corresponds to WFH
  }

  calculateTotalLeaveDays(field: any): number {
    // Assuming the _listInfo contains data for the current and previous month
    // const currentMonth = new Date().getMonth() + 1;
    // const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    // return this.calculateDays(field, 3, [currentMonth, previousMonth], true);

      // Get the current month
  const currentMonth = new Date().getMonth() + 1;
  // Calculate the next month, considering the wrap-around at the end of the year
  const nextMonth = currentMonth%2 === 0 ? currentMonth + 1 : currentMonth - 1;

  // Calculate the leave days for the current month and the next month
  return this.calculateDays(field, 3, [currentMonth, nextMonth], true);
  }

  calculateDays(field: any, valueType: number, months?: number[], twoMonthCheck: boolean = false): number {
    let totalDays = 0;
    const timesheet = field.year.filter((e: any) => e.id == this.createdFromDate.getFullYear());
    timesheet[0].month.forEach((month: any) => {
      if (!months || months.includes(month.id)) {
        if (months && twoMonthCheck) {
          twoMonthCheck = months.includes(month.id);
        }
        month.date.forEach((date: any) => {
          if (date.value == valueType && (this.createdFromDate.getMonth()+1 == month.id || twoMonthCheck)) {
            totalDays++;
          }
        });
      }
    });
    return totalDays;
  }
}
