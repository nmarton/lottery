import { ComponentFixture, TestBed } from '@angular/core/testing';
import AuthService from 'src/app/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form correct', () => {
    component.loginForm.get('id')?.setValue('a');
    component.loginForm.get('password')?.setValue('a');
    component.login();
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;
    const errors = compiled.querySelectorAll('.alert-fe');

    expect(errors.length).toEqual(0);
  });

  it('should logged in', () => {

    localStorage.removeItem('user');
    component.loginForm.get('id')?.setValue('t.darell');
    component.loginForm.get('password')?.setValue('Toran');
    component.login();
    fixture.detectChanges();
    
    localStorage.removeItem('user');
    const compiled = fixture.debugElement.nativeElement;
    const errors = compiled.querySelectorAll('.alert-be');

    expect(errors.length).toEqual(0);
  });


});
