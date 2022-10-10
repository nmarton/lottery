import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }
 // user$: Observable<string | null> = this.store.select(selectUser);
  user$: Observable<String | null> = this.authService.user;

  logout() {
    this.authService.logout();

    this.user$.subscribe(user => {
      if(!user?.length) {
        this.router.navigate(['/login']);
      }
    })
  }

  ngOnInit(): void {
  }

}
