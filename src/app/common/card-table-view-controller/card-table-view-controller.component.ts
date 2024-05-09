import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-table-view-controller',
  templateUrl: './card-table-view-controller.component.html',
  styleUrls: ['./card-table-view-controller.component.scss']
})
export class CardTableViewControllerComponent {

  @Input() isCardView: boolean = false;
  @Output() cardView = new EventEmitter();
  
  cardTableViwSwitch(flagVal: any) {
    this.cardView.emit(flagVal);
  }
}
