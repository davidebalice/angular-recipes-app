import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription: Subscription;
  isCategoriesVisible = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService
      .isLoggedIn()
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  showCategories() {
    this.isCategoriesVisible = true;
  }

  hideCategories() {
    this.isCategoriesVisible = false;
  }
}
