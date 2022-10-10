import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import NumberGeneratorService from 'src/app/services/numberGenerator.service';
import { CellComponent } from '../cell/cell.component';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() panelNumber!: Number;
  @Input() events!: Observable<void>;

  @Output() getSelectedCells = new EventEmitter();

  @ViewChildren(CellComponent) cells: QueryList<CellComponent> | undefined;

  faRandom = faRandom;
  faTrash = faTrashAlt;

  public selectedCells: Set<Number> = new Set();

  defaultCells = new Array(49).fill(false);

  constructor(private numberGeneratorService: NumberGeneratorService) { }

  ngOnInit(): void {
    this.events.subscribe(() => {
      this.getSelectedCells.emit({panel: this.panelNumber, cells: [...this.selectedCells]});
    });
  }

  selectCell(cellId: number) {
    if (this.selectedCells.has(cellId)) {
      this.selectedCells.delete(cellId)
    } else {
      this.selectedCells.add(cellId);
    }
  }

  resetCells() {
    this.cells?.forEach(cell => cell?.reset());
    this.selectedCells.clear();
  }

  generate() {
    const numbers = this.numberGeneratorService.generate(6);
    this.resetCells();
    this.cells?.filter(cell => numbers.includes(cell.id)).forEach(cell => cell?.selectCell());
  }

}
