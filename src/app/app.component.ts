import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-recipes-book';
  name = 'Davidebalice.dev';
  loadedFeature = 'recipes';
  showHeader: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('/login');
      }
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
