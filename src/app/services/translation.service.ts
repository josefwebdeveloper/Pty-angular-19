import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'app_language';
  
  constructor(private translateService: TranslateService) {}

  /**
   * Get the current active language
   */
  getCurrentLang(): string {
    return this.translateService.currentLang || this.translateService.getDefaultLang();
  }

  /**
   * Initialize language from localStorage or browser setting
   */
  initLanguage(): void {
    const savedLang = localStorage.getItem(this.STORAGE_KEY);
    
    if (savedLang && this.isLangSupported(savedLang)) {
      this.translateService.use(savedLang);
    } else {
      // Use browser language if available, otherwise default to English
      const browserLang = this.translateService.getBrowserLang();
      const langToUse = browserLang && this.isLangSupported(browserLang) ? browserLang : 'en';
      this.translateService.use(langToUse);
      // Save the detected language
      localStorage.setItem(this.STORAGE_KEY, langToUse);
    }
  }

  /**
   * Change the current language and save to localStorage
   */
  changeLang(lang: string): void {
    if (this.isLangSupported(lang)) {
      this.translateService.use(lang);
      localStorage.setItem(this.STORAGE_KEY, lang);
    }
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