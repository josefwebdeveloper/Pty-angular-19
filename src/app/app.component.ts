import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoublePlayComponent } from './components/animations/double-play/double-play.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DoublePlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pty-angular-19';
}
