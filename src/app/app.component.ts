import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pty-angular-19';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    // Set default language
    this.translateService.setDefaultLang('en');
    
    // Use browser language if available, otherwise default to English
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|es/) ? browserLang : 'en');
  }
}
