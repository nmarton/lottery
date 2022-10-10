import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user should visible', () => {
    component.logout();
    component.user$ = of('Test User');
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;
    const nameAndLogout = compiled.querySelector('.header-bar-user');
    console.log('sscell', nameAndLogout);

    expect(nameAndLogout).not.toBeNull();
  });
});
