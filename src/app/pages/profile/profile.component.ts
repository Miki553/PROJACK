import { Component } from '@angular/core';
import { HeadComponent } from '../head/head.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeadComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
