import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DoublePlayComponent} from "../animations/double-play/double-play.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [RouterModule, CommonModule, DoublePlayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
