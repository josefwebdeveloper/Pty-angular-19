import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrizeComponent } from './pages/prize/prize.component';
import { AddCodeComponent } from './pages/add-code/add-code.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import {DoublePlayComponent} from './pages/double-play/double-play.component';

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
