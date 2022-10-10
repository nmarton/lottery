import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let routerStub: any;

  beforeEach(async () => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    }
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Router, useValue: routerStub }
      ]
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
    component.loginForm.get('id')?.setValue('test');
    component.loginForm.get('password')?.setValue('test');
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

    expect(routerStub.navigate).toHaveBeenCalledWith(['/game']);
  });


});
