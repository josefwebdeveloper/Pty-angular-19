import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-code.component.html',
  styleUrl: './add-code.component.scss'
})
export class AddCodeComponent {
  codeInput = '';
  
  submitCode() {
    console.log('Code submitted:', this.codeInput);
    // This will be implemented in a future version
    this.codeInput = '';
  }

  scanCode() {
    console.log('Scanning code...');
    // This would trigger camera functionality in a real implementation
  }
}
