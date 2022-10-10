import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('number should render in cell', () => {
    component.id = 49;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(component.id).toEqual(+compiled.querySelector('.cell__id').textContent);
  });

  it('should be checked on click when its unchecked', () => {
    component.selected = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('.cell').click();
    fixture.detectChanges();
    expect(compiled.querySelector('.cell__cross')).not.toEqual(null);
  });

  it('should be unchecked on click when its checked', () => {
    component.selected = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('.cell').click();
    fixture.detectChanges();
    expect(compiled.querySelector('.cell__cross')).toEqual(null);
  });

  it('should be unchecked on reset', () => {
    component.selected = true;
    fixture.detectChanges();
    component.reset();
    expect(component.selected).toBeFalse();
  });

  it('should be checked on selectCell', () => {
    component.selected = false;
    fixture.detectChanges();
    component.selectCell();
    expect(component.selected).toBeTruthy();
  });


});
