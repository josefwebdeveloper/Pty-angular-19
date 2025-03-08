import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pty-angular-19';

  constructor(
    private translateService: TranslateService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    // Set default language
    this.translateService.setDefaultLang('en');
    
    // Initialize language from localStorage or browser language
    this.translationService.initLanguage();
  }
}
