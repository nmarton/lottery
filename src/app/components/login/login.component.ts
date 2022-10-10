import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import AuthService from 'src/app/services/auth.service';
import UserService from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: FormControl = new FormControl('');
  users = this.userService.geUserList();
  password: FormControl = new FormControl();
  formIsChecked: boolean = false;

  loginFailedError: boolean = false; 

  loginForm: FormGroup = new FormGroup({
    selectedUser: new FormControl(
      null,
      [
        Validators.required
      ]),
    name: new FormControl(
      null,
      [
        Validators.required
      ]
    ),
    password: new FormControl(
      null,
      [
        Validators.required
      ]
    ),
  });

  login() {
    if (this.loginForm?.valid) {
      const name = this.loginForm.get('name')?.value;
      const pass = this.loginForm.get('password')?.value;

      this.authService.login(name, pass).subscribe((login) => {
        if (login) {
          this.loginFailedError = false;
          const locationState: any =  this.location.getState();
          this.router.navigate([locationState.returnUrl ?? '/game'])
        } else {
          this.loginFailedError = true;
        }
      });
    }

    this.formIsChecked = true;
  }

  constructor(private authService: AuthService, private router: Router, private location: Location, private userService: UserService) { }

  ngOnInit(): void {
    if (this.authService.userLoggedIn()) {
      const locationState: any =  this.location.getState();
      this.router.navigate([locationState.returnUrl ?? '/game'])
    };

    this.loginForm.get('selectedUser')?.valueChanges.subscribe((value) => {
      this.loginForm.get('name')?.setValue(value);
    });
  }

  get selectedUserIsValid() {
    return this.formIsChecked && this.loginForm.get('selectedUser')?.errors?.['required'];
  }

  get nameIsValid() {
    return this.formIsChecked && this.loginForm.get('name')?.errors?.['required'];
  }

  get passIsValid() {
    return this.formIsChecked && this.loginForm.get('password')?.errors?.['required'];
  }

}
