import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}
  pagination: boolean = false;
  page: string = "home";

  onRecipes() {
    this.router.navigate(['/recipes']);
  }
}
