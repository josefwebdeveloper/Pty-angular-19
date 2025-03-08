import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="language-switcher">
      <button
        [class.active]="currentLang === 'en'"
        (click)="changeLanguage('en')">
        EN
      </button>
      <span class="divider">|</span>
      <button
        [class.active]="currentLang === 'es'"
        (click)="changeLanguage('es')">
        ES
      </button>
    </div>
  `,
  styles: [`
    .language-switcher {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 14px;
    }

    button {
      background: none;
      border: none;
      padding: 5px;
      cursor: pointer;
      font-weight: 500;
      color: #888;
    }

    .divider {
      color: #ccc;
    }

    button.active {
      color: #007bff;
      font-weight: bold;
    }
  `]
})
export class LanguageSwitcherComponent {
  currentLang: string;

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.getCurrentLang();
  }

  changeLanguage(lang: string): void {
    this.currentLang = lang;
    this.translationService.changeLang(lang);
  }
}
