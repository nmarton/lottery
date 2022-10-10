import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export type panel = {
  panel: number,
  cells: number[],
  message?: string,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  eventsSubject: Subject<void> = new Subject<void>();
  panels: panel[] = new Array();
  panelNumber = 4;

  constructor() { }

  ngOnInit(): void {
    for(let i = 1; i <= this.panelNumber; i++) {
      this.panels.push({
        panel: i,
        cells: [],
      })
    }
  }

  submit() {
    this.eventsSubject.next();
  }

  getCells(panel: panel) {
    const actualPanel = this.panels.find((p) => panel.panel === p.panel);
    if (actualPanel) {
      actualPanel.cells = panel.cells;
      actualPanel.message = this.getMessage(panel.cells);
    }
  }

  getMessage(cellNumbers: number[]) {
    const length = cellNumbers.length;
    if (length === 0) {
      return 'empty'
    }
    if (length < 6) {
      return `Error: ${6 - length} marks are missing`
    }
    if (length > 6) {
      return `Error: Please remove ${length - 6} mark`
    }
    return cellNumbers.sort((a,b) => a - b).join(',');
  }

}
