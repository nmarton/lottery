import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    name: new FormControl(null),
    id: new FormControl(
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
      const id = this.loginForm.get('id')?.value;
      const pass = this.loginForm.get('password')?.value;

      this.authService.login(id, pass).subscribe((login) => {
        if (login) {
          this.loginFailedError = false;
          this.router.navigate(['/game']);
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
      this.router.navigate(['/game']);
    };

    this.loginForm.get('name')?.valueChanges.subscribe((value) => {
      this.loginForm.get('id')?.setValue(value);
    });
  }

  get selectedUserIsValid() {
    return this.formIsChecked && this.loginForm.get('name')?.errors?.['required'];
  }

  get nameIsValid() {
    return this.formIsChecked && this.loginForm.get('id')?.errors?.['required'];
  }

  get passIsValid() {
    return this.formIsChecked && this.loginForm.get('password')?.errors?.['required'];
  }

}
