import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { PanelComponent } from './components/panel/panel.component';
import { CellComponent } from './components/cell/cell.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GameRoutingModule } from './game-routing.module';
import NumberGeneratorService from '../services/numberGenerator.service';


@NgModule({
  declarations: [
    GameComponent,
    PanelComponent,
    CellComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    GameRoutingModule,
  ],
  providers: [NumberGeneratorService]
})
export class GameModule { }
