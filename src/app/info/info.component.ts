import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
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
