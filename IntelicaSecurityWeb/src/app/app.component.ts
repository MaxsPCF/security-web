import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './common/spinner/spinner.component';
@Component({
  selector: 'app-security',
  standalone: true,
  imports: [RouterOutlet,SpinnerComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'IntelicaSecurityWeb';
}