import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-info',
  templateUrl: './info.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './info.component.css',
})
export class InfoComponent {
  constructor(private router: Router) {}
  pagination: boolean = false;
  page: string = "info";

  onRecipes() {
    this.router.navigate(['/recipes']);
  }
}
