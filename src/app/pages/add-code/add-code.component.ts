import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-code',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './add-code.component.html',
  styleUrl: './add-code.component.scss'
})
export class AddCodeComponent {
  codeInput = '';

  submitCode() {
    console.log('Code submitted:', this.codeInput);
    this.codeInput = '';
  }

  scanCode() {
    console.log('Scanning code...');
  }
}
