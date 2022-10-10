import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import NumberGeneratorService from '../services/numberGenerator.service';
import { CellComponent } from './components/cell/cell.component';
import { PanelComponent } from './components/panel/panel.component';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        PanelComponent,
        CellComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NumberGeneratorService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should all panel empty', () => {
    component.getCells(component.panels[0]);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const texts = compiled.querySelectorAll('.game__summary span');

    for (let text of texts) {
      expect(text.textContent).toEqual('empty');
    }
  });

  it('should all panel correct', () => {
    component.panels[0].cells = [1,2,3,4,5,6];
    component.panels[1].cells = [7,8,9,10,11,12];
    component.panels[2].cells = [13,14,15,16,17,18];
    component.panels[3].cells = [19,20,21,22,23,24];

    for (let i = 0; i< 4; i++) {
      component.getCells(component.panels[i]);
    }
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const texts = compiled.querySelectorAll('.game__summary span');

    for (let text of texts) {
      expect(text.textContent.split(',').length).toEqual(6);
    }

  })

  it('should all panel incorrect', () => {
    component.panels[0].cells = [1,2,3,4,6];
    component.panels[1].cells = [7,8,12];
    component.panels[2].cells = [13,14,15,16,17,18,1,5];
    component.panels[3].cells = [19];

    for (let i = 0; i< 4; i++) {
      component.getCells(component.panels[i]);
    }
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const texts = compiled.querySelectorAll('.game__summary span');

    for (let text of texts) {
      expect(text.textContent.match(/Error:/g).length).toBeGreaterThan(0);
    }

  })


});
