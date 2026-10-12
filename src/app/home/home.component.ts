import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
