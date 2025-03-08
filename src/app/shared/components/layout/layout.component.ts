import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
