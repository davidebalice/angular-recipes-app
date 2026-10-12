import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
