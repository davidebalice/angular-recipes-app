import { Component } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
})
export class ThemeComponent {
  changeTheme(primaryColor: string, primaryColorHover: string): void {
    document.documentElement.style.setProperty('--primary-color', primaryColor);

    document.documentElement.style.setProperty(
      '--primary-color-hover',
      primaryColorHover
    );
  }
}
