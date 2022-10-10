import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import NumberGeneratorService from 'src/app/services/numberGenerator.service';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelComponent ],
      providers: [NumberGeneratorService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    component.events = new Subject<void>().asObservable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('number should add to the set on select', () => {
    component.selectCell(10);
    fixture.detectChanges();

    expect(component.selectedCells.has(10)).toBeTrue();
  });

  it('number should remove from the set when it is in', () => {
    component.selectedCells.add(10);
    fixture.detectChanges();
    component.selectCell(10);
    fixture.detectChanges();

    expect(component.selectedCells.has(10)).toBeFalse();
  });

  it('on clear the set should be empty', () => {
    component.selectedCells = new Set([1,3,6,34,49,5]);
    fixture.detectChanges();
    component.resetCells(); 
    fixture.detectChanges();
    
    expect(component.selectedCells.size).toEqual(0);
  });

});
