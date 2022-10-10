import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() id!: number;
  @Input() selected: boolean = false;

  @Output() selectEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  select() {
    this.selected = !this.selected;
    this.selectEvent.emit(this.id);
  }

  selectCell() {
    this.selected = true;
    this.selectEvent.emit(this.id);
  }

  reset() {
    this.selected = false;
  }

}
