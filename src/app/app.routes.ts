import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrizeComponent } from './components/prize/prize.component';
import { AddCodeComponent } from './components/add-code/add-code.component';
import { DoublePlayComponent } from './components/animations/double-play/double-play.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'prize', component: PrizeComponent },
      { path: 'add-code', component: AddCodeComponent },
      { path: 'double-play', component: DoublePlayComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];
