import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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

  constructor(private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang || this.translateService.getDefaultLang() || 'en';
  }

  changeLanguage(lang: string): void {
    this.currentLang = lang;
    this.translateService.use(lang);
  }
}
