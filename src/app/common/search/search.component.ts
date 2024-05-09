import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  @Input() searchDropDownItems: any = []; //searchDropDownItems is input value for dropdown data
  @Output() searchByItemSelected = new EventEmitter(); //searchByItemSelected is an output value for search by drop item select
  @Output() search = new EventEmitter(); //search is an output value for trigger event when user search data.
  selectedItem: any; //selectedItem is for dropdown selected item display.
  searchString: string = ''; //searchString is value of search text box.
  @Input() showFilterDropdown: boolean = true; //searchDropDownItems is input value for dropdown data
  @Input() placeHolder = '';

  @ViewChild('typeAheadSearch', { static: true }) typeAheadSearch!: ElementRef;

  constructor() {}

  ngOnInit() {
    this.selectedItem = this.searchDropDownItems[0];
    this.setObjects();
  }

  setObjects() {
    if (this.placeHolder === '' || this.placeHolder === undefined) {
      // this.placeHolder = this.sharedService.literals.Search;
    }
  }

  ngAfterViewInit() {
    this.setEvent();
  }

  setEvent() {
    fromEvent(this.typeAheadSearch.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        let searchInfo: any = {};
        searchInfo.searchString = text;
        searchInfo.selectedDropItem = this.selectedItem;
        this.search.emit(searchInfo);
      });
  }

  /**
   * searchByItemSelect() is a method for handle dropdown item change
   * @param dropdownItem
   */
  searchByItemSelect(dropdownItem: any) {
    this.selectedItem = dropdownItem;
    let searchInfo: any = {};
    searchInfo.searchString = this.searchString;
    searchInfo.selectedDropItem = dropdownItem;
    this.searchByItemSelected.emit(searchInfo);
  }

  /**
   * searchData() is a method for handel when user search with some text.
   * @param event
   */
  // searchData(event) {
  //   this.searchString = event.target.value;
  //   let searchInfo: any = {};
  //   searchInfo.searchString = this.searchString;
  //   searchInfo.selectedDropItem = this.selectedItem;
  //   this.search.emit(searchInfo);
  // }
}

/**SearchDropDownData It is a class and model object for dropdowns */
export class SearchDropDownData {
  constructor(public name: string, public fieldId: string) {}
}
