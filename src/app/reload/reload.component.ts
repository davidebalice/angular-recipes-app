import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-reload',
  templateUrl: './reload.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './reload.component.css'
})
export class ReloadComponent {

}
