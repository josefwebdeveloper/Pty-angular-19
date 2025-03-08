import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translateService: TranslateService) {}

  /**
   * Get the current active language
   */
  getCurrentLang(): string {
    return this.translateService.currentLang || this.translateService.getDefaultLang();
  }

  /**
   * Change the current language
   */
  changeLang(lang: string): void {
    this.translateService.use(lang);
  }

  /**
   * Get an instant translation for a key
   */
  instant(key: string, params?: Object): string {
    return this.translateService.instant(key, params);
  }

  /**
   * Get an observable translation that updates when the language changes
   */
  get(key: string, params?: Object): Observable<string> {
    return this.translateService.get(key, params);
  }

  /**
   * Check if a language is supported
   */
  isLangSupported(lang: string): boolean {
    return ['en', 'es'].includes(lang);
  }
} 