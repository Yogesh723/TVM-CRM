import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrl: './time-sheet.component.scss'
})
export class TimeSheetComponent {
  appForm!: FormGroup;
  selectedPrjct: any;
  prjctData: any = [];
  showCardView: boolean = true;
  searchTableColumns: any;
  searchString = '';  
  placeHolder: any = "Search";
  sortedColumn = '';
  isCardView: boolean = false;
  searchDropDownItems: any = [];
  @Input() _listInfo: any = [
    {
      "empName": "Yogesh",
      "sun": "",
      "mon": "",
      "tue": "",
      "wed": "",
      "thu": "",
      "fri": "",
      "sat": ""
    }
  ];
  @Input() listColumns: any = [
    {
      name: "empName",
      label: "Employee Name",
      widthPct: 10,
      hidden: false,
      type: 'label'
    },
    {
      name: "sun",
      label: "sunday",
      widthPct: 10,
      hidden: false,
      date: '26 May 2024'
    },
    {
      name: "mon",
      label: "monday",
      widthPct: 10,
      hidden: false,
      date: '27 May 2024'
    },
    {
      name: "tue",
      label: "tuesday",
      widthPct: 10,
      hidden: false,
      date: '28 May 2024'
    },
    {
      name: "wed",
      label: "wednesday",
      widthPct: 10,
      hidden: false,
      date: '29 May 2024'
    },
    {
      name: "thu",
      label: "thursday",
      widthPct: 10,
      hidden: false,
      date: '30 May 2024'
    },
    {
      name: "fri",
      label: "friday",
      widthPct: 10,
      hidden: false,
      date: '31 May 2024'
    },
    {
      name: "sat",
      label: "saturday",
      widthPct: 10,
      hidden: false,
      date: '01 June 2024'
    }
  ];;
  @Input() Pageheader: any = '';
  @Input() showHeader: boolean = true;
  @Input() dynamcicImport: boolean = false;
  @Input() listObservable: any;
  @Input() filename: any = '';
  @Input() Showexportbutton: boolean =true;
  @Input() hasDetailsPage: boolean = true;
  @Output() goToDetails = new EventEmitter();
  @Output() addNew = new EventEmitter();
  @Output() deleteclicked = new EventEmitter();
  @Output() importSave = new EventEmitter();
  
  listInfo: any = [];


  constructor(
    private toastr:ToastrService
  ) { 
  }

  ngOnInit() {
    this.searchDropDownItems = ['all'];
  }

  createNew(id: any) {
    this.addNew.emit(id);
  }

  rowClick(id: any) {
    if (this.hasDetailsPage) {
      this.goToDetails.emit(id);
    }
  }

  deleteConfirm() {

  }

  filterTable(searchInfo: any) {
    searchInfo.searchString = searchInfo.searchString.toLowerCase();
    this.searchString = searchInfo.searchString;
    if (searchInfo.searchString === '') {
      this.listObservable = new BehaviorSubject(this._listInfo);
      return;
    }

    // If the search filter dropdown is having All then it
    // will call filterDynamicColumns function to filter reacord from all columns
    // else it will call filterByOneColumn function to filter record of that
    // particular selected coulmn name.
    if(searchInfo.selectedDropItem == 'all'){
      this.listObservable.next(
        this._listInfo.filter((item: any) =>
          this.filterDynamicColumns(item, searchInfo)
        )
      );
    }else{
      this.listObservable.next(
        this._listInfo.filter((item: any) =>
          this.filterByOneColumn(item, this.searchString,searchInfo.selectedDropItem)
        )
      );
    }
  }

  filterDynamicColumns(item: any, searchInfo: any) {
    let result: any;
    this.listColumns.forEach((column: any) => {
      if (item[column.name] !== null) {
        let value;
        if (!item.hasOwnProperty(column.name)) {
          item[column.name] = '';
        }
        value =
          item[column.name]
            .toString()
            .toLowerCase()
            .indexOf(searchInfo.searchString) > -1;

        result = value || !!result;
      }
    });
    return result;
  }

  filterByOneColumn(item: any, text: any, columnName: any): boolean {
    let result: any;

    if (item[columnName] !== null) {
      let value;
      if (!item.hasOwnProperty(columnName)) {
        item[columnName] = '';
      }
      value = item[columnName].toString().toLowerCase().indexOf(text) > -1;

      result = value || !!result;
    }

    return result;
  }

  cardView(value: any) {
    this.isCardView = value;
  }
  deleteRow(id: any) {
    this.deleteclicked.emit(id);
  }  
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this._listInfo);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, this.filename);
  }

  saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = `${fileName}_${new Date().getTime()}.xlsx`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  importFromExcel() {debugger
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.xlsx';
  
    // Define the expected headers
    const expectedHeaders = this.listColumns.map((e: any) => e.name);
  
    inputElement.addEventListener('change', (event: any) => {
      const file: File = event.target.files[0];
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
        const worksheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];
        const importedData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Validate the headers
        const importedHeaders = importedData[0].filter((e: any) => e !== 'id');
        const headersMatch = expectedHeaders.every((header: any) => importedHeaders.includes(header)) &&
                             importedHeaders.every((header: any) => expectedHeaders.includes(header));
  
        if (!headersMatch) {
          this.toastr.error('Error: The imported file does not have the correct columns.');
          // alert('Error: The imported file does not have the correct columns.');

          return;
        }
  
        // Assign the imported data to _listInfo
        let tempArr: any = [];
        importedData.forEach((element, index) => {
          if (index > 0) {
            let obj: any = {};
            let i = 0;
            for (const section of importedData[0]) {
              obj[section] = element[i];
              i += 1;
            }
            tempArr.push(obj);
          }
        });
        this._listInfo = [...tempArr]; // Skip header row if it exists
        // Emit the updated data through the observable
        this.importSave.emit(this._listInfo);
        this.listObservable.next(this._listInfo);
      };

      reader.readAsBinaryString(file);
    });

    inputElement.click();
  }

  importExcelDynamic() {
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.xlsx';
  
    // Define the expected headers
    const expectedHeaders = this.listColumns.map((e: any) => e.name);
  
    inputElement.addEventListener('change', (event: any) => {
      const file: File = event.target.files[0];
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
        const worksheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];
        const importedData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        const importedHeaders = importedData[0];
        const hasAtLeastOneExpectedHeader = expectedHeaders.some((header: any) => importedHeaders.includes(header));

        if (!hasAtLeastOneExpectedHeader) {
          alert('Error: The imported file does not have any of the required columns.');
          return;
        }

        // Assign the imported data to _listInfo
        let tempArr: any = [];
        importedData.forEach((element, index) => {
          if (index > 0 ) {
            let obj: any = {};
            let i = 0;
            for (const section of importedData[0]) {
              if (expectedHeaders.includes(section) || section == 'id') {
                obj[section] = element[i];
                i += 1;
              }
            }
            tempArr.push(obj);
          }
        });
        this._listInfo = [...tempArr]; // Skip header row if it exists
        // Emit the updated data through the observable
        this.importSave.emit(this._listInfo);
        this.listObservable.next(this._listInfo);
      };

      reader.readAsBinaryString(file);
    });

    inputElement.click();
  }

}