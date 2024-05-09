import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'app-table-generator',
  templateUrl: './table-generator.component.html',
  styleUrl: './table-generator.component.scss'
})
export class TableGeneratorComponent implements OnInit {
  selectedPrjct: any;
  prjctData: any = [];
  showCardView: boolean = true;
  searchTableColumns: any;
  searchString = '';  
  placeHolder: any = "Search";
  sortedColumn = '';
  isCardView: boolean = false;
  searchDropDownItems: any = [];
  @Input() _listInfo: any = [];
  @Input() listColumns: any = [];
  @Input() Pageheader: any = '';
  @Input() showHeader: boolean = true;
  @Input() listObservable: any;
  @Input() hasDetailsPage: boolean = true;
  @Output() goToDetails = new EventEmitter();
  @Output() addNew = new EventEmitter();
  @Output() deleteclicked = new EventEmitter();

  constructor() { 
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
}
